const express = require('express');


const Project = require('../models/project');
const Task = require('../models/task');
const User = require('../models/user');
const middlewares = require('../helpers/middlewares');

const router = express.Router();

//NEW:
router.post('/new', (req, res, next) => {
  console.log('BODYYY: ', req.session.currentUser._id);
  const userId = req.session.currentUser._id;
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

