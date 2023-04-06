const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new Schema({
  // required
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true },
  type: { type: String, enum: ['DS', 'homework', 'task'], required: true },
  title: { type: String, minLength: 2, maxlength: 50, required: true },
  // not required
  description: { type: String, minlength: 2, maxlength: 1000, required: false },
  subject: { type: String, minLength: 2, maxlength: 50, required: false },
  school: { type: String, enum: [null, 'EPSI', 'WIS'], required: false },
  city: { type: String, enum: [null, 'Arras', 'Auxerre', 'Bordeaux', 'Brest', 'Grenoble', 'Lille', 'Lyon', 'Montpellier', 'Nantes', 'Rennes', 'Toulouse', 'Paris', 'Dakar'], required: false },
  grade: { type: String, enum: [null, 'SN1', 'SN2', 'B3', 'I1', 'I2', 'WIS1', 'WIS2', 'WIS3', 'WIS4', 'WIS5'], required: false },
  group: { type: String, enum: [null, 'G1', 'G2', 'G3', 'G1 (dev)', 'G2 (dev)', 'G3 (dev)', 'G1 (infra-réseau)', 'G2 (infra-réseau)', 'G3 (infra-réseau)', 'G1 (ERP)', 'G2 (ERP)'], required: false },
  targets: [{ type: Schema.Types.ObjectId, ref: 'User', required: false }],
  tags: [{ type: String, required: false }]
})

module.exports = mongoose.model('Task', taskSchema)
