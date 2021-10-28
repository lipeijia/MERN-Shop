import React, { useState } from 'react';
import ProductOrder from './ProductOrder';
import { IoIosArrowUp } from 'react-icons/io';

export default function Order({ total, purchaseTime, products }) {
  const [opened, setOpened] = useState(false);
  return (
    <div
      onClick={() => setOpened(!opened)}
      className='border-2 border-gray-200 rounded-sm mt-4'
    >
      <div className='z-10 cursor-pointer p-4 border-b-2 bg-gray-700 text-white flex justify-between'>
        <p>{` ${purchaseTime.year}-${purchaseTime.month}-${purchaseTime.day}  ${purchaseTime.hour}:${purchaseTime.minutes}`}</p>
        <span
          className={`${
            opened ? 'transform rotate-180' : ''
          } text-lg transition-all duration-500`}
        >
          <IoIosArrowUp />
        </span>
      </div>
      <div
        className={`transition-all transform duration-500 ${
          opened ? 'max-h-60 overflow-visible' : 'max-h-0 overflow-hidden'
        }`}
      >
        <div
          className={`transition-all transform delay-200 duration-500 ${
            opened ? 'opacity-1 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
        >
          <ProductOrder products={products} />
          <p className='text-right mx-4 py-3 border-t-2'>Total: ${total}</p>
        </div>
      </div>
    </div>
  );
}
