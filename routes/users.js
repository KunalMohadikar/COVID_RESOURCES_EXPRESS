var express = require('express');
const { exampleRun } = require('../pythonUtil/example');
const pyApplication = require('../pythonUtil/pyapplication');
var cors = require('cors')
var router = express.Router();

/* GET users listing. */
router.get('/', cors(), async function (req, res, next) {
  data = 'not yet';
  // data = await exampleRun();
  data = await pyApplication();
  res.send(data);
  // x = `{"index": 7, "full_text": '6 oxygen beds, 4 ICU beds , 1 ventilator bed available at Prasad Hospitals, Nacharam, Hyderabad. \n\nContact number: 9177972837\n \nVerified by Pavan Kumar Yamasani DDF (03:15pm 16/05/2021)', "phoneNo": ['9177972837']}`;
  // x = x.replace(/'/g, '"');
  // x = x.replace(/\n/g," ");
  // console.log(x);
  // res.send(JSON.parse(x));
});

module.exports = router;
