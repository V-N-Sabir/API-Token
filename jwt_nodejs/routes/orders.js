//const {Router} = require('express')
//const Order = require('../models/order')
//const router = Router()

import {Router} from 'express'
import Order from '../models/order.js'
const router = Router()


import auth from '../middleware/auth.js'

router.get('/', auth, async (req, res) => {
    try {
      const orders = await Order.find({'user.userId': req.user._id})
        .populate('user.userId')
  
      res.render('orders', {
        isOrder: true,
        title: 'Заказы',
        orders: orders.map(o => {
          return {
            ...o._doc,
            price: o.courses.reduce((total, c) => {
              //console.log(`orders ${orders}`)
              return total += c.count * c.course.price
              
            }, 0)
            
          }
          
        })
        
      })
    } catch (e) {
      console.log(e)
    }
  })
  
  
  router.post('/', auth, async (req, res) => {
    try {
      const user = await req.user
        .populate('cart.items.courseId')
        
        //.execPopulate()
      
      // Заменить код  
      const courses = user.cart.items.map(i => ({
        count: i.count,
        course: {...i.courseId._doc}
      }))
  
      const order = new Order({
        user: {
          name: req.user.name,
          userId: req.user
        },
        courses: courses
      })
  
      // Созхранение в БД order
      await order.save()
      //Очистка корзины
      await req.user.clearCart()
  
      res.redirect('/orders')
    } catch (e) {
      console.log(e)
    }
  })


export default router
//module.exports = router