var mongoose = require('../mongoose');

mongoose.connect('mongodb://localhost/my_database');

var userSchema = new mongoose.schema({
    name:String,
    email:String,
    telephone:String,
    password:String,
})