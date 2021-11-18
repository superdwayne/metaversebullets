const db = require("./server");
const cors = require('cors')
const app = require('express')();
const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require("mongoose");
const articlesSchema = require("./schema");
const thevergeSchema = require("./thevergeschema");

const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT 
const blankless = require("./banklesshq");
const xrtoday = require("./xrtoday");

const banklesshq = 'https://metaversal.banklesshq.com/'
const theverges = 'https://www.theverge.com/fortnite'


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
            const blankessarticles = mongoose.model('Book', articlesSchema, 'Beta929');
    
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
        
    
    }).catch(err => console.log(err))
    


  });

app.get('/theverge', cors(), (req, res) => {
    
    axios(theverges).then(function(ressponse)
   {
       const html = ressponse.data
       const $ = cheerio.load(html)
       const thevergearticles = []
       $('.c-compact-river__entry', html).each((i , elm) => {
        const title = $(elm).find('.c-entry-box--compact__title').text()
        const artURL = $(elm).find('.c-entry-box--compact__image-wrapper').attr('href')
        thevergearticles.push({
        title: title,
        url: artURL
        })
    })

       //res.send(thevergearticles)
      
           const theverge = mongoose.model('Verge', thevergeSchema, 'theverge2');
   
           theverge.find({}, function (err, users) {
               res.send(users);

            //    console.log(users)

              if (users.length >= 8) {
                  console.log('Too Many entries in the DB')
              } else {
                  // save model to database
                  theverge.collection.insertMany(thevergearticles, function (err, docs) {
                      if (err) {
                          return console.error(err);
                      } else {
                          // if number of articlres (insertedCount) is larger than 7 then delete and re-scrape
                          console.log(docs.insertedCount, "Enrties have been added to the database");
   
                      }
                  });
              }
              });
       
   
   }).catch(err => console.log(err))
   


 });


app.use(cors())


app.listen(PORT, () => console.log(`Sever is running on PORT ${PORT}`))

module.exports = app;