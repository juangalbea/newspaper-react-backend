// routes/Comment-routes.js

const express = require('express');
const mongoose = require('mongoose');
const Comment = require('../models/comment-model');
const New = require('../models/new-model');
const Response = require('../models/response-model');

const router  = express.Router();

// // GET route => to retrieve a specific Comment
// router.get('/news/:newId/comments/:CommentId', (req, res, next) => {
//   Comment.findById(req.params.CommentId)
//   .then(theComment =>{
//       res.json(theComment);
//   })
//   .catch( err =>{
//       res.json(err);
//   })
// });



// GET route => to get a specific comment/detailed view
router.get('/news/:newId/comments/:commentId', (req, res, next) => {

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  // our comments have array of responses' ids and 
  // we can use .populate() method to get the whole response objects
  //                                   ^
  //                                   |
  //                                   |
  Comment.findById(req.params.id).populate('responses')
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.json(err);
    })
})



// POST route => to create a new Comment
router.post('/comments', (req, res, next)=>{
  
  Comment.create({
      title: req.body.title,
      description: req.body.description,  
      new: req.body.newID
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