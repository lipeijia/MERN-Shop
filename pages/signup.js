import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import FormInput from '../components/form/FormInput';
import FormButton from '../components/form/FormButton';
import { RiUser3Line } from 'react-icons/ri';
import { HiOutlineMail } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';
import Loading from '../components/Loading';
import { catchErrors } from '../helper/catchErrors';
import Message from '../components/Message';
import { server } from '../lib/server';
import axios from 'axios';
import Router from 'next/router';

export default function signup() {
  const INITIAL_USER = {
    name: '',
    email: '',
    password: '',
  };
  const [user, setUser] = useState(INITIAL_USER);
  // Btn disabled
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  // Display success/failure message
  const [message, showMessage] = useState(false);
  // Error message
  const [error, setError] = useState('');

  // controlled input
  const inputChange = (e) => {
    const { name, value } = e.target;
    setUser((preState) => ({ ...preState, [name]: value }));
  };

  useEffect(() => {
    setUser(INITIAL_USER);
  }, []);

  // Btn Enabled
  useEffect(() => {
    const fulfilling = Object.values(user).every((info) => info.trim() !== '');
    setBtnDisabled(!fulfilling);
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      // make request to sing up user
      const url = `${server}/api/signup`;
      const payload = { ...user };
      await axios.post(url, payload);
      Router.push('/account');
    } catch (err) {
      catchErrors(err, setError);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='px-4 py-4 lg:p-0 max-w-screen-sm mx-auto mt-8'>
          <h2 className='text-3xl lg:text-4xl text-center font-serif'>
            Sign Up
          </h2>
          <Message
            error={error}
            message={message}
            showMessage={showMessage}
            content='Sign Up Successfully.'
          />
          <FormInput
            name='name'
            value={user.name}
            type='text'
            icon={<RiUser3Line />}
            inputChange={inputChange}
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
            <FormButton name='Sign Up' disabled={btnDisabled || loading} />
          </div>
        </div>
      </form>
      <p className='text-center mt-4'>
        Have an account?
        <Link href='/login'>
          <a className='text-blue-400 pl-4'>Log in now</a>
        </Link>
      </p>
      {loading && <Loading />}
    </>
  );
}
