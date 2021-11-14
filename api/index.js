const PORT = 5000
const axios = require('axios');
const path = require('path');
const cors = require('cors')
const cheerio = require('cheerio');
const express = require('express');
const app = express()

app.use(cors())

const banklesshq = 'https://metaversal.banklesshq.com/'
const theverge = 'https://www.theverge.com/fortnite'
const xrtoday = 'https://www.xrtoday.com/tag/metaverse/'


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

axios(banklesshq).then(function(ressponse)
        {
            const html = ressponse.data
            const $ = cheerio.load(html)
            const articles = []
            $('.post-preview-content', html).each((i , elm) => {
                const title = $(elm).find('.post-preview-title').text()
                const preview = $(elm).find('.post-preview-description').text()
                const artURL = $(elm).find('.post-preview-title').attr('href')
                articles.push({
                title: title,
                preview: preview,
                atricleurl: artURL
                })
            })
                
        app.get('/api/index', (req, res) =>  { res.send(articles)  })

        }).catch(err => console.log(err))


app.use(express.static(path.join(__dirname, '../build', )));

app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname, '../build', 'index.html'));
});


app.listen(PORT, () => console.log(`Sever is running on PORT ${PORT}`))