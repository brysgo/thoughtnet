export default class Abstract {
  constructor(...classes) {
    let parentProto = Object.getPrototypeOf(this.constructor);
    if (this.constructor === Abstract || (parentProto === Abstract && classes.length == 0)) {
      throw new TypeError("Cannot construct Abstract instances directly");
    } else {
      const thisPropNames = Object.getOwnPropertyNames(this.constructor.prototype);
      if (classes.length === 0) classes = [parentProto];
      classes.forEach((abstractClass) => {
        Object.getOwnPropertyNames( abstractClass.prototype ).forEach((methodName) => {
          if (thisPropNames.indexOf(methodName) === -1) {
            let methodDescription;
            if (methodName === 'constructor') {
              methodDescription = 'use it to build new instances';
            } else {
              methodDescription = abstractClass.prototype[methodName]()
            }
            throw new TypeError(`Method missing ${methodName}: ${methodDescription}`)
          }
        });
      });
    }
  }
}