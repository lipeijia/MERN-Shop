export default function ProductOrder({ products }) {
  return (
    <>
      {products.map((p, i) => (
        <div key={i} className='flex p-4'>
          <div>
            <img src={p.mediaUrl} width='70px' height='70px' />
          </div>
          <div className='ml-4'>
            <p className='font-serif text-lg'>{p.name}</p>
            <p className='text-gray-500'>{`$${p.price} x ${p.quantity}`}</p>
          </div>
        </div>
      ))}
    </>
  );
}
