const express = require('express');
const path = require('path');
const logger = require('morgan');
require('dotenv').config();
require('./config/database');

const app = express();

app.use(logger('dev'));
app.use(express.json());


// app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));
app.use(require('./config/checkToken'));



const port = process.env.PORT || 3001;

// Put API routes here, before the "catch all" route
app.use('/api/users', require('./routes/api/users'));

const ensureLoggedIn = require('./config/ensureLoggedIn');
app.use('/api/players', ensureLoggedIn, require('./routes/api/players'));

const rostersRouter = require('./routes/api/rosters')
app.use('/api/rosters', ensureLoggedIn, rostersRouter)

const apiRouter = require('./routes/api/api')
app.use('/api', apiRouter)

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, function() {
  console.log(`Express app running on port ${port}`);
});
