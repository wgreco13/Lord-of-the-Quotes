import React from 'react';

const CharacterButton = props => {

    const submitGuess = () => {
        const { name, id } = props;
        const correctGuess = (name === props.quoteData.name);
        console.log('Actual Name', props.quoteData.name, 'Name', name, 'Correct', correctGuess)
    }

    return (
        <a className="character-button" onClick={submitGuess}>
            <span>{ props.name }</span>
        </a>
    );
}


export default CharacterButton;