// This file is used to facilitate in connecting and disconnecting from the
// database.  ALL controllers that use the database will use this file to connect
// to it.  
//
// Code reuse is a good thing; sometimes silly languages act silly, that does not make code reuse silly.

var mongoose = require('mongoose');

// require caches the result the first time it gets called => it will return the same object,
// which in turn will have the same GET method, which in return will have access to the same
// state.db variable
var state = { db: null, };

exports.connect = function(url, result) {
    if(state.db) { return result() }

    mongoose.connect(url, function(err, db) {
        if(err) { return result(err); }
        state.db = db;
        done();
    });
}

exports.get = function() { return state.db; }

exports.close = function(result) {
    if(state.db) {
        state.db.close
