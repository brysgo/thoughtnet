import Node from './node';

it('computes random stuff on a bunch of nodes', () => {
  const input1 = new Node();
  const input2 = new Node();
  
  const nodes = [input1, input2];
  for (let i=0; i < 1000; ++i) {
    const left = nodes[Math.floor(Math.random() * nodes.length)];
    const right = nodes[Math.floor(Math.random() * nodes.length)];
    nodes.push(new Node(left, right));
  }
  
  for (let i=0; i < 100; ++i) {
    input1[(Math.random() > 0.5) ? 'on' : 'off']();
    input2[(Math.random() > 0.5) ? 'on' : 'off']();
    nodes.map((node) => {
      node.run(i);
      expect(node.value.toString()).toMatch(/(0|1)/);
    });
  }
  
})
