// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');

var methodOverride = require('method-override');

var session      = require('express-session');

var configDB = require('./config/database.js');

//import {NgxPaginationModule} from 'ngx-pagination';
//var NgxPaginationModule = require('ngx-pagination');
//var paginate = require('paginate')({
  // options go here...
//});
//var paginate = require('paginate');

// configuration ===============================================================
//mongoose.connect(configDB.url); // connect to our database

// Here we find an appropriate database to connect to, defaulting to
// localhost if we don't find one.  
var uristring = process.env.MONGODB_URI || configDB.url;
// Makes connection asynchronously.  Mongoose will queue up database
// operations and release them when the connection is complete.
mongoose.connect(uristring, function (err, res) {
    if (err) { 
      console.log ('ERROR connecting to: ' + uristring + '. ' + err);
    } else {
      console.log ('Succeeded connected to: ' + uristring);
    }
  });

require('./config/passport')(passport); // pass passport for configuration

app.use(express.static('./public')); 

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({
    secret: 'ilovescotchscotchyscotchscotch', // session secret
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport
//require('./app/routesToDo.js')(app); // for app 

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
