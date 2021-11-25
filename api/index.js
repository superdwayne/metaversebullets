const db = require("./server");
const cors = require('cors')
const app = require('express')();
const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require("mongoose");
const articlesSchema = require("./schema");
const thevergeSchema = require("./thevergeschema");
const xrarticlesSchema = require("./xrarticlesSchema");
const hypebeastschema = require("./hypebeastschema")

const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT 


const banklesshq = 'https://metaversal.banklesshq.com/'
const theverges = 'https://www.theverge.com/fortnite'
const xrtoday = 'https://www.xrtoday.com/tag/metaverse/'
const hypebeast = 'https://hypebeast.com/latest'


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
            const blankessarticles = mongoose.model('Book', articlesSchema, 'testoneupdate');


            blankessarticles.count(function(err, count) {
            
                if( count === 0 || null) {
                    console.log("No Found Records For Blankess");                    
                    
                } else {

                    blankessarticles.deleteMany( {articles} ,
           
                        function(err, result){
            
                            if(err){
                               console.log('error')
                            }
                            else{
                                console.log("success" , count , "items deleted  ")
                            }
                    
                        }) 

                   
                }
            });


            blankessarticles.find({}, function (err, users) {

                blankessarticles.collection.insertMany(articles, function (err, docs) {

                    if (err) {
                        return console.error(err);
                    } else {
                        // if number of articlres (insertedCount) is larger than 7 then delete and re-scrape
                        console.log(docs.insertedCount, "Enrties have been added to the database");
                        res.send(users);
 
                    }
                });

           });


    
    }).catch(err => console.log(err))
    


  });

app.get('/api/theverge', async (req, res) => {

    res.setHeader('Content-Type', 'application/json');
    
  await axios(theverges).then(function(ressponse)
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

    //    console.log(thevergearticles)
      
           const theverge = mongoose.model('XR', thevergeSchema, 'theverge2');
   
           theverge.find({}, function (err, users) {
               res.send(users);

            //    console.log(users)

              if (users.length >= 8) {
                 // console.log('Too Many entries in the DB')
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

 app.get('/api/xrtoday', async (req, res) => {

    res.setHeader('Content-Type', 'application/json');
    
  await axios(xrtoday).then(function(ressponse)
   {
       const html = ressponse.data
       const $ = cheerio.load(html)
       const xrarticles = []
       $('.ccol-md-4 mb-50', html).each((i , elm) => {
        const title = $(elm).find('.font-weight-500').text()
        const artURL = $(elm).find('.single_uctv-inner position-relative mb-2').attr('href')
        xrarticles.push({
        title: title,
        url: artURL
        })
    })
   
//console.log(xrarticles.url)
      
           const Xr = mongoose.model('Verge', xrarticlesSchema, 'xr22');
   
           Xr.find({}, function (err, users) {
               res.send(users);

            //    console.log(users)

            Xr.collection.insertMany(xrarticles, function (err, docs) {
                if (err) {
                    return console.error(err);
                } else {
                    // if number of articlres (insertedCount) is larger than 7 then delete and re-scrape
                    console.log(docs.insertedCount, "Enrties have been added to the database");

                }
            });
              });
       
   
   }).catch(err => console.log(err))
   


 });

 app.get('/api/hypebeast', async (req, res) => {

    res.setHeader('Content-Type', 'application/json');
    
  await axios(hypebeast).then(function(ressponse)
   {
       const html = ressponse.data
       const $ = cheerio.load(html)
       const beastarticles = []
    //    console.log(html)
       $('.post-box', html).each((i , elm) => {
        const title = $(elm).find('.post-box-content-title').text()
        const artURL = $(elm).find('.title').attr('href')
        const preview = $(elm).find('.post-box-content-excerpt').text()
        beastarticles.push({
        title: title,
        preview: preview,
        url: artURL
        })
    })

    // console.log(beastarticles)

    // res.send(beastarticles);
         
           const beast = mongoose.model('Beast', hypebeastschema, 'Hypebeast3');
   
           beast.find({}, function (err, users) {

           res.send(users)
               

           // console.log("Hype beast", users.length)

            beast.collection.insertMany(beastarticles, function (err, docs) {
                if (err) {
                    return console.error(err);
                } else {
                    // if number of articlres (insertedCount) is larger than 7 then delete and re-scrape
                  //  console.log(docs.insertedCount, "Enrties have been added to the database for Hype Beast");

                }
            });
              });
       
   
   }).catch(err => console.log(err))
   


 });

app.use(cors())


app.listen(PORT, () => console.log(`Sever is running on PORT ${PORT}`))

module.exports = app;