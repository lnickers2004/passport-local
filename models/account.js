// sample model

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');


//var Account = new Schema({
//  username: String,
//  email: String,
//  time: {type: Date, default: Date.now}
//});

var Account = new Schema({
  username: String,
  password: String
});

Account.plugin(passportLocalMongoose);


module.exports = mongoose.model('Account', Account);
