import React, { useState } from 'react';
import Modal from '../Modals/Modal';

function ProductAttributes({
  description,
  isLoggedIn,
  // setModal,
  // modal,
  handleDelete,
}) {
  const [modal, setModal] = useState(false);

  return (
    <>
      <hr className=' mt-10 mb-5' />
      <p className='text-xl'>About Product</p>
      <p>{description}</p>
      {isLoggedIn && (
        <button
          onClick={() => setModal(true)}
          className='mt-4 w-max text-red-600 hover:text-white hover:bg-red-600 border-red-600 p-2 rounded-lg border-2 transition'
        >
          Delete Product
        </button>
      )}

      <Modal
        open={modal}
        handleClose={() => setModal(false)}
        handleDelete={handleDelete}
        modalTitle='Delete Product'
        modalContent='Are you sure to delete this product?'
      />
    </>
  );
}

export default ProductAttributes;
