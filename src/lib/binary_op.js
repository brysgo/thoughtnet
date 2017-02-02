import Abstract from './abstract';
import Node from './node';
import Organism from './organism';
import operations from './utils/operations';

export default class BinaryOp extends Abstract {
  constructor(pool, operation='^') {
    super(Node, Organism);
    Object.assign(this, {
      _currentValue: 0,
      operation,
      left: pool[Math.floor(Math.random() * pool.length)],
      right: pool[Math.floor(Math.random() * pool.length)]
    });
  }
  
  forward() {
    this._currentValue = operations[this.operation](this.left.currentValue(), this.right.currentValue())
  }
  
  backward() {
    this.left.setRewardValue(Infinity);
    this.right.setRewardValue(Infinity);
  }
  
  currentValue() {
    this._currentValue;
  }
  
  setRewardValue(_rewardValue) {
    this._rewardValue = _rewardValue;
  }
  
  rewardValue() {
    this._rewardValue;
  }
  
  die() {
    return;
  }
}