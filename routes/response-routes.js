// routes/Response-routes.js

const express = require('express');
const mongoose = require('mongoose');
const Response = require('../models/response-model');
const Comment = require('../models/comment-model');

const router  = express.Router();

// GET route => to retrieve a specific Response
router.get('/comments/:commentId/responses/:ResponseId', (req, res, next) => {
  Response.findById(req.params.ResponseId)
  .then(theResponse =>{
      res.json(theResponse);
  })
  .catch( err =>{
      res.json(err);
  })
});

// POST route => to create a comment Response
router.post('/responses', (req, res, next)=>{
  
  Response.create({
      title: req.body.title,
      description: req.body.description,  
      comment: req.body.commentID
  })
    .then(response => {
        Comment.findByIdAndUpdate(req.body.commentID, { $push:{ responses: response._id } })
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

// PUT route => to update a specific Response
router.put('/responses/:id', (req, res, next)=>{

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Response.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({ message: `Response with ${req.params.id} is updated successfully.` });
    })
    .catch(err => {
      res.json(err);
    })
})

// DELETE route => to delete a specific Response
router.delete('/responses/:id', (req, res, next)=>{

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Response.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({ message: `Response with ${req.params.id} is removed successfully.` });
    })
    .catch(err => {
      res.json(err);
    })
})

module.exports = router;