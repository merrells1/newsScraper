var router = require("express").Router();
const Article = require("../models/Article");
const axios = require("axios");
const cheerio = require("cheerio");

router.get("/", function(req,res) {
    console.log('home');
   Article.find({}).then(function (articles){
       console.log(articles);
       res.render('home', {articles:articles})
   })
    
});

module.exports = router