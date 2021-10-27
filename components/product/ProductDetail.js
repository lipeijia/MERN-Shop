import AddProductToCart from './AddProductToCart';
export default function ProductDetail({
  _id,
  name,
  price,
  mediaUrl,
  sku,
  isLoggedIn,
}) {
  return (
    <>
      <div className='flex flex-col'>
        <div className='flex flex-col lg:flex-row'>
          <div className='w-full lg:w-3/6'>
            <img className='object-cover' src={mediaUrl} alt={name} />
          </div>
          <div className='flex flex-col justify-center items-start lg:ml-9'>
            <h1 className='font-serif w-full flex-none text-4xl text-black mb-1.5'>
              {name}
            </h1>
            <p className='text-xl leading-6 text-black mb-4'>{`$${price}`}</p>
            <AddProductToCart isLoggedIn={isLoggedIn} _id={_id} />
            <small className='flex-initial text-sm text-gray-400 bg-gray-100 p-2 rounded-md'>
              SKU:{sku}
            </small>
          </div>
        </div>
      </div>
    </>
  );
}
