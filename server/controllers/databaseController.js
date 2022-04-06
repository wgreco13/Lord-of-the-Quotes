const path = require('path');
const fetch = require('node-fetch');
const db = require('../models/lotrModels');
const { database } = require('pg/lib/defaults');
const characters = require('./apiController').characters;

require('dotenv').config({
  path: path.join(__dirname, '../../.env')
});

const databaseController = {};

databaseController.logSubmission = async (req, res, next) => {
  try {
    const user_id = req.cookies.user_id;
    const { correctCharacterId, correctGuess } = req.body;
    const query = `INSERT INTO user_history
                    (user_id, character_id, correct_guess)
                    VALUES ($1, $2, $3)
                    RETURNING *;`;
    const data = await db.query(query, [user_id, correctCharacterId, correctGuess]);
    res.locals.data = data.rows;
    return next();
  }
  catch (err) {
    const error = {
      log: 'Express error handler caught an error in the logSubmission middleware.',
      status: 400,
      message: { err }
    };
    return next(error);
  }
}

databaseController.getHistory = async (req, res, next) => {
  try {
    const user_id = req.cookies.user_id;
    const query = `SELECT c.name, u.character_id, u.correct_guess
                    FROM user_history u
                    INNER JOIN characters c ON u.character_id = c._id
                    WHERE u.user_id = $1;`;
    const data = await db.query(query, [user_id]);
    res.locals.history = data.rows;
    return next();
  }
  catch (err) {
    const error = {
      log: 'Express error handler caught an error in the getHistory middleware.',
      status: 400,
      message: { err }
    };
    return next(error);
  }
}

databaseController.parseHistory = async (req, res, next) => {
    
  //TODO: Dynamically generate object. Add ID field.
  const characterHistory = {
    'Aragorn II Elessar' : {score: {correct: 0, incorrect: 0}},
    'Arwen' : {score: {correct: 0, incorrect: 0}},
    'Bilbo Baggins' : {score: {correct: 0, incorrect: 0}},
    'Boromir' : {score: {correct: 0, incorrect: 0}},
    'Elrond' : {score: {correct: 0, incorrect: 0}},
    'Éomer' : {score: {correct: 0, incorrect: 0}},
    'Faramir' : {score: {correct: 0, incorrect: 0}},
    'Frodo Baggins' : {score: {correct: 0, incorrect: 0}},
    'Galadriel' : {score: {correct: 0, incorrect: 0}},
    'Gandalf' : {score: {correct: 0, incorrect: 0}},
    'Gimli' : {score: {correct: 0, incorrect: 0}},
    'Gollum' : {score: {correct: 0, incorrect: 0}},
    'Gríma Wormtongue' : {score: {correct: 0, incorrect: 0}},
    'Legolas' : {score: {correct: 0, incorrect: 0}},
    'Meriadoc Brandybuck' : {score: {correct: 0, incorrect: 0}}, 
    'Peregrin Took' : {score: {correct: 0, incorrect: 0}},
    'Samwise Gamgee' : {score: {correct: 0, incorrect: 0}},
    'Saruman' : {score: {correct: 0, incorrect: 0}},
    'Théoden' : {score: {correct: 0, incorrect: 0}},
    'Treebeard' : {score: {correct: 0, incorrect: 0}},
    'Witch-king of Angmar' : {score: {correct: 0, incorrect: 0}}
  }

  const historyObj = res.locals.history.reduce((hist, curr) => {
    (curr.correct_guess === true) ? hist[curr.name].score.correct++ : hist[curr.name].score.incorrect++
    return hist;
  }, characterHistory)
  res.locals.historyObj = historyObj;
  return next();
}


databaseController.deleteHistory = async (req, res, next) => {
  try {
    const user_id = req.cookies.user_id;
    const query = `DELETE FROM user_history
                    WHERE user_id = $1;`;
    const data = await db.query(query, [user_id]);
    res.locals.deleted = data.rows;
    res.clearCookie('user_id');
    return next();
  }
  catch (err) {
    const error = {
      log: 'Express error handler caught an error in the deleteHistory middleware.',
      status: 400,
      message: { err }
    };
    return next(error);
  }
}


module.exports = databaseController;