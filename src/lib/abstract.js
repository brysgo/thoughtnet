export default class Abstract {
  constructor() {
    let parentProto = Object.getPrototypeOf(this.constructor);
    if (this.constructor === Abstract || parentProto === Abstract) {
      throw new TypeError("Cannot construct Abstract instances directly");
    } else {
      const thisPropNames = Object.getOwnPropertyNames(this.constructor.prototype);
      Object.getOwnPropertyNames( parentProto.prototype ).forEach((methodName) => {
        if (thisPropNames.indexOf(methodName) === -1) {
          let methodDescription;
          if (methodName === 'constructor') {
            methodDescription = 'use it to build new instances';
          } else {
            methodDescription = parentProto.prototype[methodName]()
          }
          throw new TypeError(`Method missing ${methodName}: ${methodDescription}`)
        }
      });
    }
  }
}