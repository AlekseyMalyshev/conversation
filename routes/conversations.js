'use strict';

let ObjectID = require('mongodb').ObjectID;
let express = require('express');
let router = express.Router();

let Conversation = require('../models/conversation');

let checkError = (err, res, conversation) => {
  if (err) {
    console.log('err: ', err);
    res.status(400).send(err);
  }
  else {
    res.json(conversation);
  }
}

router.post('/', (req, res) => {
  let conversation = new Conversation(req.body);
  console.log('New conversation: ', conversation);
  conversation.participants.push(req.userId);
  conversation.save((err, conversation) => {
    checkError(err, res, conversation);
  });
});

router.put('/:conversationId', (req, res) => {
  var id = req.params.conversationId;
  console.log('New message in: ', id);
  req.body.name = req.userName;
  Conversation.findOneAndUpdate({_id: id},
   { $push: { messages: req.body } },
   {new: true}, (err, doc) => {
    if (err) {
      checkError(err, res);
    }
    else {
      doc.password = null;
      res.json(doc);
    }
  });
});

router.get('/', (req, res) => {
  console.log('Getting all conversations');
  //_id in 
  Conversation.find({}, null, {sort: '-updated'})
    .populate('participants', 'firstName lastName _id')
    .exec((err, conversations) => {
      checkError(err, res, conversations);
    });
});

router.get('/:conversationId', (req, res) => {
  var id = req.params.conversationId;
  console.log('Getting conversation with id: ', id);
  Conversation.find({_id: id}, null, {sort: '-updated'})
    .populate('participants', 'firstName lastName _id')
    .exec((err, conversations) => {
      if (conversations && conversations[0]) {
        for (var i = 0; i < conversations[0].participants.length; i++) {
          if (conversations[0].participants[i]._id.toString() === req.userId) {
            console.log(conversations[0].participants[i]);
            delete conversations[0].participants[i];
            break;
          }
        };
      }
      checkError(err, res, conversations[0]);
    });
});

router.delete('/:conversationId', (req, res) => {
  var id = req.params.conversationId;
  console.log('Deleting conversation with id: ', id);
  Conversation.findOneAndRemove({_id: id}, (err, conversation) => {
    checkError(err, res, '');
  });
});

module.exports = router;
