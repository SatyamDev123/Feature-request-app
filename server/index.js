/**
 * Module dependencies.
 */
var express = require('express');
var app = express();
var server = require('http').Server(app);
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var router = express.Router();
var cors = require('cors');
var port = parseInt(process.env.PORT, 10) || 8888;

// conect to local mongoDB
var connect = function() {
    var options = {
        server: {
            socketOptions: {
                keepAlive: 1
            }
        }
    };
    mongoose.connect('mongodb://localhost:27017/featureRequest', options);
};
connect();
mongoose.connection.on('error', function() {
    console.log('mongo connection error!')
});
// on disconnected try to reconnect 
mongoose.connection.on('disconnected', connect);

// enable CORS for all host request instead JSONP
app.use(cors({
    origin: '*',
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    allowedHeaders: ['Authorization', 'Content-Type'],
    credentials: true
}));

// body-parser middleware for parsing the request body 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.raw());

// registered the mongoose model
require(__dirname + '/model/feature-request');

/** 
 * call registered route middleware
 * passing the express 4 router to feature-request route
 **/
require(__dirname + '/routes/feature-request')(router);

app.use('/', router);

server.listen(port);
console.log('Server started on port ' + port);