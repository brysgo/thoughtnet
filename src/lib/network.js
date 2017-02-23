import Pool from './pool';
import BinaryOp from './binary_op';
import Anagramlet from './anagramlet';

export default class Network {
  
  constructor() {
    Object.assign(this, {
      targets: [],
      nodePool: new Pool(BinaryOp),
      generation: 0,
      running: false,
      _currentOutputs: []
    });
    this.runOnce = this.runOnce.bind(this);
    this.forward = this.forward.bind(this);
  }

  start() {
    this._interval = setInterval(this.runOnce, 1000);
  }
  
  stop() {
    clearInterval(this._interval);
  }
  
  runOnce() {
    const result = this.forward();
    this.backward();
    this.generation++;
    return result;
  }
  
  forward() {
    Array.from(this.nodePool).forEach((node) => node.forward());
    this._currentOutputs = this.targets.map((target) => {
      return Array.from(target.pool).reduce((output, anagramlet) => {
        const { position, value } = anagramlet;
        while (output.length < target.size) { output.push([0, 0]) }
        const [sum, count] = output[position];
        output[position] = [sum + value, count + 1];
        return output;
      }, []).map(([sum, count]) => ((sum / count) >= 0.5) ? 1 : 0);
    });
    this.targets.forEach((target) => {
      target.forward();
    });
    return this._currentOutputs;
  }
  
  backward() {
    this.targets.forEach((target) => {
      target.backward();
      if (this.generation % 5 === 4) {
        const pruned = target.pool.prune(this.generation/2);
        target.pool.spawn(pruned);
      }
    });
    if (this.generation % 5 === 4) {
      const pruned = this.nodePool.prune(2);
      Array.from(this.nodePool).forEach((node) => node.setRewardValue(0));
      this.nodePool.spawn(pruned);
    }
  }
  
  attachSource(source) {
    this.nodePool.unshift(...source.bits());
    this.nodePool.spawn(1000);
  }
  
  attachTarget(target) {
    const pool = new Pool(Anagramlet, this.nodePool, target.size);
    target.setPool(pool);
    this.targets.push(target);
    pool.spawn(1000);
  }
}