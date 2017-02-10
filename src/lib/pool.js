require('babel-polyfill');
import winston from 'winston';

export default class Pool {
  constructor(organismClass, ...spawnArgs) {
    Object.assign(this, {
      organismClass,
      _spawnArgs: spawnArgs,
      organisms: []
    })
    this.spawn = this.spawn.bind(this);
  }
  
  unshift(...items) {
    this.organisms.unshift(...items);
  }
  
  spawn(numOrganisms=1) {
    let result = [];
    const { organismClass } = this;
    for (let i = 0; i < numOrganisms; ++i) {
      result.push(new organismClass(this, ...this._spawnArgs))
    }
    this.organisms = this.organisms.concat(result);
    return result;
  }
  
  prune(minReward) {
    let before = this.organisms.length;
    this.organisms = this.organisms.filter((organism) => {
      winston.debug(`organism reward is ${organism.rewardValue()}`)
      if (organism.rewardValue() < minReward) {
        organism.die();
        return false;
      } else {
        return true;
      }
    });
    winston.debug(`${this.organisms.length} organisms left of ${before} from ${this.organismClass.name}`);
    return before - this.organisms.length;
  }
  
  get length() {
    return this.organisms.length
  }
  
  get spawnArgs() {
    this._spawnArgs;
  }
  
  [Symbol.iterator]() { return this.organisms.values() }
}