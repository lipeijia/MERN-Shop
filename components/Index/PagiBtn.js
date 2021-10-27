import React from 'react';

export default function PagiBtn({
  disabled = false,
  name,
  content,
  handleClick,
  currentHighlight = 'border-gray-600 text-gray-600 bg-white',
}) {
  return (
    <button
      onClick={handleClick}
      name={name}
      className={`${
        disabled ? 'cursor-not-allowed text-gray-200' : currentHighlight
      } first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid cursor-pointer`}
      disabled={disabled}
    >
      {content}
    </button>
  );
}
