const express = require('express');
const request = require('request');
const hbs = require('hbs');


var app = express();
hbs.registerPartials(__dirname +'/views/partials');
app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})
hbs.registerHelper('message', (text) => {
    return text.toUpperCase();
})
app.get('/', (request, response) => {
    response.sendFile(__dirname + '/public/main.hbs');
});

var getCapital = (country) => {
    return new Promise((resolve, reject) => {
        request({
            url: `https://restcountries.eu/rest/v2/name/${encodeURIComponent(country)}?fullText=true`,
            json: true
        }, (error, response, body) => {
            if (error) {
                reject('Cannot connect to Rest Countries');
            } else if (body.status == 404) {
                reject('Cannot find requested country');
            } else if ((body[0].name).toUpperCase() == (country).toUpperCase()) {
                resolve(body[0].capital);
            }
        });
    });
};



var getTemp = (capital) => {
    return new Promise((resolve, reject) => {
        request({
            url: `http://api.openweathermap.org/data/2.5/weather?q=${capital}&units=imperial&appid=41801cbcfc459a16d83d3e646db2ed3b`,
            json: true
        }, (error, response, body) => {
            resolve(body.main.temp);
        });
    })
};

var getWind = (capital) => {
    return new Promise((resolve, reject) => {
        request({
            url: `http://api.openweathermap.org/data/2.5/weather?q=${capital}&units=imperial&appid=41801cbcfc459a16d83d3e646db2ed3b`,
            json: true
        }, (error, response, body) => {
            resolve(body.wind.speed);
        });
    })
};

country = "canada";

getCapital(country).then((result) => {
    capital = result
    return getTemp(result);
}).then((result) => {
    temp = result
    return getWind(capital);
}).then((result) => {
    wind = result
    weather = (`The weather in ${capital}, capital of ${country} is ${temp} degrees Fahrenheit with wind speed of ${wind}`);
}).catch((error) => {
    console.log('Error:', error);
    weather = "Error: Cannot find requested country";
});


app.get('/weather', (request, response) => {
    response.render(weather);
});


app.listen(8080, () => {
    console.log('Server is up on port 8080');
});