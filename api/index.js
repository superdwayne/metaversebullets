const PORT = 5000
const axios = require('axios');
const cors = require('cors')
const cheerio = require('cheerio');
const express = require('express');
const app = express()

app.use(cors())

const url = 'https://metaversal.banklesshq.com/'

app.get('/', async function (req, res) {
    res.json('This is my web scraper')
})

    axios(url)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            const articles = []


            $('.post-preview-content', html).each((i , elm) => {
                const title = $(elm).find('.post-preview-title').text()
                const des = $(elm).find('.post-preview-description').text()
                // const title = $(this).find('a').attr('href')
                articles.push([
                title,
                des
                ])
            })

           //Todo Fine the url from the article page an pull that content in via a scrapped page

                
        app.get('/api/index', (req, res) =>  { res.send(articles)  })

        // app.get('/api/index', function (req, res, next) {
        //     console.log('the response will be sent by the next function ...')
        //     res.json(articles) 
        //     next()
        //   }, function (req, res) {
        //     res.send(url)
        //   })

        }).catch(err => console.log(err))


app.listen(PORT, () => console.log(`Sever is running on PORT ${PORT}`))