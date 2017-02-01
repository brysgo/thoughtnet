import Node from './node';

class FooNode extends Node { 
  constructor() {
    super();
  }
}

it('cannot be constructed and complains when methods missing', () => {
  expect( () => new Node() ).toThrow(new TypeError("Cannot construct Abstract instances directly"));
  expect( () => new FooNode() ).toThrow(new TypeError(`Method missing forward: use it to update the currentValue with the dependancies and operation`));
})
