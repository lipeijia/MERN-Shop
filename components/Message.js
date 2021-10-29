import React from 'react';
import { ImCheckmark } from 'react-icons/im';
import { MdErrorOutline } from 'react-icons/md';
import { CSSTransition } from 'react-transition-group';

export default function Message({
  error = false,
  message = true,
  showMessage,
  content = 'text',
}) {
  let isError = Boolean(error);
  if (isError) {
    return (
      <CSSTransition
        in={isError}
        classnames='message'
        timeout={500}
        unmountOnExit
      >
        <div>
          <div className='mt-8 text-white px-6 py-4 border-0 rounded relative mb-4 bg-red-500'>
            <span className='text-4xl inline-block mr-5 align-middle'>
              <MdErrorOutline />
            </span>
            <span className='inline-block align-middle mr-8'>
              <b className='block capitalize text-lg'>Oops!</b> {error}
            </span>
          </div>
        </div>
      </CSSTransition>
    );
  } else {
    return (
      <CSSTransition
        in={message}
        classnames='message'
        timeout={500}
        unmountOnExit
      >
        <div>
          <div className='mt-8 text-white px-6 py-4 border-0 rounded relative mb-4 bg-green-500'>
            <span className='text-4xl inline-block mr-5 align-middle'>
              <ImCheckmark />
            </span>
            <span className='inline-block align-middle mr-8'>
              <b className='block capitalize text-lg'>success!</b> {content}
            </span>
            <button
              onClick={() => showMessage(false)}
              className='absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none'
            >
              <span>×</span>
            </button>
          </div>
        </div>
      </CSSTransition>
    );
  }
}
