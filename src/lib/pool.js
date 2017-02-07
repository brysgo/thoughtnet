require('babel-polyfill');

export default class Pool {
  constructor(organismClass, ...spawnArgs) {
    Object.assign(this, {
      organismClass,
      spawnArgs,
      organisms: []
    })
  }
  
  unshift(...items) {
    this.organisms.unshift(...items);
  }
  
  spawn(numOrganisms=1) {
    let result = [];
    const { organismClass } = this;
    for (let i = 0; i < numOrganisms; ++i) {
      result.push(new organismClass(this, ...this.spawnArgs))
    }
    this.organisms = this.organisms.concat(result);
    return result;
  }
  
  prune(minReward) {
    this.organisms = this.organisms.filter((organism) => {
      if (organism.rewardValue() < minReward) {
        organism.die();
        return false;
      } else {
        return true;
      }
    });
  }
  
  get length() {
    return this.organisms.length
  }
  
  [Symbol.iterator]() { return this.organisms.values() }
}