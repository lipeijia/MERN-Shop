export default function Button({
  size = 'sm',
  content = 'button',
  bgColor = 'gray',
  handleClick,
}) {
  // let color;
  // switch (bgColor) {
  //   case 'red':
  //     color = 'red';
  //     break;
  //   case 'pink':
  //     color = 'pink';
  //     break;
  //   case 'gray':
  //     color = 'gray';
  //     break;
  //   default:
  //     color = 'gray';
  // }

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
