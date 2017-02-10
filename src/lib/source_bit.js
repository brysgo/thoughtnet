import Abstract from './abstract';
import Node from './node';
import Organism from './organism';

export default class SourceBit extends Abstract {
  constructor(source, i) {
    super(Node, Organism);
    this._source = source;
    this._i = i;
  }
  
  currentValue() {
    return this._currentValue;
  }
  
  forward() {
    if (this._i === 0) this._source.forward();
    this._currentValue = parseInt(this._source.currentValue()[this._i]) || 0;
  }
  
  backward() {
    return;
  }
  
  die() {
    return false;
  }
  
  setRewardValue(value) {
    return;
  }
  
  rewardValue() {
    return Infinity;
  }
}