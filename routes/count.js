var express = require('express');
var cors = require('cors')
var router = express.Router();
const countSchema = require('../models/count');
const { count } = require('../models/count');

/* GET users listing. */
router.get('/', cors(), async function (req, res, next) {
  
    countDoc = await countSchema.find();
    console.log(countSchema);
    if(!countDoc || countDoc.length==0){
        countDoc = await countSchema({
            count: 0
        });
    }
    res.send(countDoc);
});

module.exports = router;
