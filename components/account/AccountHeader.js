import React from 'react';
import { FaRegUser } from 'react-icons/fa';
import { formateDate } from '../../helper/formateDate';

export default function AccountHeader({ name, email, role, createAt }) {
  return (
    <div className='w-full bg-gradient-to-tr from-gray-900 via-gray-700 to-gray-800 rounded-md p-8 text-center'>
      <div className='rounded-full bg-gray-200 inline-block p-3 mt-12'>
        <FaRegUser className='text-gray-800 text-6xl' />
      </div>
      <h3 className='text-gray-100 font-serif font-bold text-2xl'>{name}</h3>
      <p className='text-gray-300 text-sm'>{email}</p>
      <p className='text-gray-300 text-sm'>{`Joined ${formateDate(
        createAt
      )}`}</p>
      <p className='text-gray-300 border-2 border-gray-600 inline-block px-3 py-1 mt-2 text-xs'>
        {role}
      </p>
    </div>
  );
}
