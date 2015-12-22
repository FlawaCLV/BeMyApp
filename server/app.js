/**
 * Created by hugopozzoli on 22/12/15.
 */

var express     = require('express'),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    routing     = require('./routing').routing,
    swig        = require('swig');


// App

var app = express();


// Initialization

app.use(express.static('../public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', 'views');
app.set('view cache', false);
swig.setDefaults({ cache: false });


// Database

mongoose.connect('mongodb://localhost/bemyapp');


// Routes

routing.start(app);


// Server listen

var server = app.listen(3000, function () {
    console.log('Listening on port 3000');
});