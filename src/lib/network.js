import Node from './node'

export default class Network {
  constructor() {
    this._nodes = [new Node()];
    this._inputs = [];
  }
  
  attachInput(anInputSource) {
    this._inputs.push(anInputSource);
  }
  
  forward() {
    this._inputs.forEach((inputSource) => {
      inputSource
    });
    this.nodes[0].on()
  }
  
  backward() {
    
  }
  
  spawn() {
    
  }
  
  prune() {
    
  }
  
  get nodes() {
    return this._nodes;
  }
}