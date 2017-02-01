import Pool from './pool';
import Organism from './organism';

let constructorArgCheck;
class ExampleOrganism extends Organism {
  constructor(arg) {
    super()
    constructorArgCheck(arg);
  }
  
  rewardValue() {
    
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