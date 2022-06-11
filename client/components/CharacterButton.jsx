import React from 'react';
// import * from './assets/';

const characterImg = ['aragorn.png', 'arwen.png', 'bilbo.png', 'boromir.png', 'elrond.png', 'eomer.png', 'faramir.png', 'frodo.png', 'galadriel.png',
  'gandalf.png', 'gimli.png', 'gollum.png', 'grima.png', 'legolas.png', 'merry.png', 'pippin.png', 'samwise.png',
  'saruman.png', 'theoden.png', 'treebeard.png', 'witch-king.png']

const CharacterButton = (props) => {
  const submitGuess = () => {
    const { name } = props;
    const correctGuess = (name === props.quoteData.name);
    if (correctGuess) props.setLastGuess('Correct! That still only counts as one!');
    else props.setLastGuess('Incorrect...You SHALL NOT Pass!');
    console.log('Correct Answer: ', props.quoteData.name, 'Correct Guess?: ', correctGuess);
    const body = {
      correctCharacterId: props.quoteData.id,
      correctGuess: correctGuess
    };
    fetch('/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(response => response)
      .then(() => {
        const newHistoryData = Object.assign({}, props.historyData)
        if (correctGuess) newHistoryData[props.quoteData.name].score.correct += 1;
        else newHistoryData[props.quoteData.name].score.incorrect += 1;
        props.setHistory(newHistoryData);
        // console.log('new', props.historyData)
      })
      .then(() => {
        props.setQuote(false);
      })
      .catch(err => {
        console.log(`Error submitting response! Error: ${err}`);
      });
  };
  const img = require(`../assets/${characterImg[props.index]}`);

  if (props.quoteData) {
    return (
      <button className="character-button" onClick={submitGuess}>
        <span className="character-button-text">{ props.name }</span>
        <img alt="portrait" className="portrait" src={img} />
        <span className="character-button-pct">&nbsp;</span>
      </button>
    );
  }
  if (props.historyData) {
    return (
      <button className="character-button">
        <span className="character-button-text">{ props.name }</span>
        <img alt="portrain no select" className="portrait-no-select" src={img} />
        <span className="character-button-pct">
          { percentCorrect(props) }
          %
        </span>
      </button>
    );
  }
};

function percentCorrect (props) {
  if (!props.historyData[props.name].score.correct
    && !props.historyData[props.name].score.incorrect) return 0.00;
  return (Math.floor(props.historyData[props.name].score.correct / (props.historyData[props.name].score.correct + props.historyData[props.name].score.incorrect) * 100));
}

export default CharacterButton;