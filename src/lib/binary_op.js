import Abstract from './abstract';
import Node from './node';
import Organism from './organism';
import operations from './utils/operations';

export default class BinaryOp extends Abstract {
  constructor(pool, operation) {
    const ops = Object.keys(operations);
    if (!operation) operation = ops[Math.floor(Math.random()*ops.length)];
    super(Node, Organism);
    Object.assign(this, {
      _currentValue: 0,
      operation,
      left: Array.from(pool)[Math.floor(Math.random() * pool.length)],
      right: Array.from(pool)[Math.floor(Math.random() * pool.length)]
    });
    this.currentValue = this.currentValue.bind(this);
  }
  
  forward() {
    this._currentValue = operations[this.operation](this.left.currentValue(), this.right.currentValue())
  }
  
  backward() {
    this.left.setRewardValue(Infinity);
    this.right.setRewardValue(Infinity);
  }
  
  currentValue() {
    return this._currentValue;
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