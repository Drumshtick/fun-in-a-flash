const isNumber = (char) => {
  // Source https://helloacm.com/how-to-check-if-a-string-is-a-number-numeric-using-regex-c-javascript/
  return /^\s*[-+]?((\d+(\.\d+)?)|(\d+\.)|(\.\d+))(e[-+]?\d+)?\s*$/.test(char) || char === '';
};

export default isNumber;
