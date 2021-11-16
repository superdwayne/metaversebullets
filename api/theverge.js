const express = require("express");
const axios = require('axios');
const router = express.Router();
const cheerio = require('cheerio');
// const mongoose = require("mongoose");
// const articlesSchema = require("./schema");

const theverge = 'https://www.theverge.com/fortnite'

router.get('/', function (req, res) {

    axios(theverge).then(function(response)
    {
        const html = response.data
        const $ = cheerio.load(html)
        // console.log(html)
        const thevergearticles = []
       
        $('.c-compact-river__entry', html).each((i , elm) => {
            const title = $(elm).find('.c-entry-box--compact__title').text()
            const artURL = $(elm).find('.c-entry-box--compact__image-wrapper').attr('href')
            thevergearticles.push({
            title: title,
            url: artURL
            })
        })
      
       res.send(thevergearticles)
    //    console.log(openseaarticles)
            
    }).catch(err => console.log(err))
    
})

module.exports = router;