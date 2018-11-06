
//setting up express and ejs here
var express = require('express')
var app = express()
var ejs = require('ejs')

///setting up bodyParser
var request = require('request')
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs')

///hide apiKey later
const apiKey = 'wNNhHJV0lMfl1r1nyXaQr4iB6TeqqwO5';
console.log(apiKey)

app.get('/', function (req, res) {
  res.render('index', {gifUrl: null, error: null});
})



app.post('/', function (req, res) {
  let search = req.body.search;
  ///user's apiKey goes here
  let url = `http://api.giphy.com/v1/gifs/search?q=${search}&api_key=${apiKey}`

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {gifUrl: null, error: 'Oops, something went wrong. Try again!'});
    } else {
      let giphy = JSON.parse(body)

      ///to vary the search
      var randomNum = Math.floor((Math.random() * 30) + 0)

      if(giphy.data[randomNum] == undefined){
        res.render('index', {gifUrl: null, error: 'Oops, something went wrong. Try again!'});
      } else {
        let giphyUrl = giphy.data[randomNum].images.original.url;
        res.render('index', {gifUrl: giphyUrl, error: null});
        console.log("got a gif");
      }
    }
  });
})

app.listen(3000, function(){
  console.log('Example app listening on port 3000!')
})