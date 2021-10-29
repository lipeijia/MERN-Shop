import Link from 'next/link';
import { TiDeleteOutline } from 'react-icons/ti';

export default function CartItem({
  _id,
  name,
  mediaUrl,
  price,
  quantity,
  handleRemoveFromCart,
}) {
  return (
    <div className='border-b-2 flex bg-white box-border mx-4 pt-4 pb-4'>
      <div>
        <img src={mediaUrl} alt={name} width='150px' height='150px' />
      </div>
      <div className='flex-grow pl-4'>
        <h2 className='text-2xl mt-2'>
          <Link href={`product/${_id}`}>
            <a>{name}</a>
          </Link>
        </h2>
        <p className='text-gray-500'>{`$${price} x ${quantity}`}</p>
      </div>
      <div>
        <button
          onClick={() => handleRemoveFromCart(_id)}
          className='p-2 text-2xl text-gray-400 hover:text-gray-600'
        >
          <TiDeleteOutline />
        </button>
      </div>
    </div>
  );
}
