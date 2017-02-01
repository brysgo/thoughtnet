import Network from './network';

it('feeds on input sources', () => {
  const inputsource = function*() {
    while(true) {
      yield Math.random();
    }
  };
  
  const network = new Network();
  network.attachInput(inputsource);
  network.nodes.forEach((n) => expect(n.value).toEqual(undefined));
  network.forward();
  const nextNodeString = network.nodes.reduce((a, b) => a + b.value.toString(), '');
  
  expect(typeof nextNodeString).toEqual('string');
})