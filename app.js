var express = require('express');
var request = require('request');
var fs = require('fs');

//storing port number
var port = 3000;
var app = express();

//setting up the boilerplate and routing
app.get('/', function(req, res){

var url = 'https://en.wikipedia.org/wiki/Osama_bin_Laden';

//Making http request

request(url), function(error, response, html) {
  if(!error) {
    res.send(html);
  }
});


//all the web scraping will happen here
//res.send('hello bye');
});

app.listen(port);
console.log('magic happens on port' + port);

exports = module.exports = app;
