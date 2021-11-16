const PORT = process.env.PORT || 5000
const db = require("./api/server");
const cors = require('cors')
const express = require('express');


const app = express()

const blankless = require("./api/banklesshq");
const theverge = require("./api/theverge");
const xrtoday = require("./api/xrtoday");

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
});



app.use("/api/banklesshq", cors() , blankless);
app.use("/api/theverge", cors() , theverge);
app.use("/api/xrtoday", cors() , xrtoday);

app.use(express.json({extended: false}));


app.use(cors())


app.listen(PORT, () => console.log(`Sever is running on PORT ${PORT}`))