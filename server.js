const express    = require('express');
const path       = require('path');
const morgan     = require('morgan');
const bodyParser = require('body-parser');
const session    = require('express-session');
//const MongoStore = require('connect-mongo')(session);
const mongoose   = require('mongoose');

//const favicon    = require('serve-favicon');

let app = express();

let port = process.env.PORT || 30000;

app.set('port', port);
app.set('ip', (process.env.IP || '127.168.0.1'));

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/phoneChatDB';

mongoose.connect(connectionString);

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
//app.use(express.static(path.join(__dirname, 'public')));
// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// TODO: See This
app.use(morgan('combined'))

app.use(session({
  key: 'session',
  secret: '128013A7-5B9F-4CC0-BD9E-4480B2D3EFE9', // TODO ENV
  store: require('mongoose-session')(mongoose), // new MongoStore({ mongooseConnection: mongoose.connection })
  // store: new MongoStore({ db: mongoose.connection }),
  resave: true,
  saveUninitialized: true
}));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const accountRoutes = require('./routes/account');
const eventRoutes = require('./routes/event');
app.use('/api/account', accountRoutes);
app.use('/api/event', eventRoutes);

 var server = app.listen(port, function () {
     console.log('Express server listening on port ' + server.address().port);
 });
