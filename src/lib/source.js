import Node from './node';
import SourceBit from './source_bit';

export default class Source extends Node {
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
  
  bits() {
    let result = [];
    for (let i=0; i < this._size; i++) {
      result.push(new SourceBit(this, i));
    }
    return result;
  }
}