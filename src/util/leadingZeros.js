export const lz = (num, zeros = 2) => {
  const extendedNum = num + 10 ** zeros;
  return extendedNum.toString().substring(1);
};
