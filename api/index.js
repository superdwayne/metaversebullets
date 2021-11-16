const PORT = process.env.PORT || 5000
const db = require("./server");
const cors = require('cors')
const express = require('express');


const app = express()

const blankless = require("./banklesshq");
const theverge = require("./theverge");
const xrtoday = require("./xrtoday");


const BuiltTime = require('../build');
module.exports = (req, res) => {
  res.setHeader('content-type', 'text/plain');
  res.send(`
    This Serverless Function was built at ${new Date(BuiltTime)}.
    The current time is ${new Date()}
  `);
};

app.use("/api/banklesshq", cors() , blankless);
app.use("/api/theverge", cors() , theverge);
app.use("/api/xrtoday", cors() , xrtoday);

app.use(express.json({extended: false}));

app.use(cors())


app.listen(PORT, () => console.log(`Sever is running on PORT ${PORT}`))