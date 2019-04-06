const express = require('express');

var app = express();

app.get('/', (request, response) => {
    response.send('Hello There!')
});

app.listen(8080);