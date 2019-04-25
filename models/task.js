const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const taskSchema = new Schema({
  task: { type: String, /*required: true */},
  /*assignee: {
    type: ObjectId,
    ref: 'User',
  },
  status: { type:String, enum: ['In Progress', 'On Hold', 'Finished']},
  deadline: Date,
  priority: {type: String, enum: ['High', 'Medium', 'Low']},*/
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;