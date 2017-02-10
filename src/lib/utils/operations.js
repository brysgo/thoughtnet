function onlyFirstBit(x) {
  return x & 0b1;
}

module.exports = {
  '&': (a, b) => onlyFirstBit(a & b),
  '|': (a, b) => onlyFirstBit(a | b),
  '^': (a, b) => onlyFirstBit(a ^ b),
  '~': (a) => onlyFirstBit(~a),
}