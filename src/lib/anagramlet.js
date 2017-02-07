import Organism from './organism';

export default class Anagramlet extends Organism {
  constructor(pool, nodePool, targetSize) {
    super();
    this._node = Array.from(nodePool)[Math.floor(Math.random() * nodePool.length)];
    this._position = Math.floor(Math.random() * targetSize);
  }
  
  setRewardValue(value) {
    this._rewardValue = value;
  }
  
  rewardValue() {
    return this._rewardValue;
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