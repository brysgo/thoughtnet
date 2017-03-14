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
    return (<div style={{flex: 1, height: '100%'}}>
      { (showVisualization) ? <NodeGraphVis network={network}/> : <div>hidden</div> }
      <button style={{position: 'fixed', top: 0, left: 0}} onClick={() => this.setState({showVisualization: !showVisualization})}>Toggle Visualization</button>
    </div>);
  }
}

export default App;
