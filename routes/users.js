var express = require('express');
const { exampleRun } = require('../pythonUtil/example');
const pyApplication = require('../pythonUtil/pyapplication');
var cors = require('cors')
var router = express.Router();
const tweetSchema = require('../models/tweet');

/* GET users listing. */
router.get('/', cors(), async function (req, res, next) {
  data = 'not yet';
  // data = await exampleRun();
  // data = await pyApplication();
  // data = await tweetSchema.find();

  let location = req.query.location;
  let resource = req.query.resource;
  console.log(location);
  console.log(resource);

  try{
    data = await tweetSchema.find({$text: {$search: `"${location}" "${resource}"`}});
    res.send(data);
  } catch(e){
    throw e;
  }
});

module.exports = router;
