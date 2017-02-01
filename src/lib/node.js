import Abstract from './abstract';

export default class Node extends Abstract {
  constructor() {
    super();
  }
  
  forward() {
    return 'use it to update the currentValue with the dependancies and operation';
  }
  
  backward(reward) {
    return 'use it to send back the reward from the current run';
  }
  
  currentValue() {
    return 'use it to retrieve the current value of the node';
  }
}