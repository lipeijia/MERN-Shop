export default function Button({
  size = 'sm',
  content = 'button',
  bgColor = 'gray',
  handleClick,
}) {
  return (
    <button
      className={`border-2 border-${bgColor}-700 text-${bgColor}-700 hover:border-${bgColor}-700 hover:bg-${bgColor}-700 font-serif uppercase text-${size} hover:text-white px-6 py-3 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 `}
      type='button'
      onClick={handleClick}
    >
      {content}
    </button>
  );
}
