import Abstract from './abstract';

export default class Organism extends Abstract {
  constructor() {
    super();
  }
  
  setRewardValue(value) {
    return 'use it to set the current reward value';
  }
  
  rewardValue() {
    return 'use it to get the current reward value of the organism';
  }
  
  die() {
    return 'use it to kill off the organism';
  }
}