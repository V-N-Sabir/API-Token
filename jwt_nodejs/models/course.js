//const {Schema, model} = require('mongoose')

//import {Schema, model} from 'mongoose'
import pkg from 'mongoose';
const {Schema, model} = pkg;


const course = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  img: String,
  userId: {
    type: Schema.Types.ObjectId,
   ref: 'User'
  }
})

// Модуль 4. 11 Урок
//course.method('toClient', function() {
  //const course = this.toObject()

  //course.id = course._id
  //delete course._id

  //return course
//})
 
export default model('Course', course)