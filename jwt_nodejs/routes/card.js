//const {Router} = require('express')
//const Card = require('../models/card.js')
//const Course = require('../models/course.js')


import {Router} from 'express'
import { resolve } from 'path'
import Course from '../models/course.js'

const router = Router()

import auth from '../middleware/auth.js'

//...c.courseId._doc - убирает лишние данные
function mapCartItems(cart) {
  return cart.items.map(c => ({
    ...c.courseId._doc, count: c.count
  }))
}




//Итог суммы
function  computePrice(courses) { 
  return  courses.reduce((total, course) => {
    return total += course.price * course.count
  }, 0)
}

router.post('/add', auth, async (req, res) => {
  const course = await Course.findById(req.body.id) 
  // models/user.js - userSchema.methods.addToCart
  await req.user.addToCart(course)
  res.redirect('/card')
})

router.get('/', auth, async (req, res) => {
    //.populate('cart.items.courseId')
    //.execPopulate()
  const user = await req.user
  
  const value = await user.cart.items

    let cours = []
    //console.log(`TEST`)

    
    value.forEach((item, index, array) => {
      
      let obj = new Object(); 
      obj['_id'] = array[index].courseId 
      //obj['count'] = array[index].count
       //courses[index] = obj
       cours.push(obj)
        // END ARRAY
            })  
     
    let courses = undefined
     //Course.find({ $or:[ {'_id':'62a1ea9ba179cb19d2cfd406'}, {'_id':'62a1eaa9a179cb19d2cfd413'} ] })

  if(! cours.length) {
    //console.log(`cours условие выполнено`) 
    courses = []
  } else {

  courses = await Course.find({ $or: cours })
  .select('price title img') 
 
  //Name Sales
// Count Sales
  value.forEach((item, index, array) => {
    courses[index]['count'] =  array[index].count 
        })  
   
  //const kolichestvo = mapCartItems(user.cart)
 // console.log(kolichestvo) 
  //courses.push(namesaels)
//Итог суммы - computePrice(courses)

//console.log(`count get('/' ----${courses}`)

// END ELSE
}

  res.render('card', {
    title: 'Корзина',
    isCard: true,
    courses: courses,
    price: computePrice(courses)
  })
}) 


router.delete('/remove/:id', auth, async (req, res) => {
  //const card = await Card.remove(req.params.id)
 // Удаление товара из БД
  await req.user.removeFromCart(req.params.id)
  //console.log(` Delete Sales - req.user.removeFromCart`)
  let courses =  await valueandbd(req)
  //const user = await req.user.populate('cart.items.courseId').execPopulate()
  //получение всех курсов сделать как в
  // функции router.get('/', async (req, res) 
  //const courses = mapCartItems(user.cart)
 

  console.log(`courses = ${JSON.stringify(courses)}`)

  const cart = {
    courses, 
    price: computePrice(courses)
  }

  res.status(200).json(cart)

})

//module.exports = router

async function valueandbd(req){


  const user = await req.user

  const value = await user.cart.items
  
    let cours = []

    value.forEach((item, index, array) => {
      
      let obj = new Object(); 
      obj['_id'] = array[index].courseId 
    
      cours.push(obj)
        // END ARRAY
            })  
     
  let courses = await Course.find({ $or: cours })
  .select('price title')//' img'
  //Name Sales
// Count Sales
 
  value.forEach((item, index, array) => {
  courses[index]['count'] =  array[index].count      
    }) 

return courses
} 



export default router