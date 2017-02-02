import Organism from './organism';

export default class Anagramlet extends Organism {
  constructor(pool, targetSize) {
    super();
    this._node = Math.floor(Math.random() * pool.length);
    this._position = Math.floor(Math.random() * targetSize);
  }
  
  setRewardValue(value) {
    this._rewardValue = value;
  }
  
  rewardValue() {
    return this._rewardValue;
  }
  
  die() {
    return;
  }
}