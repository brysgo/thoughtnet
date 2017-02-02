import Abstract from './abstract'

class Foo extends Abstract { }

it('is an abstract class and cannot be constructed', () => {
  expect( () => new Foo() ).toThrow(new TypeError("Cannot construct Abstract instances directly"));
})

class Baz extends Abstract { 
  doIt() {
    return 'use it to do the thing';
  }
}
class Bar extends Abstract {
  constructor() {
    super(Foo, Baz);
  }
}

it('can use multiple abstract classes if it has a constructor', () => {
  expect( () => new Bar() ).not.toThrow(new TypeError("Cannot construct Abstract instances directly"));
  expect( () => new Bar() ).toThrow(new TypeError(`Method missing doIt: use it to do the thing`));
})