var router = require("express").Router();
const Article = require("../models/Article");
const axios = require("axios");
const cheerio = require("cheerio");

router.get("/scrape", function(req,res) {
    axios.get("https://slashdot.org/").then(function(page){
    //console.log(page.data);
    var data = []
    var $ = cheerio.load(page.data);
    $(".article").each(function(){
        var title = $(this).find(".story-title").text()
        var link = $(this).find(".story-title").find("a").attr("href")
        console.log(title)
        console.log(link)
        var article = new Article ({
            title:title.replace('\\n', '').replace('\\t',''),
            link:link

        })
       article.save();
        data.push(article);
    })
        res.send(data);
    });    
    
});


router.get("/articles", function(req, res) {
    Article.find({}).then (function (records){
        res.json(records);
    }).catch (function (err){
        res.send(err);
    });
})
module.exports = router