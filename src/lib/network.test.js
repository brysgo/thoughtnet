import Network from './network';
import Source from './source';
import Target from './target';

it('can run a basic example source to target', () => {
  const network = new Network();
  network.attachSource(new Source(function*() {
    for (let i=0; true; i++) {
      var n= (i >>> 0).toString(2);
      n="00000".substr(n.length)+n;
      yield n
    }
  }, 5));
  
  network.attachTarget(new Target(function*() {
    for (let i=1; true; i++) {
      var n= (i+1 >>> 0).toString(2);
      n="00000".substr(n.length)+n;
      yield n
    }
  }, 5));
  
  network.runOnce();
  network.runOnce();
  network.runOnce();
  network.runOnce();
  network.runOnce();
  network.runOnce();
  network.runOnce();
  network.runOnce();
  network.runOnce();
  network.runOnce();
})