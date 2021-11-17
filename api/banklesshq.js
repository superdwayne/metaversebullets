const express = require("express");
const router = express.Router();


router.get('/',  async function (req, res) {

    
    })

 module.exports = (req, res) => {
        const { name = 'World' } = req.query;
        res.json(`Hello ${name}!`);
      };
    