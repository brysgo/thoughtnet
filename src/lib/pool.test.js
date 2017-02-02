/* global expect */

import Pool from './pool';
import Organism from './organism';

let constructorArgCheck;
let counter = 0;
class ExampleOrganism extends Organism {
  constructor(arg) {
    super()
    constructorArgCheck(arg);
    this.reward = counter;
    counter++;
  }
  
  rewardValue() {
    return this.reward;
  }
  
  die() {
    
  }
}

it('can spawn some organisms', () => {
  const testPool = new Pool(ExampleOrganism, 'example spawn args');
  constructorArgCheck = (arg) => {
    expect(arg).toEqual('example spawn args');
  }
  const result = testPool.spawn(5);
  expect(result.length).toEqual(5);
  expect(result[0].constructor).toEqual(ExampleOrganism);
})

it('can prune organisms below reward threshold', () => {
  constructorArgCheck = () => {};
  counter = 0;
  const testPool = new Pool(ExampleOrganism);
  testPool.spawn(10);
  expect(testPool.length).toEqual(10);
  testPool.prune(5)
  expect(testPool.length).toEqual(5);
})