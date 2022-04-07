import React, { useState, useEffect } from 'react';
import CharacterButton from '../components/CharacterButton.jsx';

const characters = ['Aragorn II Elessar', 'Arwen', 'Bilbo Baggins', 'Boromir', 'Elrond', 'Éomer', 'Faramir', 'Frodo Baggins', 'Galadriel', 
  'Gandalf','Gimli', 'Gollum', 'Gríma Wormtongue', 'Legolas', 'Meriadoc Brandybuck', 'Peregrin Took', 'Samwise Gamgee',
  'Saruman', 'Théoden', 'Treebeard', 'Witch-king of Angmar'];
const characterImg = ['aragorn.png', 'arwen.png', 'bilbo.png', 'boromir.png', 'elrond.png', 'eomer.png', 'faramir.png', 'frodo.png', 'galadriel.png',
    'gandalf.png', 'gimli.png', 'gollum.png', 'grima.png', 'legolas.png', 'merry.png', 'pippin.png', 'samwise.png',
    'saruman.png', 'theoden.png', 'treebeard.png', 'witch-king.png']

const MainContainer = props => {
    const [quoteData, setQuote] = useState(false);
    const [historyData, setHistory] = useState(false);
    const [lastGuess, setLastGuess] = useState(false);

    const getQuote = () => {
        fetch('/newquote')
            .then(data => data.json())
            .then(quoteObj => {
                setQuote(quoteObj);
            })
            .catch(err => {
                console.log(`Error fetching a new quote! Error: ${err}`);
            });
    }

    const getHistory = () => {
        fetch('/history')
            .then(data => data.json())
            .then(historyObj => {
                setHistory(historyObj);
            })
            .catch(err => {
                console.log(`Error fetching a user history! Error: ${err}`);
            });
    }
    
    const deleteHistory = () => {
        fetch('/history', {
            method: 'DELETE'
            })
            .then(data => data.json())
            .then(() => {
                getHistory()
            })
            .catch(err => {
                console.log(`Error fetching deleting user history! Error: ${err}`);
            });
    }

    const characterButtons = characters.map((char, index) => {
        return <CharacterButton key={char} index={index} name={ char } quoteData={quoteData} setQuote={setQuote} historyData={historyData} setHistory={setHistory} lastGuess={lastGuess} setLastGuess={setLastGuess} />
    });

    useEffect(() => {
        getQuote();
        getHistory()
    }, []);

    if (quoteData) {
        return (
            <main>
                <section className="main-text">
                    <p>"{ quoteData.quote }"</p>
                </section>
                <section className="character-button-container">
                    { characterButtons }
                </section>
                <section className="bottom-selectors">
                    <button className="secondary-button" onClick={deleteHistory}>
                        Delete History
                    </button>
                    <span>Cast it into the fire! Destroy it!</span>
                </section>
            </main>
        );
    }
    else {
        return (
            <main>
                <section className="main-text">
                    <span className="guess-result">{ lastGuess }</span>
                    <button className="primary-button" onClick={getQuote}>
                        Get Another Quote
                    </button>
                </section>
                <section className="character-button-container">
                    { characterButtons }
                </section>
                <section className="bottom-selectors">
                    <button className="secondary-button" onClick={deleteHistory}>
                        Delete History
                    </button>
                </section>
            </main>
        )
    }
};

export default MainContainer;