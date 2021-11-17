
const db = require("./server");
const cors = require('cors')
const app = require('express')();
const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require("mongoose");
const articlesSchema = require("./schema");
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT 
const blankless = require("./banklesshq");
const theverge = require("./theverge");
const xrtoday = require("./xrtoday");

const banklesshq = 'https://metaversal.banklesshq.com/'


app.get('/api', cors(), (req, res) => {

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
    
  });


app.use("/api/banklesshq", cors() , blankless);
app.use("/api/theverge", cors() , theverge);
app.use("/api/xrtoday", cors() , xrtoday);


app.use(cors())


app.listen(PORT, () => console.log(`Sever is running on PORT ${PORT}`))

module.exports = app;