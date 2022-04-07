const idx = require('../helpers/example');

describe("testComputation", () =>{
  it('adds 1 + 5', () =>{
    expect(idx.getComputation(1, 5)).toBe(6);
  });
});
