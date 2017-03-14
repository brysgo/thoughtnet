import React, { Component } from 'react';
import SourceBit from './lib/source_bit'

import Graph from 'react-graph-vis'

class NodeGraphVis extends Component {
  constructor({network}) {
    super();
    this.state = {timestep: 0};
    this.network = network;
    this.options = {
      "edges": {
        "smooth": {
          "forceDirection": "none"
        }
      },
      "physics": {
        "hierarchicalRepulsion": {
          "centralGravity": 0
        },
        "minVelocity": 0.75,
        "solver": "hierarchicalRepulsion"
      }
    }
  }
  
  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({});
    }, 5000);
  }
  
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  
  render() {
    let graph = {
      nodes: [],
      edges: []
    };
    Array.from(this.network.nodePool).forEach((node) => {
      let reward = node.rewardValue;
      if (reward < 1) return;
      if (reward === Infinity) reward = 1;
      graph.nodes.push({
        id: node.id,
        label: node.operation,
        color: (node.constructor === SourceBit) ? 'yellow' : `rgb(0,${Math.min(reward, 255)},0)`
      });
      if (node.left && node.left.id) {
        graph.edges.push({
          from: node.left.id,
          to: node.id
        });
      }
      if (node.right && node.right.id) {
        graph.edges.push({
          from: node.right.id,
          to: node.id
        });
      }
    })
    return (
      <Graph style={{flex:1,height:'100%'}} graph={graph} options={this.options}/>
    );
  }
}

export default NodeGraphVis;