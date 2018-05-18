require('dotenv').config();
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var keys = require('./keys');
var request = require('request');
var arg1 = process.argv[2];
var arg2 = process.argv[3];
var request = require('request');

request('http://www.omdbapi.com/?t=' + arg2 + '&apikey=trilogy', function (error, response, body) {
   if (error) {
       console.log('error:', error);
   }
   else if (arg1 === 'movie-this') {
       console.log('\nTitle: ' + JSON.parse(body).Title + '\n');
       console.log('Release date: ' + JSON.parse(body).Released + '\n');
       console.log('imdb Rating: ' + JSON.parse(body).imdbRating + '\n');
       console.log('Rotten Tomatoes Rating: ' + JSON.parse(body).Ratings[1].Value + '\n'); // Print the HTML for the Google homepage.
       console.log('Country: ' + JSON.parse(body).Country + '\n');
       console.log('Language: ' + JSON.parse(body).Language + '\n');
       console.log('Plot: ' + JSON.parse(body).Plot + '\n');
       console.log('Actors: ' + JSON.parse(body).Actors + '\n');
   }
});

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var count = 1;

var params = { screen_name: process.argv[3], count: 20 };

client.get('statuses/user_timeline', params, function (error, tweets, response) {
   
   if ((!error) && (arg1 === 'my-tweets')) {
       for (var i = 0; i < tweets.length; i++) {
           var myTweets = ('\n' + count++ + '.) ' + tweets[i].text + '\n');
           console.log(myTweets);
       }
   }

});

spotify.search({ type: 'track', query: arg2, limit: 1}, function (err, data) {
   if (err) {
       return console.log('Error occurred: ' + err);
   }
   else if(arg1 === 'spotify-this-song') {
       for(var i = 0; i < data.tracks.items.length; i++) {
           console.log(data.tracks.items[i].artists[i].name);
       }
   } 
});