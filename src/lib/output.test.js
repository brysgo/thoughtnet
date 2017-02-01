import Output from './output';
import Network from './network';
import Identity from './targets/identity';

it('attaches a network to a datasource representing target values', () => {
  const inputsource = function*() {
    while(true) {
      yield Math.random();
    }
  };
  
  const network = new Network();
  network.attachInput(inputsource);
  const autoencoder = new Output({network, target: Identity});
})