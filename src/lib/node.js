import operations from './operations';
import { boolToBit } from './utils';

export default class Node {
  constructor(left, right, op) {
    if (!op) op = Math.floor(Math.random() * 4);
    left && left.listeners.push(this);
    right && right.listeners.push(this);
    Object.assign(this, {left, right, op, listeners: []});
  }
  
  // manually trigger node
  on() {
    this.value = 0b1;
  }
  
  // manually suppress node
  off() {
    this.value = 0b0;
  }
  
  // tell this node it did good
  reward() {
    this.score++;
    this.left.reward();
    this.right.reward();
  }
  
  receive({value, sender, timestep}) {
    if (this.value !== undefined && timestep === this.unchanged) return;
    let left, right;
    if (sender === this.left) {
      left = value;
      right = this.tmp;
    } else if (sender === this.right) {
      right = value;
      left = this.tmp;
    } else {
      console.error(`Connection to node not recognized!
        
        Make sure you are only sending values from connected nodes.
      `);
    }
    if (this.tmp !== undefined) {
      this.value = operations[this.op](boolToBit(left), boolToBit(right)) & 0b1;
      this.unchanged = timestep;
      this.tmp = undefined;
    } else {
      this.tmp = value;
      this.value = undefined;
    }
  }
  
  run(timestep) {
    let value = this.value;
    this.listeners.forEach((n) => n.receive({value, sender: this, timestep}))
  }
}