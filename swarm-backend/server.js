'use strict';

const express = require('express');

// Constants
const PORT = 4000;

var requests = 0;

// App
const app = express();
app.get('/', function (req, res) {
  var os = require("os");
  requests++;
  res.send("Request number: " + requests + " served by " + os.hostname() + " - " + process.env.ENVIRONMENT);  
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);