const express = require('express');


const Project = require('../models/project');
const Task = require('../models/task');
const User = require('../models/user');
const middlewares = require('../helpers/middlewares');

const router = express.Router();

//NEW:
router.post('/new/:userId', (req, res, next) => {
  console.log('BODYYY: ', req.body);
   Project.create({
     projectName: req.body.projectName,
     description: req.body.description
   })
   .then(response => {
     res.json(response);
   })
   .catch(error => {
     res.json(error);
   })
});


//PROJECT DETAIL
router.get('/projects/:id', (req, res, next) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({message: 'Id not valid'})
  }
  Project.findById(req.params.id).populate('tasks')
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.json(error);
    })
})

//PROJECT UPDATE
router.put('/projects/:id/update', (req, res, next) =>{
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Id not valid'});
    return;
  }
  Project.findByIdAndUpdate(req.params.id, req.body)
  .then(() => {
    res.json({ message: 'Project ${req.params.id} is updated'});
  })
  .catch(error => {
    res.json(error);
  })
})

//PROJECT DELETE    
router.delete('/projects/:id/delete', (req, res, next) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Id not valid'});
  }
  Project.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({ message: 'Project with ${req.params.id} removed'});
    })
    .catch( error => {
      res.json(error);
    })
})

//LIST OF ALL PROJECTS
router.get('/allprojects', (req, res, next) => {
  Project.find()
  .then((trips) => {
    res.status(200).json(trips);
  })
  .catch(error => {
    res.json(error);
  })
})
     

module.exports = router;

