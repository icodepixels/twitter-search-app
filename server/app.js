var express = require('express');
var OAuth2 = require('OAuth').OAuth2;
var fetch = require('node-fetch');
var cors = require('cors')
var Bluebird = require('bluebird');
var dotenv = require('dotenv').config();

fetch.Promise = Bluebird;

var app = express();
app.use(cors());

app.get('/search/:hashtag/:count/:type', function (req, res) {
    var hashtag = '#' + req.params.hashtag;
    var count = req.params.count;
    var type = "popular";

    var oauth2 = new OAuth2('https://api.twitter.com/', null, 'oauth2/token', null);
    oauth2.getOAuthAccessToken('', {
        'grant_type': 'client_credentials'
    }, function () {
        var options = {
            headers: {
                Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`
            }
        };
        fetch(`https://api.twitter.com/1.1/search/tweets.json?q=${encodeURIComponent(hashtag)}&count=${count}&result_type=${type}`, options)
            .then(res => res.json())
            .then(json => {
                console.log('Success - requested completed in ' + json.search_metadata.completed_in + 's');
                res.send({
                    json
                })
            });
    });
})


app.get('*', function (req, res) {
    res.send({ text: "Twitter Search & Filter Tool" });
});

app.listen(8080, function () {
    console.log('App running on port 8080');
});