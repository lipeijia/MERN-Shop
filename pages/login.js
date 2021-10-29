import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import useUser from '../lib/useUser';
import fetchJson from '../lib/fetchJson';
import { catchErrors } from '../helper/catchErrors';
import FormInput from '../components/form/FormInput';
import FormButton from '../components/form/FormButton';
import Message from '../components/Message';
import Loading from '../components/Loading';
import { HiOutlineMail } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';

export default function login() {
  const { mutateUser } = useUser({
    redirectTo: '/account',
    redirectIfFound: true,
  });
  const INITIAL_USER = {
    email: '',
    password: '',
  };
  const [user, setUser] = useState(INITIAL_USER);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, showMessage] = useState(false);
  const [error, setError] = useState('');

  const inputChange = (e) => {
    const { name, value } = e.target;
    setUser((preState) => ({ ...preState, [name]: value }));
  };
  useEffect(() => {
    const typing = Object.values(user).every((info) => info.trim() !== '');
    setBtnDisabled(!typing);
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      mutateUser(
        await fetchJson('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user),
        })
      );
    } catch (error) {
      console.error('An unexpected error happened:', error);
      catchErrors(error, setError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='px-4 py-4 lg:p-0 max-w-screen-sm mx-auto mt-8'>
          <h2 className='text-3xl lg:text-4xl text-center font-serif'>Login</h2>
          <Message
            error={error}
            message={message}
            showMessage={showMessage}
            content='Sign Up Successfully.'
          />
          <FormInput
            name='email'
            value={user.email}
            type='email'
            icon={<HiOutlineMail />}
            inputChange={inputChange}
          />
          <FormInput
            name='password'
            value={user.password}
            type='password'
            icon={<RiLockPasswordLine />}
            inputChange={inputChange}
          />
          <div className='mt-8'>
            <FormButton name='Login' disabled={btnDisabled || loading} />
          </div>
        </div>
      </form>
      <p className='text-center mt-4'>
        New user?
        <Link href='/signup'>
          <a className='text-blue-400 pl-4'>Sign up here</a>
        </Link>
      </p>
      {loading && <Loading />}
    </>
  );
}
