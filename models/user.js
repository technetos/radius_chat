var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    _id         :   String,
    username    :   String,
    email       :   String,
    password    :   String,
    geoLocation :   {
        longitude   :   String,
        latitude    :   String 
    }
    },{ versionKey  :   false });

module.exports = mongoose.model('User', userSchema);
