import Abstract from './abstract'

class Foo extends Abstract { }

it('is an abstract class and cannot be constructed', () => {
  expect( () => new Foo() ).toThrow(new TypeError("Cannot construct Abstract instances directly"));
})

class Bar extends Abstract {
  constructor() {
    super(Foo);
  }
}

it('unless it has a constructor with other abstract classes passed upward', () => {
  expect( () => new Bar() ).not.toThrow(new TypeError("Cannot construct Abstract instances directly"));
})