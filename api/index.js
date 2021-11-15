const PORT = process.env.PORT || 5000
const axios = require('axios');
const path = require('path');
const cors = require('cors')
const cheerio = require('cheerio');
const express = require('express');
const router = express.Router();
const userModel = require("./models");
const app = express()
const connection = require("./server");
const mongoose = require("mongoose");
const articlesSchema = require("./schema");

app.use(express.json());

app.use(cors())

const banklesshq = 'https://metaversal.banklesshq.com/'
const theverge = 'https://www.theverge.com/fortnite'
const xrtoday = 'https://www.xrtoday.com/tag/metaverse/'


app.get('/api/index', function (req, res) {


axios(banklesshq).then(function(ressponse)
{
    const html = ressponse.data
    const $ = cheerio.load(html)
    const articles = []
    $('.post-preview-content', html).each((i , elm) => {
        const title = $(elm).find('.post-preview-title').text()
        const preview = $(elm).find('.post-preview-description').text()
        // const artURL = $(elm).find('.post-preview-title').attr('href')
        articles.push({
        title: title,
        preview: preview,
        // atricleurl: artURL
        })
    })


        // compile schema to model
        const blankessarticles = mongoose.model('Book', articlesSchema, 'Btest5');

        // save model to database
        blankessarticles.collection.insertMany(articles, function (err, docs) {
            if (err) {
                return console.error(err);
            } else {
                // if number of articlres (insertedCount) is larger than 7 then delete and re-scrape
                console.log(docs.insertedCount, "Enrties have been added to the database");

            }
        });

        blankessarticles.find({}, function (err, users) {
            res.json(users);
        });

                //This method is to send the data without taking it from database
        // res.send(articles)



}).catch(err => console.log(err))


})



app.get('/theverge', function (req, res) {

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


app.get('/xrtoday', function (req, res) {

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



if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, '../build')));
  // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, '../build', 'index.html'));
    });
  }
  


app.listen(PORT, () => console.log(`Sever is running on PORT ${PORT}`))