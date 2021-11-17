
const db = require("./server");
const cors = require('cors')
const app = require('express')();
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT 
const blankless = require("./banklesshq");
const theverge = require("./theverge");
const xrtoday = require("./xrtoday");


app.get('/api', cors(), (req, res) => {

    res.json('hello')
  });


app.use("/api/banklesshq", cors() , blankless);
app.use("/api/theverge", cors() , theverge);
app.use("/api/xrtoday", cors() , xrtoday);


app.use(cors())


app.listen(PORT, () => console.log(`Sever is running on PORT ${PORT}`))

module.exports = app;