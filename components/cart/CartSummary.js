import React, { useState, useEffect } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import calculateCartTotal from '../../helper/calculateCartTotal';

export default function CartSummary({ cart = [], handleCheckout }) {
  const [isEmpty, setIsEmpty] = useState(false);
  const [cartAmount, setCartAmount] = useState(0);
  const [stripeAmount, setStripeAmount] = useState(0);

  useEffect(() => {
    setIsEmpty(cart.length === 0);
    const { cartTotal, stripeTotal } = calculateCartTotal(cart);
    setCartAmount(cartTotal);
    setStripeAmount(stripeTotal);
  }, [cart]);

  return (
    <div className='rounded-sm shadow-sm bg-white mx-4 my-8 border-2 border-gray-200 p-2 sm:p-4 flex justify-between items-center'>
      <div className='flex'>
        <p>Sub Total</p>
        <p className='pl-4'>
          <span>$</span>
          {cartAmount}
        </p>
      </div>
      <StripeCheckout
        name='NERN Stack Shop'
        amount={stripeAmount}
        image={cart.length > 0 ? cart[0].mediaUrl : ''}
        currency='USD'
        shippingAddress={true}
        billingAddress={true}
        zipCode={true}
        stripeKey='pk_test_51JjzMPLAzoxj0jC1dwVRdVD1rUE77yLT042KvpFGJHdE1FwiSbOK447YrkUHbfeMwS8ThpvKwEyXXs2ZQ70lCKP7009LcMs50y'
        token={handleCheckout}
        triggerEvent='onClick'
      >
        <button
          disabled={isEmpty}
          className={` ${
            isEmpty
              ? 'bg-gray-200 cursor-not-allowed'
              : 'bg-gray-600 hover:bg-gray-800 hover:shadow-sm '
          } text-white  font-serif uppercase text-sm px-3 sm:px-6 py-3 rounded shadow outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
          type='button'
        >
          Checkout
        </button>
      </StripeCheckout>
    </div>
  );
}
