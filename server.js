'use strict';

const express    = require('express');
const bodyParser = require('body-parser');
const cors       = require('cors');
require('dotenv').config();

const apiRoutes        = require('./routes/api.js');
const fccTestingRoutes = require('./routes/fcctesting.js');
const runner           = require('./test-runner');

const app = express();

// Serve static files
app.use('/public', express.static(process.cwd() + '/public'));

// Enable CORS for FCC testing
app.use(cors({ origin: '*' }));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Index page (static HTML)
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  });

// FCC testing routes
fccTestingRoutes(app);

// API routes
apiRoutes(app);

// 404 Not Found Middleware
app.use(function(req, res, next) {
  res.status(404)
     .type('text')
     .send('Not Found');
});

// FCC tester expects GET / to return { status: "unavailable" }
// FCC tester expects /_api/get-tests to return an array of tests
app.get('/_api/get-tests', function(req, res) {
  res.json(runner.testResults || []);
});

app.get('/_api/app-info', function(req, res) {
  let appInfo = {
    userAgent: req.get('User-Agent')
  };
  res.json(appInfo);
});


const port = process.env.PORT || 3000;

// Start server and run tests if NODE_ENV=test
const server = app.listen(port, function () {
  console.log("Listening on port " + port);
  if(process.env.NODE_ENV === 'test') {
    console.log('Running Tests...');
    setTimeout(function () {
      try {
        runner.run();
      } catch(e) {
        console.log('Tests are not valid:');
        console.error(e);
      }
    }, 1500);
  }
});

// Export for testing
module.exports = app;
