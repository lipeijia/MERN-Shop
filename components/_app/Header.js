import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';
import '../../node_modules/nprogress/nprogress.css';
import NavItem from './navItem';
import logoPng from '../../public/logo.png';
import useUser from '../../lib/useUser';
import fetchJson from '../../lib/fetchJson';

export default function Header() {
  const router = useRouter();
  const { user, mutateUser } = useUser();

  // Show Process bar when change to a different route.
  useEffect(() => {
    const handleStart = () => {
      NProgress.start();
    };
    const handleStop = () => {
      NProgress.done();
    };
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router]);

  // Show active underline
  const isActive = (route) => route === router.pathname;

  // Render header base on login state.
  const loginHeader = (
    <>
      {' '}
      {user?.role === 'admin' && (
        <NavItem
          name='Create Product'
          href='/create'
          active={isActive('/create')}
        />
      )}
      <NavItem name='Account' href='/account' active={isActive('/account')} />
      <a
        href='/api/logout'
        className='font-serif text-xl text-white border-b-4 border-transparent p-1 m-3'
        onClick={async (e) => {
          e.preventDefault();
          mutateUser(await fetchJson('/api/logout', { method: 'POST' }), false);
          router.push('/login');
        }}
      >
        Logout
      </a>
    </>
  );

  const defaultHeader = (
    <>
      <NavItem name='Sign Up' href='/signup' active={isActive('/signup')} />
      <NavItem name='Log In' href='/login' active={isActive('/login')} />
    </>
  );
  let renderHeader = user?.isLoggedIn ? loginHeader : defaultHeader;

  return (
    <div>
      <div className='flex justify-center items-center bg-gradient-to-r from-gray-900 via-black to-gray-800'>
        <div>
          <Link href='/'>
            <a>
              <Image
                className='cursor-pointer'
                src={logoPng}
                width={50}
                height={50}
              />
            </a>
          </Link>
        </div>
        <NavItem name='Cart' href='/cart' active={isActive('/cart')} />
        {renderHeader}
      </div>
    </div>
  );
}
