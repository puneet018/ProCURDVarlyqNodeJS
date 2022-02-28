const express = require('express');
const bodyParser=require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const app = express();


// Parses the text as url encoded data
app.use(bodyParser.urlencoded({extended: true})); 
  
// Parses the text as json
app.use(bodyParser.json()); 

app.use(cookieParser());

const allRouters = require('./routers/router');

//All Routers
app.use('/', allRouters);


// Connecting to database
var query = 'mongodb+srv://task:task1234@cluster0.clp9k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect(query, {useNewUrlParser: true});
var conn = mongoose.connection;
conn.on('connected', function() {
    console.log('database is connected successfully');
});
conn.on('disconnected',function(){
    console.log('database is disconnected successfully');
})
conn.on('error', console.error.bind(console, 'connection error:'));
module.exports = conn;

//Port for Server
const port = 5000
app.listen(port, () => {
    console.log("mongoose.Connection");
})
