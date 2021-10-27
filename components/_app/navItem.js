import React from 'react';
import Link from 'next/link';

export default function NavItem({ name = 'home', href = '/', active = false }) {
  return (
    <Link href={href}>
      <a
        className={
          active
            ? 'font-serif border-b-4 border-white border-opacity-50 p-1 m-3 text-xl text-white duration-500'
            : 'font-serif border-b-4 border-transparent p-1 m-3 text-xl text-white'
        }
      >
        {name}
      </a>
    </Link>
  );
}
