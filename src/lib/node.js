function operation(index, a, b) {
  const operations = [
    (a, b) => a & b,
    (a, b) => a | b,
    (a, b) => a ^ b,
    (a) => ~a,
  ]
  const bits = (truthy) => truthy ? 0b1 : 0b0;
  return operations[index](bits(a), bits(b)) & 0b1;
}

export default class Node {
  constructor(left, right, op) {
    if (!op) op = Math.floor(Math.random() * 4);
    left && left.listeners.push(this);
    right && right.listeners.push(this);
    Object.assign(this, {left, right, op, listeners: []});
  }
  
  // manually trigger node
  on() {
    this.value = true;
  }
  
  // manually suppress node
  off() {
    this.value = false;
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
      this.value = operation(this.op, left, right)
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