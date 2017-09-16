import Anagramlet from './anagramlet';

jest.useFakeTimers();

it('implements all required methods', () => {
  expect( () => new Anagramlet([], 3) ).not.toThrow();
  jest.runAllTimers();
})