const express = require('express');


const Project = require('../models/project');
const Task = require('../models/task');
const User = require('../models/user');
const middlewares = require('../helpers/middlewares');

const router = express.Router();

//NEW
router.post('/task/new', (req, res, next) => {
  console.log('task create', req.body);
  const userId = req.session.currentUser._id;
  Task.create({
    task: req.body.task,
  })
  .then(response => {
    res.status(200).json(response);
  })
  .catch(error => {
    res.json(error);
  })
})

//DETAIL
router.get('/task/:id', (req, res, next) => {
  Task.findById(req.params.id)
  .then(response => {
    res.status(200).json(response);
  })
  .catch(error => {
    res.json(error);
  })
})


//UPDATE
router.put('/update/:id', (req, res, next) => {
  Task.findByIdAndUpdate(req.params.id, req.body)
  .then(() => {
    res.json({ message: 'Taks ${req.params.id} is updated' });
  })
  .catch(error => {
    res.json(error);
  })
})


//DELETE
router.delete('/delete/:id', (req, res, next) => {
  Task.findByIdAndRemove(req.params.id)
  .then(() => {
    res.json( { message: 'Task with ${req.params.id} removed'});
  })
  .catch( error => {
    res.json(error);
  })
})


module.exports = router;