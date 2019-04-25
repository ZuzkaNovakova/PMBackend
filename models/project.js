const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;
const Task = require('./task');


const projectSchema = new Schema({
  projectName: { type: String, required: true, default: 'new project'},
  description: { type: String, required: true},
  /*projectManagerName: { 
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  date: Date,
  status: {type: String, enum: ['Initiation', 'Planning', 'Execution', 'Close'], required: true,},
  department: {type: String, enum: ['IT', 'HR', 'M&S', 'Finance'], required: true,},
  priority: {type: String, enum: ['High', 'Medium', 'Low'], required: true,},
  linkToDocsStorage: String,*/
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;