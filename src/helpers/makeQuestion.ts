const max: number = parseInt(process.env.NEXT_PUBLIC_MAX_ADDEND, 10);

interface MakeQuestion {
  value1: number,
  value2: number
}

export const makeQuestion = (): MakeQuestion => {
  const value1 = Math.floor(Math.random() * max);
  const value2 = Math.floor(Math.random() * max);

  return {value1, value2};
};
