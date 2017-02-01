import Abstract from './abstract'

class Foo extends Abstract { }

it('is an abstract class and cannot be constructed', () => {
  expect( () => new Foo() ).toThrow(new TypeError("Cannot construct Abstract instances directly"));
})