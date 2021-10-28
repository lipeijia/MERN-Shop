import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { server } from '../lib/server';
import { randomSku } from '../helper/randomSku';
import Loading from '../components/Loading';
import { catchErrors } from '../helper/catchErrors';
import Message from '../components/Message';
import withSession from '../lib/section';

export default function create() {
  const INITIAL_PRODUCT = {
    name: '',
    price: '',
    media: '',
    description: '',
  };
  const [product, setProduct] = useState(INITIAL_PRODUCT);
  const [mediaPreview, setMediaPreview] = useState('');
  const [message, showMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [error, setError] = useState('');
  const fileRef = useRef();

  // disabled button when inputs aer empty
  useEffect(() => {
    const isFulfilled = Object.values(product).every((el) => Boolean(el));
    isFulfilled ? setBtnDisabled(false) : setBtnDisabled(true);
  }, [product]);

  // destructed product props
  const { name, price, description } = product;

  function handleChange(e) {
    const { name, value, files } = e.target;
    // preview image
    if (name === 'media') {
      setProduct((preState) => ({ ...preState, media: files[0] }));
      setMediaPreview(window.URL.createObjectURL(files[0]));
    } else {
      setProduct((preState) => ({ ...preState, [name]: value })); // computed property
    }
  }

  async function handleImageUpload() {
    const imageFile = new FormData();
    imageFile.append('file', product.media);
    imageFile.append('upload_preset', 'reactshop');
    imageFile.append('cloud_name', 'dnoymerhe');
    const response = await axios.post(
      'https://api.cloudinary.com/v1_1/dnoymerhe/image/upload',
      imageFile
    );
    return response.data.url;
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      showMessage(false);
      setError('');
      setLoading(true);
      const mediaUrl = await handleImageUpload();
      const url = `${server}/api/product/[pid]`;
      const sku = randomSku();
      const payload = { name, price, description, mediaUrl, sku };
      await axios.post(url, payload);
      setProduct(INITIAL_PRODUCT);
      setMediaPreview('');
      fileRef.current.value = '';
      showMessage(true);
    } catch (err) {
      catchErrors(err, setError);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className='px-4 py-4 lg:p-0 max-w-screen-lg mx-auto mt-8'>
      <h2 className='text-3xl lg:text-4xl text-center font-serif'>
        Create New Product
      </h2>
      <Message
        error={error}
        message={message}
        showMessage={showMessage}
        content='Your
          Product has been posted.'
      />

      <form onSubmit={handleSubmit} className='mt-8'>
        <div className='lg:flex'>
          <div className='lg:w-5/12 lg:flex lg:items-center mb-3'>
            <label className='mr-3' htmlFor='name'>
              Name
            </label>
            <input
              id='name'
              name='name'
              type='text'
              placeholder='Name'
              onChange={handleChange}
              value={name}
              className='px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full'
              required
            />
          </div>
          <div className='lg:w-3/12 lg:flex lg:items-center mb-3 lg:ml-3'>
            <label className='mr-3' htmlFor='price'>
              Price
            </label>
            <input
              id='price'
              name='price'
              type='number'
              placeholder='Price'
              min='0.00'
              step='0.01'
              onChange={handleChange}
              value={price}
              className='px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full'
              required
            />
          </div>
          <div className='lg:w-4/12 lg:flex lg:items-center mb-3 lg:ml-3'>
            <label className='mr-3' htmlFor='media'>
              Media
            </label>
            <input
              id='media'
              name='media'
              type='file'
              content='Select Image'
              className='form-input'
              accept='image/*'
              onChange={handleChange}
              ref={fileRef}
              className='px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full'
              required
            />
          </div>
        </div>
        <div className='flex flex-wrap justify-center'>
          <div className='w-6/12 sm:w-4/12 px-4'>
            <img
              src={mediaPreview}
              alt={name}
              className='shadow rounded max-w-full h-auto align-middle border-none'
            />
          </div>
        </div>
        <div className='mb-3'>
          <label htmlFor='description'>Product description</label>
          <textarea
            id='description'
            name='description'
            rows='8'
            cols='33'
            className='form-textarea'
            onChange={handleChange}
            value={description}
            className='px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full'
            required
          />
        </div>
        <div className='flex justify-end mt-5'>
          <button
            disabled={btnDisabled || loading}
            className={
              (btnDisabled ? 'disabled:opacity-30' : 'hover:bg-gray-900') +
              ' disabled:cursor-not-allowed  bg-gray-700 text-white uppercase text-sm px-6 py-3 rounded-sm  shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 w-full lg:w-max font-serif'
            }
            type='submit'
          >
            Submit
          </button>
        </div>
      </form>
      {loading && <Loading />}
    </div>
  );
}

export const getServerSideProps = withSession(async function ({ req, res }) {
  const user = req.session.get('user');

  if (!user || user.role !== 'admin') {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { user: req.session.get('user') },
  };
});
