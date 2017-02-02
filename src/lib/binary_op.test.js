import BinaryOp from './binary_op';


it('complains when methods missing', () => {
  expect( () => new BinaryOp() ).toThrow(new TypeError(`Method missing forward: use it to update the currentValue with the dependancies and operation`));
})