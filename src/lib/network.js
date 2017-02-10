import Pool from './pool';
import BinaryOp from './binary_op';
import Anagramlet from './anagramlet';

export default class Network {
  
  constructor() {
    Object.assign(this, {
      targets: {},
      nodePool: new Pool(BinaryOp),
      generation: 0,
      running: false,
      _currentOutputs: []
    });
    this.runOnce = this.runOnce.bind(this);
  }

  start() {
    this._interval = setInterval(this.runOnce, 1000);
  }
  
  stop() {
    clearInterval(this._interval);
  }
  
  runOnce() {
    this.forward();
    this.backward();
  }
  
  forward() {
    Array.from(this.nodePool).forEach((node) => node.forward());
    const targetPools = Object.values(this.targets);
    this._currentOutputs = targetPools.map((targetPool) => {
      return Array.from(targetPool).reduce((output, anagramlet) => {
        const { position, value } = anagramlet;
        while (output.length <= position) { output.push([0, 0]) }
        const [sum, count] = output[position];
        output[position] = [sum + value, count + 1];
        return output;
      }, []).map(([sum, count]) => sum / count);
    });
  }
  
  backward() {
    const { _currentOutputs } = this;
    console.log(JSON.stringify(_currentOutputs));
  }
  
  attachSource(source) {
    this.nodePool.unshift(...source.bits());
    this.nodePool.spawn(100);
  }
  
  attachTarget(target) {
    this.targets[target] = new Pool(Anagramlet, this.nodePool, target.size);
    this.targets[target].spawn(100);
  }
}