"use strict";
const parse = require('csv-parse');
const tn = require('../lib').default;
export const network = new tn.Network();

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const numTrainingSamples = 75;
const trainingIterations = 10;
function expandData(data) {
  const trainingSamples = data.slice(0, numTrainingSamples);
  const testSamples = data.slice(numTrainingSamples);
  let duplicatedTrainingSamples = [];
  for (let i=0; i<trainingIterations; i++) {
    duplicatedTrainingSamples = duplicatedTrainingSamples.concat(trainingSamples);
  }
  duplicatedTrainingSamples = shuffle(duplicatedTrainingSamples);
  return duplicatedTrainingSamples.concat(testSamples);
}

var input = require('./iris.data');
parse(input, {comment: '#'}, function(err, unshuffled){
  var output = expandData(unshuffled);
  network.attachSource(new tn.Source(function*() {
    for (let i=0; i<output.length; i++) {
      let y = output[i].slice(0, -1).map((x) => {
        let [left, right] = x.split('.').map((s) => parseInt(s));
        var n= (left >>> 0).toString(2);
        n="0000".substr(n.length)+n;
        var k= (right >>> 0).toString(2);
        k="0000".substr(k.length)+k;
        return n+k;
      }).join('');
      // console.log('training data ', i,': ', y);
      yield y;
    }
  }, 32));
  
  network.attachTarget(new tn.Target(function*() {
    for (let i=0; i<output.length; i++) {
      if ((output[i].length) > 1) {
        // console.log('target: ', output[i][output[i].length-1]);
        switch(output[i][output[i].length-1]) {
          case 'Iris-setosa':
            yield "00";
            break;
          case 'Iris-versicolor':
            yield "01";
            break;
          case 'Iris-virginica':
            yield "10";
            break;
          default:
            throw 'Not a valid target value for iris data';
        }
      }
    }
  }, 2));
  
  let i = 0;
  let correct = 0;
  setInterval(() => {
    if (i<(trainingIterations*numTrainingSamples)) {
      network.runOnce();
    } else if (i<(output.length)) {
      let n = network.forward()[0].join('');
      let target = {
        "Iris-setosa": "00",
        "Iris-versicolor": "01",
        "Iris-virginica": "10"
      }[output[i][output[i].length-1]];
      // console.log('result: ', n, target);
      if (n == target) correct++;
    } else if (i === output.length) {
      console.log(`${correct} correct out of ${output.length-(numTrainingSamples*trainingIterations)} test samples an ${numTrainingSamples} training samples.`);
    }
    
    i++;
  }, 100);
  
  
});
