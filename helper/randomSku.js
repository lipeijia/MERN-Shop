// 3 - 2 - 4  digit numbers

export function randomSku() {
  const digitZero = (num) => {
    const x = '1';
    return parseInt(x.padEnd(+num + 1, '0'));
  };

  const randomDigit = (num) => {
    return Math.round(Math.random() * digitZero(num));
  };

  return `${randomDigit(3)}-${randomDigit(2)}-${randomDigit(4)}`;
}
