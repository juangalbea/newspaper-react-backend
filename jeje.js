// GET route => to get a specific comment/detailed view
router.get('/comments/:id', (req, res, next)=>{

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