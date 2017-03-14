import React, { Component } from 'react';
import NodeGraphVis from './NodeGraphVis';
import { network } from './data/benchmark';

class App extends Component {
  
  constructor() {
    super();
    this.state = {
      showVisualization: true
    }
  }
  
  render() {
    const { showVisualization } = this.state;
    return (showVisualization) ? <NodeGraphVis network={network}/> : <div>hidden</div>;
  }
}

export default App;
