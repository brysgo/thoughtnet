import Organism from './organism';

export default class Anagramlet extends Organism {
  constructor(pool, nodePool, targetSize) {
    super();
    this._node = Array.from(nodePool)[Math.floor(Math.random() * nodePool.length)];
    this._position = Math.floor(Math.random() * targetSize);
    this._rewardValue = 0;
  }
  
  setRewardValue(value) {
    this._rewardValue = value;
  }
  
  rewardValue() {
    return this._rewardValue;
  }
  
  backward() {
    this._node.setRewardValue(this._node.rewardValue() + this.rewardValue());
  }
  
  get value() {
    return this._node.currentValue();
  }
  
  get position() {
    return this._position;
  }
  
  die() {
    return;
  }
}