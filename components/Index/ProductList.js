import React from 'react';
import ProductCard from './ProductCard';

export default function ProductList({ products }) {
  return (
    <div className='md:flex flex-wrap py-4 min-h-screen'>
      {products.map((product) => {
        return <ProductCard product={product} key={product._id} />;
      })}
    </div>
  );
}
