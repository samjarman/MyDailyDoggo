'use strict';
var request = require('request');

module.exports.dailydoggo = (event, context, callback) => {
  getPhoto(function(url) {
    var status = buildTweetText(url);
    sendTweet(status, function(err, data, res){
      callback(null, res);
    });
  });
};

function getPhoto(callback) {
  var options = {
    url: buildURL(getDate(), process.env.FLICKR_API_KEY)
  }

  request(options, function(url_error, url_response, url_body) {
    if (!url_error && url_response.statusCode == 200) {
      callback(buildPhotoURL(url_body))
    }
  });
}

function getDate() {
  var date = new Date();
  date.setDate(date.getDate() - 1);
  return date.getTime()/1000.0
}

function buildURL(date, api_key) {
  console.log(process.env.FLICKR_API_KEY);
  return `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${api_key}&tags=dog&min_taken_date=${date}&format=json&nojsoncallback=1`
}

function buildPhotoURL(result) {
  console.log('results')
  result = JSON.parse(result)

  var farm = result.photos.photo[0].farm;
  var server = result.photos.photo[0].server;
  var id = result.photos.photo[0].id;
  var secret = result.photos.photo[0].secret;

  return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_c.jpg`
}

function buildTweetText(url) {
  // TODO: Build in credit for author
  // TODO: Use a sample of postings
  return `Would you just LOOK at this doggo! ${url}`;
}

function sendTweet(text, callback) {
  var Twit = require('twit')

  var T = new Twit({
    consumer_key:         process.env.TWITTER_CONSUMER_KEY,
    consumer_secret:      process.env.TWITTER_CONSUMER_SECRET,
    access_token:         process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret:  process.env.TWITTER_ACCESS_SECRET,
    timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  });

  T.post('statuses/update', { status: text }, function(err, data, response) {
    callback(err, data, response)
  });
}
