import Node from './node';

export default class Target extends Node {
  constructor(generator, size) {
    super();
    this.generator = generator();
    this._currentValue = undefined;
    this._size = size;
  }
  
  currentValue() {
    return this._currentValue;
  }
  
  forward() {
    this._currentValue = this.generator.next().value;
  }
  
  backward() {
    return;
  }
  
  get size() {
    return this._size;
  }
}