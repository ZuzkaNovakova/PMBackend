const express = require('express');


const Project = require('../models/project');
const Task = require('../models/task');
const User = require('../models/user');
const middlewares = require('../helpers/middlewares');

const router = express.Router();

/*router.post('/new/:userId', (req, res, next) => {
  const { projectName, description, projectManagerName, date, status, department, priority, linkToDocsStorage } = req.body;
    console.log('CREATE BODY!! :', req.body);
    console.log('USERID :', req.params.userId); 
    Project.create({projectName, description, projectManagerName, date, status, department, priority, linkToDocsStorage})
    .then((createdObject) => {
      res.status(200).json(createdObject);
      })
    .catch ((error) => {
      next(error);
    });
});*/

//NEW:
router.post('/new/:userId', (req, res, next) => {
   Project.create({
     projectName: req.body.projectToCreate.projectName,
     description: req.body.projectToCreate.description
   })
   .then(response => {
     res.json(response);
   })
   .catch(error => {
     res.json(error);
   })
});

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

    
router.delete('projects/:id/delete', (req, res, next) => {
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
     

module.exports = router;

