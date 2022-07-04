const db = require("./server");
const cors = require('cors')
const app = require('express')();
const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require("mongoose");


const dotenv = require('dotenv');
dotenv.config();

const PORT = 5000


const banklesshq = 'https://metaversal.banklesshq.com/'
const theverges = 'https://www.theverge.com/tech'
const arpost = 'https://arpost.co/category/augmented-reality/'
const inevitable = 'https://inevitable.media/category/nfts/'
const decentraland = 'https://decentraland.org/blog/'
const decrypt = 'https://decrypt.co/'


app.get('/api/inevitable', cors(), async (req, res) => {
    await axios(inevitable).then(function(ressponse)
    {
        const html = ressponse.data
        const $ = cheerio.load(html)
        // console.log(html)
        const articles = []
        $('.post-layout ', html).each((i , elm) => {
            const title = $(elm).find('a').text().replace(/(\r\n|\n|\r)/gm, "")
            const artURL = $(elm).find('a').attr('href')
            const preview = $(elm).find('p').text().substring(0, 71)
            articles.push({
            title: title,
            preview: preview,
            atricleurl:artURL
            })
        })

        // console.log(articles);
        res.send(articles);

        if (res.statusCode !== 200){
            res.send([{title: 'Refresh for latest articles'}]);
        } 

   

    
    }).catch(err => console.log(err))
    


  });

app.get('/api/decrypt', cors(), async (req, res) => {
    await axios(decrypt).then(function(ressponse)
    {
        const html = ressponse.data
        const $ = cheerio.load(html)
        // console.log(html)
        const articles = []
        $('.GridItem', html).each((i , elm) => {
            const title = $(elm).find('h2').text().substring(0, 100)
            const artURL = $(elm).find('a').attr('href')
            const preview = $(elm).find('p').text().substring(0, 100)
            articles.push({
            title: title,
            preview: preview,
            atricleurl:'https://decrypt.co'+artURL
            })
        })

        res.send(articles);

        if (res.statusCode !== 200){
            res.send([{title: 'Refresh for latest articles'}]);
        } 

        // console.log(articles)

        //     const decentralandarticles = mongoose.model('decentraland', decentralandSchema, 'decentralandarticles');


        //     decentralandarticles.count(function(err, count) {

            
        //         if( count === 0 || err) {
        //             console.log("No Found Records For decentraland");                    
                    
        //         } else {

        //             decentralandarticles.deleteMany( {articles} ,
           
        //                 function(err, result){
            
        //                     if(err){
        //                        console.log('error')
        //                     }
        //                     else{
        //                         console.log("success" , count , "items deleted  ")
        //                     }
                    
        //                 }) 

                   
        //         }
        //     });


        //     decentralandarticles.find({}, function (err, users) {

        //         decentralandarticles.collection.insertMany(articles, function (err, docs) {

        //             if (err) {
        //                 return console.error(err);
        //             } else {
        //                 // if number of articlres (insertedCount) is larger than 7 then delete and re-scrape
        //                 console.log(docs.insertedCount, "Enrties have been added to the for decentraland");
        //                 res.send(users);
 
        //             }
        //         });

        //    });


    
    }).catch(err => console.log(err))
    


  });

app.get('/api/decentraland', cors(), async (req, res) => {
    await axios(decentraland).then(function(ressponse)
    {
        const html = ressponse.data
        const $ = cheerio.load(html)
        // console.log(html)
        const articles = []
        $('.post', html).each((i , elm) => {
            const title = $(elm).find('h3').text().replace('#00', '')
            const artURL = $(elm).find('a').attr('href')
            const preview = $(elm).find('p').text()
            articles.push({
            title: title,
            preview: preview,
            atricleurl:'https://decentraland.org'+artURL
            })
        })

        res.send(articles);

        if (res.statusCode !== 200){
            res.send([{title: 'Refresh for latest articles'}]);
        } 



    
    }).catch(err => console.log(err))
    


  });

