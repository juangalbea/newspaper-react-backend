// routes/Comment-routes.js

const express = require('express');
const mongoose = require('mongoose');
const Comment = require('../models/comment-model');
const New = require('../models/new-model');
const Reply = require('../models/reply-model');

const router  = express.Router();

// POST route => to create a new Comment
router.post('/comments', (req, res, next)=>{
  
  Comment.create({
      title: req.body.title,
      description: req.body.description,  
      new: req.body.newID,
      replies: []
  })
    .then(response => {
        New.findByIdAndUpdate(req.body.newID, { $push:{ comments: response._id } })
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

// // GET route => to retrieve a specific Comment
// router.get('/news/:newID/comments/:commentID', (req, res, next) => {
//   Comment.findById(req.params.commentID)
//   .then(theComment =>{
//       res.json(theComment);
//   })
//   .catch( err =>{
//       res.json(err);
//   })
// });

// GET route => to get all the news
router.get('/comments', (req, res, next) => {
  New.find().populate('comments')
    .then(allTheComments => {
      res.json(allTheComments);
    })
    .catch(err => {
      res.json(err);
    })
});

// GET route => to get a specific comment/detailed view
router.get('/news/:newID/comments/:commentID', (req, res, next) => {
console.log(req.params.commentID)
  if(!mongoose.Types.ObjectId.isValid(req.params.commentID)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  // our comments have array of replies' ids and 
  // we can use .populate() method to get the whole reply objects
  //                                   ^
  //                                   |
  //                                   |
  Comment.findById(req.params.commentID).populate('replies')
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.json(err);
    })
})

// PUT route => to update a specific Comment
router.put('/comments/:id', (req, res, next)=>{

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Comment.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({ message: `Comment with ${req.params.id} is updated successfully.` });
    })
    .catch(err => {
      res.json(err);
    })
})

// DELETE route => to delete a specific Comment
router.delete('/comments/:id', (req, res, next)=>{

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Comment.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({ message: `Comment with ${req.params.id} is removed successfully.` });
    })
    .catch(err => {
      res.json(err);
    })
})

module.exports = router;