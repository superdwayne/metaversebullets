const express = require("express");
const axios = require('axios');
const router = express.Router();
const cheerio = require('cheerio');
const mongoose = require("mongoose");
// const articlesSchema = require("./schema");

const xrtoday = 'https://www.xrtoday.com/tag/metaverse/'

router.get('/', function (req, res) {

    axios(xrtoday).then(function(response)
    {
        const html = response.data
        const $ = cheerio.load(html)
        // console.log(html)
        const xrarticles = []
       
        $('.col-md-4', html).each((i , elm) => {
            const title = $(elm).find('.font-weight-500').text()
            // const artURL = $(elm).find('.single_uctv-inner').attr('href')
            xrarticles.push({
            title: title,
            // url: artURL
            })
        })
    //   console.log(xrarticles)
       res.send(xrarticles)
   
            
    }).catch(err => console.log(err))
    
})

module.exports = router;