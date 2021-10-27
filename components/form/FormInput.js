import React, { useState } from 'react';
import { capitalize } from '../../helper/capitalize';

export default function FormInput(props) {
  const { icon, name = 'label', type = 'text', value, inputChange } = props;
  return (
    <>
      <label htmlFor={name}>{capitalize(name)}</label>
      <div className='relative flex w-full flex-wrap items-stretch mb-3'>
        <span className='z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3'>
          {icon}
        </span>
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          placeholder={capitalize(name)}
          onChange={inputChange}
          className='px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full pl-10'
        />
      </div>
    </>
  );
}
