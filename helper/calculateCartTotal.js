const calculateCartTotal = (products) => {
  const total = products.reduce((acc, el) => {
    acc += el.price * el.quantity;
    return acc;
  }, 0);

  // deal with floating numbers
  const cartTotal = ((total * 100) / 100).toFixed(2);
  const stripeTotal = Number((total * 100).toFixed(2));

  return { cartTotal, stripeTotal };
};

export default calculateCartTotal;
