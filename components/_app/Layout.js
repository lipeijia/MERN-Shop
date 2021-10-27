import React, { useState, useEffect } from 'react';
import Header from './Header';
import Meta from '../Meta';
import withSession from '../../lib/section';

export default function Layout({ children, user }) {
  return (
    <>
      <Meta />
      <Header />
      <div className='container mx-auto'>{children}</div>
    </>
  );
}
