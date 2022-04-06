const express = require('express');
const app = express();
const PORT = 3000;

const apiController = require('./controllers/apiController')

app.get('/', apiController.getCharacterID, (req, res) => {
    return res.status(200).send();
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
})

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;