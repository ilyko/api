const express = require('express'),
 	app = express(),
 	config = require('./config/main'),
  	mongoose = require('mongoose'),
  	morgan = require('morgan'),
  	router = require('./router'),	
  	Task = require('./api/models/moveshtModel'), //created model loading here
	passport = require('passport'),  
	jwt = require('jsonwebtoken'),  
 	bodyParser = require('body-parser');

mongoose.connect(config.database,{
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
  useMongoClient: true
});  
app.set('superSecret', config.secret);

let server;
if (process.env.NODE_ENV != config.test_env) {
  server = app.listen(config.port);
  console.log(`Your server is running on port ${config.port}.`);
} else{
  server = app.listen(config.test_port);
  console.log(`Your server is running on test-port ${config.port}.`);
}



var routes = require('./api/routes/moveshtRoutes'); //importing route
routes(app); //register the route


app.use(bodyParser.urlencoded({ extended: false }));  
app.use(bodyParser.json());


app.use(morgan('dev'));  
app.get('/', function(req, res) {  
  res.send('Relax. We will put the home page here later.');
});

/*app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});*/
	
// Enable CORS from client-side
app.use(function(req, res, next) {  
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

router(app);
