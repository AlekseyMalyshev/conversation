
'use strict';

let mongoose = require('mongoose');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

let userSchema = mongoose.Schema({
    // local login
    pass: String,
    // Social networks
    facebook: String,
    twitter: String,
    linkedin: String,
    // Personal details
    email: String,
    firstName: String,
    lastName: String,
    address: String,
    zipcode: String,
    phone: String,
    city: String,
    state: String,
    avatar: String,
    updated: {type: Date, default: Date.now},
  });

userSchema.methods.encryptPass = function(cb) {
  bcrypt.genSalt(10, (err1, salt) => {
    bcrypt.hash(this.pass, salt, (err2, hash) => {
      if (err1 || err2) {
        cb(err1 || err2);
      }
      else {
        this.pass = hash;
        cb(null);
      }
    });
  });
}

userSchema.methods.comparePass = function(pass, cb) {
  bcrypt.compare(pass, this.pass, (err, result) => {
    if (!err && result) {
      cb(err, this);
    }
    else {
      cb('invalid credentials');
    }
  });
}

userSchema.methods.token = function() {
  let payload = {
    _id: this._id,
    name: this.firstName
  };
  let secret = process.env.JWT_SECRET;
  let token = jwt.sign(payload, secret);

  return token;
}

module.exports = mongoose.model('users', userSchema);
