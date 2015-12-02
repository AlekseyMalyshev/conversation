'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let conversationSchema = mongoose.Schema({
    participants: [{type: Schema.Types.ObjectId, ref: 'users'}],
    messages: [{
      name: {type: String, required: true},
      text: {type: String, required: true},
      updated: {type: Date, default: Date.now}
    }],
    updated: {type: Date, default: Date.now}
  }
);

module.exports = mongoose.model('conversation', conversationSchema);
