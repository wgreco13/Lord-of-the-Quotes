import React, { useState, useEffect } from 'react';
import CharacterButton from '../components/CharacterButton.jsx';

const characters = ['Aragorn II Elessar', 'Arwen', 'Bilbo Baggins', 'Boromir', 'Elrond', 'Éomer', 'Faramir', 'Frodo Baggins', 'Galadriel', 
  'Gandalf','Gimli', 'Gollum', 'Gríma Wormtongue', 'Legolas', 'Meriadoc Brandybuck', 'Peregrin Took', 'Samwise Gamgee',
  'Saruman', 'Théoden', 'Treebeard', 'Witch-king of Angmar'];

const MainContainer = props => {
    const [quoteData, setQuote] = useState({});

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
    
    const characterButtons = characters.map((char) => {
        return <CharacterButton key={char} name={ char } quoteData={quoteData} />
    });

    useEffect(() => {
        getQuote();
    }, []);

    return (
        <main>
            <section>
                { quoteData.quote }
            </section>
            <section className="character-button-container">
                { characterButtons }
            </section>
        </main>
    );
};

export default MainContainer;