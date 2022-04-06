const path = require('path');
const fetch = require('node-fetch');
const db = require('../models/lotrModels');

require('dotenv').config({
  path: path.join(__dirname, '../../.env')
});

const API_KEY = process.env.API_KEY;

const apiController = {};

/*
  * This function is used to retrieve the character IDs once only.
  * It takes as input an array of characters and returns an array of characterIDs.
  * Storing characterIDArray so the database does not need to be queried every time
*/
const characters = ['Aragorn II Elessar', 'Arwen', 'Bilbo Baggins', 'Boromir', 'Elrond', 'Éomer', 'Faramir', 'Frodo Baggins', 'Galadriel', 
  'Gandalf','Gimli', 'Gollum', 'Gríma Wormtongue', 'Legolas', 'Meriadoc Brandybuck', 'Peregrin Took', 'Samwise Gamgee',
  'Saruman', 'Théoden', 'Treebeard', 'Witch-king of Angmar'];

const getCharacterID = async (characterArray) => {
  
  const headers = {
      Authorization: `Bearer ${API_KEY}`
  }

  const characterIDs = [];
  for (let i = 0; i < characterArray.length; i++) {
    const response = await fetch(`https://the-one-api.dev/v2/character?name=/${characterArray[i]}/i`, {
      headers: headers,
      method: 'GET'
    });
    const character = await response.json();
    characterIDs.push([character.docs[0].name, character.docs[0]._id]);
    // characterIDs.push(character.docs[0]._id);
  }
  console.log(characterIDs);
  return characterIDs;
}

// Uncomment to get character IDs and names from API.
// getCharacterID(characters);

apiController.retrieveRandomQuotes = async (req, res, next) => {
  try {
    const headers = {
        Authorization: `Bearer ${API_KEY}`
    }
    const randomCharIndex = Math.floor(Math.random() * characters.length);
    const randomCharacterName = characters[randomCharIndex];
    const queryString = 'SELECT _id FROM characters WHERE name = $1'
    let randomCharacterID = await db.query(queryString, [randomCharacterName]);
    randomCharacterID = randomCharacterID.rows[0]._id;
      
    const response = await fetch(`https://the-one-api.dev/v2/character/${randomCharacterID}/quote`, {
        headers: headers,
        method: 'GET'
    });
    const quotesData = await response.json();
    const quote = quotesData.docs[Math.floor(Math.random() * quotesData.docs.length)].dialog;
    res.locals.quote = {
      name: randomCharacterName,
      id: randomCharacterID,
      quote: quote
    }

    return next();
  }
  catch (err) {
    const error = {
      log: 'Express error handler caught an error in the retrieveRandomQuotes middleware.',
      status: 400,
      message: { err }
    };
    return next(error);
  }
}

module.exports = {
  apiController: apiController,
  characters: characters
};