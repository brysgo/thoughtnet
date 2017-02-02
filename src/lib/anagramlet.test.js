import Anagramlet from './anagramlet';


it('implements all required methods', () => {
  expect( () => new Anagramlet([], 3) ).not.toThrow();
})