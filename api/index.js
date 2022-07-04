const db = require("./server");
const cors = require('cors')
const app = require('express')();
const axios = require('axios');
const cheerio = require('cheerio');


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
    await axios(inevitable).then( async function(response)

    {

        const html = response.data
        const $ = cheerio.load(html)
        // console.log(html)
        const articles = []
        $('.post-layout ', html).each((i , elm) => {
            const title = $(elm).find('a').text()
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
    await axios(decrypt).then( async function(response)
    {
        const html = response.data
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


    
    }).catch(err => console.log(err))
    


  });

app.get('/api/decentraland', cors(), async (req, res) => {
    await axios(decentraland).then( async function(response)
    
    {
        const html = response.data
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
    
    await axios(banklesshq).then( async function(response)
    {
        const html = response.data
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



    
    }).catch(err => console.log(err))
    


  });

app.get('/api/theverge', async (req, res) => {


  await axios(theverges).then( async function(response)
   {
       const html = response.data
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
      
   
   }).catch(err => console.log(err))
   


 });

 app.get('/api/arpost', async (req, res) => {

    
  await axios(arpost).then( async function(response)
   {
       const html = response.data
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


app.use(cors())


app.listen(PORT, () => console.log(`Sever is running on PORT ${PORT}`))

module.exports = app;