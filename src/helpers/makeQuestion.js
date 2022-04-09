const max = process.env.NEXT_PUBLIC_MAX_ADDEND

const makeQuestion = () => {
  const value1 = Math.floor(Math.random() * max);
  const value2 = Math.floor(Math.random() * max);

  return {value1, value2};
};

export default makeQuestion;
