export default class Pool {
  constructor(organismClass, spawnArgs) {
    Object.assign(this, {
      organismClass,
      spawnArgs
    })
  }
  
  spawn(numOrganisms=1) {
    let result = [];
    const { organismClass } = this;
    console.log(organismClass);
    for (let i = 0; i < numOrganisms; ++i) {
      result.push(new organismClass(this.spawnArgs))
    }
    
    return result;
  }
}