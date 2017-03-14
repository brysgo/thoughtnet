import React, { Component } from 'react';
import SourceBit from './lib/source_bit'

import { Layer, Circle, Line, Stage, Group, Text } from 'react-konva';

class NodeGraphVis extends Component {
  constructor({network}) {
    super();
    this.state = {timestep: 0};
    this.network = network;
  }
  
  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({});
    }, 1000);
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
      //if (reward < 1) return;
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
    const nodeIds = graph.nodes.map((n) => n.id);
    const windowHeight = window.innerHeight;
    const nodeSize = Math.sqrt((window.innerWidth*windowHeight)/(graph.nodes.length+1));
    const columns = Math.floor(window.innerWidth/nodeSize);
    const calcX = (i) => (i%columns)*nodeSize+(nodeSize/2);
    const calcY = (i) => Math.floor(i/columns)*nodeSize+(nodeSize/2);
    return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          { graph.edges.map((edge, i) => {
            const fromIndex = nodeIds.indexOf(edge.from);
            const fromX = calcX(fromIndex);
            const fromY = calcY(fromIndex);
            const toIndex = nodeIds.indexOf(edge.to);
            const toX = calcX(toIndex);
            const toY = calcY(toIndex);
            return <Line key={i}
                points={[fromX, fromY, toX, toY]}
                stroke={'purple'}
                strokeWidth={1}
            />;
          }) }
        </Layer>
        <Layer>
          { graph.nodes.map((node, i) => (
            <Group key={i}>
              <Circle
                  x={calcX(i)} y={calcY(i)} width={nodeSize} height={nodeSize}
                  fill={node.color}
                  opacity={0.9}
              />
              <Text x={calcX(i)-3} y={calcY(i)-5} fill={'red'} text={node.label}/>
            </Group>
          )) }
        </Layer>
      </Stage>
    );
  }
}

export default NodeGraphVis;