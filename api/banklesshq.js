const express = require("express");
const axios = require('axios');
const router = express.Router();
const cheerio = require('cheerio');
const mongoose = require("mongoose");
const articlesSchema = require("./schema");

const banklesshq = 'https://metaversal.banklesshq.com/'

router.get('/',  function (req, res) {

     axios(banklesshq).then(function(ressponse)
    {
        const html = ressponse.data
        const $ = cheerio.load(html)
        const articles = []
        $('.post-preview-content', html).each((i , elm) => {
            const title = $(elm).find('.post-preview-title').text()
            const preview = $(elm).find('.post-preview-description').text()
            const artURL = $(elm).find('a').attr('href')
            articles.push({
            title: title,
            preview: preview,
            atricleurl: artURL
            })
        })
       
            // compile schema to model
            const blankessarticles = mongoose.model('Book', articlesSchema, 'Beta99');
    
    
            blankessarticles.find({}, function (err, users) {
                res.send(users);
    
               if (users.length >= 8) {
                   console.log('Too Many entries in the DB')
               } else {
                   // save model to database
                   blankessarticles.collection.insertMany(articles, function (err, docs) {
                       if (err) {
                           return console.error(err);
                       } else {
                           // if number of articlres (insertedCount) is larger than 7 then delete and re-scrape
                           console.log(docs.insertedCount, "Enrties have been added to the database");
    
                       }
                   });
               }
               });
        
                    //This method is to send the data without taking it from database
            // res.send(articles)
    
    
    
    }).catch(err => console.log(err))
    
    
    })

    module.exports = router;