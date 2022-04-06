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
const characters = ['Aragorn II Elessar', 'Arwen', 'Bilbo Baggins', 'Elrond', 'Éomer', 'Faramir', 'Frodo Baggins', 'Galadriel', 
  'Gandalf','Gimli', 'Gríma Wormtongue', 'Legolas', 'Meriadoc Brandybuck', 'Peregrin Took', 'Samwise Gamgee',
  'Saruman', 'Théoden', 'Treebeard', 'Witch-king of Angmar'];
// Add GOLLUM
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
  const headers = {
      Authorization: `Bearer ${API_KEY}`
  }
  const randomCharIndex = Math.floor(Math.random() * characters.length);
  const randomCharacter = characters[randomCharIndex];
  // Import database and grab character id
  
  const response = await fetch('https://the-one-api.dev/v2/character/', {
      headers: headers,
      method: 'GET'
  });
  const character = await response.json();
  
  // Get random character quote from array.

  return next();
}

module.exports = apiController;