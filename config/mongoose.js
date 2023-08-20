const mongoose = require('mongoose');
// setting up the connection of mongoose with the database
mongoose.connect('mongodb://localhost/task_Details_DB');

const db = mongoose.connection;  // getting the connection

db.on('error', console.error.bind(console, 'Error connecting to Database'));


db.once('open', function(){
    
    console.log('Successfully connected to database');
});


//  database is succesfully setted up