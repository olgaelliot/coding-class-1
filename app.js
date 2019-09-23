var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

//storing port number
var port = 3000;
var app = express();

//setting up the boilerplate and routing
app.get('/wikipedia', function(req, res){

var url = 'https://en.wikipedia.org/wiki/Osama_bin_Laden';

//Making http request

request(url, function(error, response, html) {

  if(!error) {
    //res.send(html);

    var $ = cheerio.load(html);
    var data = {
      articleTitle : '',
      articleImg : '',
      articleParagraph:''
    };

    $('#content').filter(function(){

      data.articleTitle = $(this).find('#firstHeading').text();
      data.articleImg = $(this).find('img').first().attr('src');
      data.articleParagraph = $(this).find('p:nth-of-type(2)').text();
    });

res.send(data);

fs.writeFile('wiki-outpout.js', JSON.stringify(data, null, 4), function(error){
console.log('file written on hard drive');
});

}
});
});


//dataArray = ["hello", 2, 3, 4, 5, 6, 7];

app.get('/imdb', function(req, res){

var url = 'https://www.imdb.com/chart/top';

//Making http request

request(url, function(error, response, html) {

  if(!error) {
    //res.send(html);

    var $ = cheerio.load(html);
    var data = [];

    $('.lister-list').filter(function(){
      $(this).find('tr').each(function(i, elem){
data[i] = " ' " + $(this) .find('.posterColumn') .find('img').attr('src') + " ' ";

      });
    });

res.send(data);

fs.writeFile('imdb-outpout.js', 'var imdb_list = [' + data +']', function(error){
console.log('file written on hard drive');
});

}
});
});


//all the web scraping will happen here
//res.send('hello bye');

app.listen(port);
console.log('magic happens on port' + port);

exports = module.exports = app;
