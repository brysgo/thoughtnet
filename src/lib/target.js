import Node from './node';

export default class Target extends Node {
  constructor(generator, size) {
    super();
    this.generator = generator();
    this._currentValue = undefined;
    this._size = size;
  }
  
  setPool(pool) {
    this._targetPool = pool;
  }
  
  currentValue() {
    return this._currentValue;
  }
  
  forward() {
    this._currentValue = this.generator.next().value;
  }
  
  backward() {
    Array.from(this._targetPool).forEach((anagramlet) => {
      if (anagramlet.position < this.size) {
        const reward = this.currentValue()[anagramlet.position] == anagramlet.value ? 1 : -1
        anagramlet.setRewardValue(anagramlet.rewardValue + reward);
      }
    })
    Array.from(this._targetPool).forEach((anagramlet) => {
      anagramlet.backward();
    })
  }
  
  get pool() {
    return this._targetPool;
  }
  
  get size() {
    return this._size;
  }
}