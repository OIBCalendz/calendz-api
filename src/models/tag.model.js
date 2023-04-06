const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tagSchema = new Schema({
  name: { type: String, enum: [], required: true, minlength: 1, maxlength: 50 },
  task: [{ type: Schema.Types.ObjectId, ref: 'Task', required: false }]
})

module.exports = mongoose.model('Tag', tagSchema)
