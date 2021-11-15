const PORT = 5000
const axios = require('axios');
const cors = require('cors')
const cheerio = require('cheerio');
const express = require('express');
const app = express()

app.use(cors())

const banklesshq = 'https://metaversal.banklesshq.com/'
const OpenSea = 'https://opensea.io/blog'

axios(banklesshq).then(function(res1, res2, res3)
            
        {
            const html = res1.data
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

  
        app.get('/api/opensea', (req, res) =>  { res.send(articles)  })


        }).catch(err => console.log(err))


app.listen(PORT, () => console.log(`Sever is running on PORT ${PORT}`))