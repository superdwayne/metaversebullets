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
const webthreenews = 'https://web3news.eu/category/metaverse-news/'
const wired = 'https://www.wired.com/tag/metaverse/'


app.get('/api/wired', cors(), (req, res) => {
    axios(wired)
      .then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);
        const newsArticles = [];
        $('.SummaryItemWrapper-gcQMOo', html).each((i , elm) => {
            const title = $(elm).find('.SummaryItemHedBase-dZZTtv').text().substring(0, 100)
            const artURL = $(elm).find('a').attr('href')
            newsArticles.push({
            title: title,
            atricleurl:'https://www.wired.com'+artURL
            })
        })
        res.send(newsArticles);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send('Error fetching data');
      });
  });


  app.get('/api/webthreenews', cors(), (req, res) => {
    axios(webthreenews)
      .then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);
        const newsArticles = [];
      
        $('.post-content-container' , html).each((i , elm) => {
            const title = $(elm).find('.post-title').text()
            const articleUrl = $(elm).find('a').attr('href');
            newsArticles.push({
            title: title,
            atricleurl:articleUrl
            })

        })
        res.send(newsArticles);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send('Error fetching data');
      });
  });

  app.get('/api/arpost', cors(), (req, res) => {
    axios(arpost)
      .then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);
        const newsArticles = [];
        $('.post-outer', html).each((i , elm) => {
            const title = $(elm).find('.post-title-link').text().substring(0, 71)
            const artURL = $(elm).find('.post-title-link').attr('href')
            newsArticles.push({
            title: title,
            url: artURL
            })
        })
        res.send(newsArticles);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send('Error fetching data');
      });
  });


//  app.get('/api/arpost', async (req, res) => {

    
//   await axios(arpost).then( async function(response)
//    {
//        const html = response.data
//        const $ = cheerio.load(html)
//     //    console.log(html)
//        const xrarticles = []
//        $('.post-outer ', html).each((i , elm) => {
//         const title = $(elm).find('.post-title-link').text().substring(0, 71)
//         const artURL = $(elm).find('.post-title-link').attr('href')
//         xrarticles.push({
//         title: title,
//         url: artURL
//         })
//     })
   
// res.send(xrarticles)


   
//    }).catch(err => console.log(err))
   


//  });


// app.get('/api', cors(), async (req, res) => {
    
//     await axios(banklesshq).then( async function(response)
//     {
//         const html = response.data
//         const $ = cheerio.load(html)
//         const articles = []
//         $('.post-preview-content', html).each((i , elm) => {
//             const title = $(elm).find('.post-preview-title').text()
//             const preview = $(elm).find('.post-preview-description').text()
//             const artURL = $(elm).find('a').attr('href')
//             articles.push({
//             title: title,
//             preview: preview,
//             atricleurl: artURL
//             })
//         })

//         res.send(articles);

//         console.log(res.statusCode)

       



    
//     }).catch(err => console.log(err))
    


//   });





app.use(cors())


app.listen(PORT, () => console.log(`Sever is running on PORT ${PORT}`))

module.exports = app;