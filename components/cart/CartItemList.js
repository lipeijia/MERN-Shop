import router, { useRouter } from 'next/router';
import Button from './Button';
import CartItem from './CartItem';

export default function CartItemList({
  cart,
  isLoggedIn,
  handleRemoveFromCart,
  loading,
}) {
  const router = useRouter();

  let renderBtn;
  if (isLoggedIn) {
    renderBtn = (
      <Button content='View Products' handleClick={() => router.push('/')} />
    );
  } else {
    renderBtn = (
      <Button content='Login' handleClick={() => router.push('/login')} />
    );
  }

  let renderCart;
  if (cart.length !== 0 && !loading) {
    renderCart = cart.map((item) => (
      <CartItem
        key={item._id}
        {...item}
        handleRemoveFromCart={handleRemoveFromCart}
      />
    ));
  } else {
    renderCart = (
      <div className='mt-8 rounded-lg bg-gray-100 h-56 p-8 flex flex-col justify-center items-center'>
        <p className='text-4xl font-thin text-gray-800 mb-6'>
          No Products in Your Cart Yet.
        </p>
        {renderBtn}
      </div>
    );
  }

  return <>{renderCart}</>;
}
