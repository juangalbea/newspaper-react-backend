// routes/Reply-routes.js

const express = require('express');
const mongoose = require('mongoose');
const Reply = require('../models/reply-model');
const Comment = require('../models/comment-model');
const New = require('../models/new-model');
const router  = express.Router();

// GET route => to retrieve a specific Reply
router.get('/comments/:commentID/replies/:replyID', (req, res, next) => {
  Reply.findById(req.params.replyID)
  .then(theResponse =>{
      res.json(theResponse);
  })
  .catch( err =>{
      res.json(err);
  })
});

// POST route => to create a comment Reply
router.post('/replies', (req, res, next)=>{
  
  Reply.create({
      title: req.body.title,
      description: req.body.description,  
      comment: req.body.commentID
  })
    .then(response => {
        Comment.findByIdAndUpdate(req.body.commentID, { $push:{ replies: response._id } })
        .then(theResponse => {
            res.json(theResponse);
        })
        .catch(err => {
          res.json(err);
      })
    })
    .catch(err => {
      res.json(err);
    })
})

// PUT route => to update a specific Reply
router.put('/replies/:id', (req, res, next)=>{

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Reply.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({ message: `Reply with ${req.params.id} is updated successfully.` });
    })
    .catch(err => {
      res.json(err);
    })
})

// DELETE route => to delete a specific Reply
router.delete('/replies/:id', (req, res, next)=>{

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Reply.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({ message: `Reply with ${req.params.id} is removed successfully.` });
    })
    .catch(err => {
      res.json(err);
    })
})

module.exports = router;