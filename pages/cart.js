import React, { useState, useEffect } from 'react';
import CartItemList from '../components/cart/CartItemList';
import CartSummary from '../components/cart/CartSummary';
import useUser from '../lib/useUser';
import axios from 'axios';
import { server } from '../lib/server';
import useSWR, { trigger } from 'swr';
import Loading from '../components/Loading';
import fetchJson from '../lib/fetchJson';
import SpinIcon from '../components/SpinIcon';
import { catchErrors } from '../helper/catchErrors';

export default function cart() {
  const { data, mutate: mutateCart } = useSWR('/api/cart');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, showMessage] = useState(false);
  const [error, setError] = useState('');

  if (!data) {
    return <Loading />;
  }
  // undefined when deleting last one item in cart
  if (!Array.isArray(data.cart)) {
    return (
      <div className='max-w-screen-md mx-auto mt-8 mb-32'>
        <h2 className='text-3xl lg:text-4xl text-center font-serif'>Carts</h2>
        <div className='border-4 border-gray-800 mt-4 rounded-md h-96'>
          <SpinIcon />
        </div>
      </div>
    );
  }

  async function handleRemoveFromCart(productId) {
    try {
      const removeProduct = { productId };
      mutateCart(
        fetchJson('/api/cart', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(removeProduct),
        })
      );
    } catch (error) {
      console.error(error);
      catchErrors(error, window.alert);
    } finally {
    }
  }
  async function handleCheckout(paymentData) {
    try {
      setLoading(true);
      const url = `${server}/api/checkout`;
      const payload = { paymentData };
      mutateCart(await axios.post(url, payload));
      setSuccess(true);
      showMessage(true);
    } catch (err) {
      catchErrors(err, setError);
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='max-w-screen-md mx-auto mt-8 mb-32'>
      <h2 className='text-3xl lg:text-4xl text-center font-serif'>Carts</h2>
      <div className='border-4 border-gray-800 mt-4 rounded-md'>
        <CartItemList
          handleRemoveFromCart={handleRemoveFromCart}
          cart={data.cart}
          isLoggedIn={data.isLoggedIn}
          loading={loading}
          success={success}
        />
        <CartSummary cart={data.cart} handleCheckout={handleCheckout} />
      </div>
    </div>
  );
}
