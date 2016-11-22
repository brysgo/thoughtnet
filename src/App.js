import React, { Component } from 'react';
import Node from './lib/node';

// construct binary NN
const input1 = new Node();
const input2 = new Node();
const nodes = [input1, input2];
for (let i=0; i < 1000; ++i) {
  const left = nodes[Math.floor(Math.random() * nodes.length)];
  const right = nodes[Math.floor(Math.random() * nodes.length)];
  nodes.push(new Node(left, right));
}

class App extends Component {
  constructor() {
    super();
    this.state = {timestep: 0};
  }
  
  render() {
    return (
      <div>
      { nodes.map((node) => node.value) }
      <button onClick={() => {
        const { timestep } = this.state;
        input1[(Math.random() > 0.5) ? 'on' : 'off']();
        input2[(Math.random() > 0.5) ? 'on' : 'off']();
        nodes.forEach((node) => node.run(timestep));
        this.setState({timestep: timestep + 1})
      }}>Run</button>
      </div>
    );
  }
}

export default App;
