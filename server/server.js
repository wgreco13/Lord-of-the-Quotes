const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;
const cookieParser = require('cookie-parser');

const apiController = require('./controllers/apiController').apiController;
const databaseController = require('./controllers/databaseController');
const cookieController = require('./controllers/cookieController')

/**
 * Handle body/cookie parsing requests.
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.resolve(__dirname, '../build')));

app.post('/submit', 
    cookieController.getUser, 
    databaseController.logSubmission, 
    (req, res) => {
        return res.status(201).json(res.locals.data);
});

app.get('/history', 
    cookieController.getUser, 
    databaseController.getHistory, 
    databaseController.parseHistory, 
    (req, res) => {
        return res.status(200).json(res.locals.historyObj);
});

app.delete('/history', 
    databaseController.deleteHistory, 
    cookieController.getUser, 
    (req, res) => {
        return res.status(200).json(res.locals.deleted);
});

app.get('/newquote', 
    apiController.retrieveRandomQuotes, 
    (req, res) => {
        return res.status(200).json(res.locals.quote);
});

app.get('/', 
    apiController.retrieveRandomQuotes, 
    (req, res) => {
        return res.status(200).json(res.locals.quote);
});

app.use('*', 
    (req, res) => {
        return res.status(404).send();
})


app.use((err, req, res, next) => {
    const defaultErr = {
        log: 'Express error handler caught unknown middleware error.',
        status: 400,
        message: { err: 'An error has occurred' }
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(400).json(errorObj.message);
});

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;