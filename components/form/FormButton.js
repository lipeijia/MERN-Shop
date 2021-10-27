import React from 'react';

export default function FormButton({ name = 'button', disabled = true }) {
  return (
    <button
      disabled={disabled}
      className={
        (disabled ? 'disabled:opacity-30' : 'hover:bg-gray-900') +
        ` cursor-pointer bg-gray-700 text-white font-bold font-serif uppercase text-sm px-6 py-3 rounded shadow hover:shadow-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 w-full`
      }
      type='submit'
    >
      {name}
    </button>
  );
}
