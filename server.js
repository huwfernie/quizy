const express = require('express'); //
const morgan = require('morgan'); //
const bodyParser = require('body-parser'); //
const mongoose = require('mongoose'); //
mongoose.plugin(require('./lib/globalToJSON')); //
mongoose.Promise = require('bluebird'); //
const { port, env, dbURI } = require('./config/environment'); //
const routes = require('./config/routes');
const customResponses = require('./lib/customResponses');
const crossOrigin = require('./lib/crossOrigin');
const errorHandler = require('./lib/errorHandler');

const app = express();

mongoose.connect(dbURI, { useMongoClient: true });

if(env !== 'test') app.use(morgan('dev'));

app.use(express.static(`${__dirname}/public`));
app.use(crossOrigin);
app.use(bodyParser.json());

app.use(customResponses);

app.use('/api', routes);
const path = require('path');

app.use('/admin', express.static(path.join(__dirname, '/admin_old/')));
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname + '/admin_old/index.html'))
});
// app.get('/*', (req, res) => res.sendFile(`${__dirname}/public/index.html`));

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')));
// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/public/index.html'));
});

app.use(errorHandler);

app.listen(port, () => console.log(`Express is listening on port ${port}`));
