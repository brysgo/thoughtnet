import Pool from './pool';
import BinaryOp from './binary_op';

export default class Network {
  
  constructor() {
    Object.assign(this, {
      sources: {},
      targets: {},
      nodePool: new Pool(BinaryOp),
      generation: 0,
      running: false
    });
  }

  start() {
    
  }
  
  stop() {
    
  }
  
  runOnce() {
    
  }
  
  forward() {
    
  }
  
  backward() {
    
  }
  
  attachSource() {
    
  }
  
  attachTarget() {
    
  }
}