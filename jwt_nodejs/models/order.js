//const {Schema, model} = require('mongoose')

import pkg from 'mongoose';
const {Schema, model} = pkg;


const orderSchema = new Schema({
  courses: [
    {
      course: {
        type: Object,
        required: true
      },
      count: {
        type: Number,
        required: true
      }
    }
  ],
  user: {
    name: String,
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
})

export default model('Order', orderSchema)
//module.exports = model('Order', orderSchema)