import BinaryOp from './binary_op';


it('implements all required methods', () => {
  expect( () => new BinaryOp([{}, {}]) ).not.toThrow();
})