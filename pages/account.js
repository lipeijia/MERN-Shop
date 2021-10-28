import React from 'react';
import Meta from '../components/Meta';
import withSession from '../lib/section';
import { server } from '../lib/server';
import axios from 'axios';
import Loading from '../components/Loading';
import AccountHeader from '../components/account/AccountHeader';
import AccountOrders from '../components/account/AccountOrders';

export default function account({ user, data }) {
  if (!user || user.isLoggedIn === false) {
    return <Loading />;
  }
  return (
    <>
      <Meta title='Account' />
      <div className='max-w-screen-sm mx-auto px-4 mt-8 mb-32'>
        <AccountHeader {...user} />
        <AccountOrders data={data} />
      </div>
    </>
  );
}

export const getServerSideProps = withSession(async function ({ req, res }) {
  const user = req.session.get('user');

  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  res = await axios.get(`${server}/api/orders`, {
    params: { userId: user._id },
  });
  const data = res.data;

  return {
    props: { user: req.session.get('user'), data },
  };
});
