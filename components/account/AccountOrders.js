import React, { useState } from 'react';
import Order from './Order';

export default function AccountOrders({ data }) {
  return (
    <>
      <h3 className='mt-4 text-2xl font-serif mb-4'>Orders</h3>
      {data.map((order, i) => {
        return <Order key={i} {...order} />;
      })}
    </>
  );
}
