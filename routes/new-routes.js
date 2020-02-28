// routes/new-routes.js
const express = require('express');
const mongoose = require('mongoose');
const router  = express.Router();

const New = require('../models/new-model');
const Comment = require('../models/comment-model'); // <== !!!


// POST route => to create a new new
router.post('/news', (req, res, next)=>{
 
  New.create({
    title: req.body.title,
    description: req.body.description,
    comments: []
  })
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.json(err);
    })
});

// // GET route => to get all the news
// router.get('/news', (req, res, next) => {
//   New.find().populate('comments')
//     .then(allTheNews => {
//       res.json(allTheNews);
//     })
//     .catch(err => {
//       res.json(err);
//     })
// });

// GET route => to get a specific new/detailed view
router.get('/news/:id', (req, res, next)=>{

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  // our news have array of comments' ids and 
  // we can use .populate() method to get the whole comment objects
  //                                   ^
  //                                   |
  //                                   |
  New.findById(req.params.id).populate('comments')
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.json(err);
    })
})

// // PUT route => to update a specific new
// router.put('/news/:id', (req, res, next)=>{

//   if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
//     res.status(400).json({ message: 'Specified id is not valid' });
//     return;
//   }

//   New.findByIdAndUpdate(req.params.id, req.body)
//     .then(() => {
//       res.json({ message: `New with ${req.params.id} is updated successfully.` });
//     })
//     .catch(err => {
//       res.json(err);
//     })
// })

// // DELETE route => to delete a specific new
// router.delete('/news/:id', (req, res, next)=>{

//   if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
//     res.status(400).json({ message: 'Specified id is not valid' });
//     return;
//   }

//   New.findByIdAndRemove(req.params.id)
//     .then(() => {
//       res.json({ message: `New with ${req.params.id} is removed successfully.` });
//     })
//     .catch( err => {
//       res.json(err);
//     })
// })


module.exports = router;