// const path = require('path')
// const process = require('process')
// const dotenv = require('dotenv').config( {
//     path: path.join(__dirname, '../.env')
// });
const fetch = import('node-fetch');

API_KEY = 'tBIQgohTFehcxJcSNclb';
// console.log(process.env);

retrieveQuote = async (characterId) => {
    const headers = {
        Authorization: `Bearer ${API_KEY}`
    }
    const response = await fetch('https://the-one-api.dev/v2/quote', {
        headers: headers,
        method: 'GET'
    });
    const quotes = await response.json();
    console.log(quotes);
}

retrieveCharacter = async () => {
    const headers = {
        Authorization: `Bearer ${API_KEY}`
    }
    const response = await fetch('https://the-one-api.dev/v2/character', {
        headers: headers,
        method: 'GET'
    });
    const character = await response.json();
    console.log(character);
}

// Takes as optional input character id
retrieveCharacter();
// Add inputs