app.get('/api', cors(), async (req, res) => {
    
    await axios(banklesshq).then(function(ressponse)
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

        res.send(articles);

        console.log(res.statusCode)

        if (res.statusCode !== 200){
            res.send([{title: 'Refresh for latest articles'}]);
        } 


        //     // compile schema to model
        //     const blankessarticles = mongoose.model('Book', articlesSchema, 'testoneupdate');


        //     blankessarticles.count(function(err, count) {

            
        //         if( count === 0 || err) {
        //             console.log("No Found Records For Blankess");                    
                    
        //         } else {

        //             blankessarticles.deleteMany( {articles} ,
           
        //                 function(err, result){
            
        //                     if(err){
        //                        console.log('error')
        //                     }
        //                     else{
        //                         console.log("success" , count , "items deleted  ")
        //                     }
                    
        //                 }) 

                   
        //         }
        //     });


        //     blankessarticles.find({}, function (err, users) {

        //         blankessarticles.collection.insertMany(articles, function (err, docs) {

        //             if (err) {
        //                 return console.error(err);
        //             } else {
        //                 // if number of articlres (insertedCount) is larger than 7 then delete and re-scrape
        //                 console.log(docs.insertedCount, "Enrties have been added to the for Blankess");
        //                 res.send(users);
 
        //             }
        //         });

        //    });


    
    }).catch(err => console.log(err))
    


  });

app.get('/api/theverge', async (req, res) => {


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

    res.send(thevergearticles);

    if (res.statusCode !== 200){
        res.send([{title: 'Refresh for latest articles'}]);
    } 
      
        //    const theverge = mongoose.model('XR', thevergeSchema, 'theverge2');

        //    theverge.count(function(err, count) {
            
        //     if( count === 0 || null) {
        //         console.log("No Found Records For Blankess");                    
                
        //     } else {

        //         theverge.deleteMany( {thevergearticles} ,
       
        //             function(err, result){
        
        //                 if(err){
        //                    console.log('error')
        //                 }
        //                 else{
        //                     console.log("success" , count , "items deleted for the Verge  ")
        //                 }
                
        //             }) 
               
        //     }
        // });


        //    theverge.find({}, function (err, users) {
    
        //           theverge.collection.insertMany(thevergearticles, function (err, docs) {
        //               if (err) {
        //                   return console.error(err);
        //               } else {
        //                   // if number of articlres (insertedCount) is larger than 7 then delete and re-scrape
        //                   console.log(docs.insertedCount, "Enrties have been added to the for the verge");
        //                   res.send(users);
   
        //               }
        //           });
              
        //       });
       
   
   }).catch(err => console.log(err))
   


 });

 app.get('/api/arpost', async (req, res) => {

    
  await axios(arpost).then(function(ressponse)
   {
       const html = ressponse.data
       const $ = cheerio.load(html)
    //    console.log(html)
       const xrarticles = []
       $('.post-outer ', html).each((i , elm) => {
        const title = $(elm).find('.post-title-link').text().substring(0, 71)
        const artURL = $(elm).find('.post-title-link').attr('href')
        xrarticles.push({
        title: title,
        url: artURL
        })
    })
   
res.send(xrarticles)

if (res.statusCode !== 200){
    res.send([{title: 'Refresh for latest articles'}]);
} 
   
   }).catch(err => console.log(err))
   


 });

//  app.get('/api/hypebeast', async (req, res) => {

//  res.setHeader('Content-Type', 'application/json');
    
//   await axios(hypebeast).then(function(ressponse)
//    {
//        const html = ressponse.data
//        const $ = cheerio.load(html)
//        const beastarticles = []
//     //    console.log(html)
//        $('.post-box', html).each((i , elm) => {
//         const title = $(elm).find('.post-box-content-title').text()
//         const artURL = $(elm).find('.title').attr('href')
//         const preview = $(elm).find('.post-box-content-excerpt').text()
//         beastarticles.push({
//         title: title,
//         preview: preview,
//         url: artURL
//         })
//     })

         
//            const beast = mongoose.model('Beast', hypebeastschema, 'Hypebeast3');


//            beast.count(function(err, count) {
            
//             if( count === 0 || null) {
//                 console.log("No Found Records For Hype beast");                    
                
//             } else {

//                 beast.deleteMany( {beastarticles} ,
       
//                     function(err, result){
        
//                         if(err){
//                            console.log('error')
//                         }
//                         else{
//                             console.log("success" , count , "items deleted for Hypebeast  ")
//                         }
                
//                     }) 
               
//             }
//         });


   
//            beast.find({}, function (err, users) {

//             beast.collection.insertMany(beastarticles, function (err, docs) {
//                 if (err) {
//                     return console.error(err);
//                 } else {
              
//                    console.log(docs.insertedCount, "Enrties have been added to the database for Hype Beast");
//                    res.send(users)

//                 }
//             });
//               });
       
   
//    }).catch(err => console.log(err))
   


//  });

app.use(cors())


app.listen(PORT, () => console.log(`Sever is running on PORT ${PORT}`))

module.exports = app;