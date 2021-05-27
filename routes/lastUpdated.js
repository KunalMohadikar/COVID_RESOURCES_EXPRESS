var express = require('express');
var cors = require('cors');
const lastupdate = require('../models/lastupdate');
var router = express.Router();

/* GET users listing. */
router.get('/', cors(), async function (req, res, next) {
  
    lastupdate_docs = await lastupdate.find();
    if(!(lastupdate_docs!=null && lastupdate_docs.length!=0)){
        err = new Error("Not updated yet");
        throw err;
    }
    res.send(lastupdate_docs[0]);
});

module.exports = router;
