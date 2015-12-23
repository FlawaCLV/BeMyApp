/**
 * Created by hugopozzoli on 22/12/15.
 */

var express     = require('express'),
    app         = express(),
    server      = require('http').Server(app),
    io          = require('socket.io')(server),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    routing     = require('./routing').routing,
    live        = require('./live').live,
    swig        = require('swig');


// Initialization

app.use('/public', express.static('../public'));
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


// Live

io.on('connection', function (socket) {
    live.listen(io, socket);
});


// Server listen

server.listen(3000, function () {
    console.log('Listening on port 3000');
});