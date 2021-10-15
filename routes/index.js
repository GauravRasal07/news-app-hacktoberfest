const express    = require("express"),
      News       = require('../models/news'),
      User       = require('../models/user'),
	  middleware = require("../middleware"),
      dotenv     = require('dotenv'),
      axios      = require("axios").default,
      router     = express.Router({mergeParams : true});

dotenv.config();

var articles;

function getNewsHeadLines(country, category){
    var options = {
        method: 'GET',
        url: 'https://newsapi.org/v2/top-headlines',
        params: {
            country : country,
            category : category,
            apiKey : process.env.apiKey
            },
        };
        
        axios.request(options).then(function (response) {
            articles = response.data.articles;
        }).catch(function (error) {
            console.error(error);
        });
}

function getEverything(query){
    var options = {
        method: 'GET',
        url: 'https://newsapi.org/v2/everything',
        params: {
            q : query,
            apiKey : process.env.apiKey
            },
        };
        
        axios.request(options).then(function (response) {
            articles = response.data.articles;
        }).catch(function (error) {
            console.error(error);
            req.flash('error', 'Something went wrong, Try again later');
        });
}

getNewsHeadLines("in", "");

router.get('/', (req, res) => {
     res.redirect('/home');
});

router.get('/home', (req, res) => {
    res.render('home', { articles : articles });
});

router.post('/home', (req, res) => {
    if(req.body.q){
        getEverything(req.body.q);
         res.redirect('/home');
    } else {
        getNewsHeadLines(req.body.country, req.body.category);
        res.redirect('/home');
    }
});

//--------------------------Article save and remove from saved--------------------------


module.exports = router;