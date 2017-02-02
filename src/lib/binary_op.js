import Abstract from './abstract';
import Node from './node';
import Organism from './organism';

export default class BinaryOp extends Abstract {
  constructor() {
    super(Node, Organism);
  }
}