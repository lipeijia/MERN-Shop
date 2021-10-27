import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import axios from 'axios';
import { server } from '../../lib/server';
import { catchErrors } from '../../helper/catchErrors';
import SpinIcon from '../SpinIcon';

export default function AddProductToCart({ isLoggedIn, _id }) {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    let timeout;
    if (isSuccess) {
      timeout = setTimeout(() => setIsSuccess(false), 3000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [isSuccess]);

  const handleAddProduct = async () => {
    try {
      setIsLoading(true);
      const url = `${server}/api/cart`;
      const payload = { _id, quantity: +quantity };
      const res = await axios.put(url, payload);
      console.log(res);
    } catch (error) {
      catchErrors(error, window.alert);
    } finally {
      setIsLoading(false);
      setIsSuccess(true);
    }
  };
  return (
    <>
      <form>
        <div className='mb-2 flex items-center justify-between focus-within:border-gray-600 transition border-2 border-gray-300 rounded-lg overflow-hidden'>
          <input
            className='p-2 border-0 flex-grow-1 focus:ring-0'
            type='number'
            min='0'
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          {isLoggedIn ? (
            isLoading ? (
              <button
                className='inline-flex items-center px-4 py-4 pt-3 pb-3 text-white focus:outline-none backgroundColor: bg-blue-400 cursor-pointer'
                disabled
                type='button'
                onClick={handleAddProduct}
              >
                <SpinIcon /> Processing
              </button>
            ) : isSuccess ? (
              <button
                className='px-4 py-4 pt-3 pb-3 text-white focus:outline-none backgroundColor: bg-blue-600 cursor-pointer'
                disabled
                type='button'
                onClick={handleAddProduct}
              >
                Item Added
              </button>
            ) : (
              <button
                className='px-4 py-4 pt-3 pb-3 text-white focus:outline-none backgroundColor: bg-gray-800 cursor-pointer'
                type='button'
                onClick={handleAddProduct}
              >
                Add to Cart
              </button>
            )
          ) : (
            <button
              className='px-4 py-4 pt-3 pb-3 text-white focus:outline-none backgroundColor: bg-gray-800 cursor-pointer'
              type='button'
              onClick={() => Router.push('/login')}
            >
              Login to Purchase
            </button>
          )}
        </div>
      </form>
    </>
  );
}
