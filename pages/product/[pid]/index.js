import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { server } from '../../../lib/server';
import useUser from '../../../lib/useUser';
import ProductDetail from '../../../components/product/ProductDetail';
import ProductAttributes from '../../../components/product/ProductAttributes';
import Meta from '../../../components/Meta';
import Loading from '../../../components/Loading';
import Message from '../../../components/Message';
import { IoMdArrowRoundBack } from 'react-icons/io';

export default function Pid({ product }) {
  const { user } = useUser();
  if (!product) {
    return <Loading />;
  }
  const [modal, setModal] = useState(false);
  const [error, setError] = useState('');
  const [message, showMessage] = useState(false);

  const router = useRouter();
  async function handleDelete() {
    const url = `${server}/api/product/[pid]`;
    await axios
      .delete(url, { data: { id: product._id } })
      .then(() => showMessage(true))
      .catch((err) => setError(err));
    setModal(false);
    router.push('/');
  }
  return (
    <>
      <Meta title={`Product - ${product.name}`} />
      <div className='container mx-auto max-w-screen-lg px-4 lg:px-0'>
        <Message
          error={error}
          message={message}
          showMessage={showMessage}
          content='Deleting Product Successfully.'
        />
        <Link href='/' className='inline-flex'>
          <a className='flex justify-start items-center my-4 p-3 text-gray-500 border-2 border-transparent rounded-lg hover:border-gray-400 transition'>
            {' '}
            <IoMdArrowRoundBack />
            View All Products
          </a>
        </Link>
        <ProductDetail {...product} isLoggedIn={user?.isLoggedIn} />
        <ProductAttributes
          {...product}
          isLoggedIn={user?.isLoggedIn}
          handleDelete={handleDelete}
          setModal={setModal}
          modal={modal}
        />
      </div>
    </>
  );
}

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export async function getStaticProps({ params: { pid } }) {
  const res = await fetch(`${server}/api/product/${pid}`);
  const data = await res.json();
  const product = JSON.parse(JSON.stringify(data));
  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product,
      revalidate: true,
    },
  };
}
