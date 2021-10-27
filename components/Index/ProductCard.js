import React from 'react';
import Link from 'next/link';

export default function ProductCard({ product }) {
  const { _id, name, mediaUrl } = product;

  // const urlName = name.replaceAll(' ', '-').toLowerCase();
  return (
    <Link
      href={{
        pathname: '/product/[pid]',
        query: { pid: _id },
      }}
    >
      <a className='w-full sm:w-auto md:w-1/2 lg:w-1/3 3xl:w-1/4'>
        <div className='p-4 border-4 hover:border-6 m-3 lg:m-4 border-gray-100 hover:border-gray-700 duration-300 shadow-md hover:shadow-lg overflow-hidden cursor-pointer transform hover:-translate-y-1 hover:-translate-x-1 text-center'>
          <img src={mediaUrl} alt={name} />
          <p className='text-gray-600 text-base border-t-2 py-2 font-serif'>
            {name}
          </p>
        </div>
      </a>
    </Link>
  );
}
