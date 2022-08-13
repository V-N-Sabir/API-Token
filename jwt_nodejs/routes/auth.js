//const {Router} = require('express')
//const router = Router()

import User from '../models/user.js'
import {Router} from 'express'
const router = Router()

// M - 5 L - 9
import bcrypt from 'bcryptjs'

//L 7 1
import {validationResult} from 'express-validator' // /check/index.js


import registerValidators from '../utils/validators.js'



router.get('/login', async (req, res) => {
  res.render('auth/login', {
    title: 'Авторизация',
    isLogin: true,
    loginError: req.flash('loginError'),
    registerError: req.flash('registerError')
  })
})



router.get('/logout', async (req, res) => {
  req.session.destroy(() => {
    res.redirect('/auth/login#login')
  })
})


router.get('/logout', async (req, res) => {
  // Иничтожение всех данных сессии.
  // передача calback функции, после очистки - res.redirect('/auth/login#login')
  req.session.destroy(() => {
    res.redirect('/auth/login#login')
  })
})

//Modul 5 Lesson 8
router.post('/login', async (req, res) => {
  try {
    const {email, password} = req.body
    const candidate = await User.findOne({ email })

    if (candidate) {
      const areSame = await bcrypt.compare(password, candidate.password)

      if (areSame) {
        req.session.user = candidate
        req.session.isAuthenticated = true
        req.session.save(err => {
          if (err) {
            throw err
          }
          res.redirect('/')
        })
      } else {
        req.flash('loginError', 'Неверный пароль')
        res.redirect('/auth/login#login')
      }
    } else {
      req.flash('loginError', 'Такого пользователя не существует')
      res.redirect('/auth/login#login')
    }
  } catch (e) {
    console.log(e)
  }
})


//Modul 5 Lesson 8 and 9
///auth/login#login
router.post('/register', registerValidators, async (req, res) => {
  try {
    const {email, password, confirm, name} = req.body
    const candidate = await User.findOne({ email })

    const errors = validationResult(req)
 //   console.log(errors.isEmpty())
    if(!errors.isEmpty()) {
      req.flash('registerError', errors.array()[0].msg)    
      return res.status(422).redirect('login#register')//auth/
    }


    if (candidate) {
      req.flash('registerError', 'Пользователь с таким email уже существует')
      res.redirect('login#register') //  auth/
    } else {
      // L - 9
      const hashPassword = await bcrypt.hash(password, 10)
      const user = new User({
        email, name, password: hashPassword, cart: {items: []}
      })
      await user.save()
      res.redirect('/auth/login#login')
    }
  } catch (e) {
    console.log(e)
  }
})




//auth/login#register
//router.post('/login', async (req, res) => {
  //const user = await User.findById('62a1e4ed71b09d781122d36a')
  //req.session.user = user
  //req.session.isAuthenticated = true
  //req.session.save(err => {
    //if (err) {
     // throw err
   // }
   // res.redirect('/')
 // })
  
//})





//auth/login#register
//router.post('/register', body('email').isEmail(), async //(req, res) => {
//  try {
//    const {email, password, confirm, name} = req.body
//    const candidate = await User.findOne({ email })

    // errors = validationResult(req)
    ////console.log(errors.isEmpty())
   // if(!errors.isEmpty()) {
    //  req.flash('registerError', errors.array()[0].msg)    
    //  return res.status(422).redirect('auth/login#register')
   // }



//    if (candidate) {
//      res.redirect('/auth/login#register')
//    } else {
//      const user = new User({
//        email, name, password, cart: {items: []}
//      })
//      await user.save()
//      res.redirect('/auth/login#login')
//    }
//  } catch (e) {
//    console.log(e)
//  }
//})

export default router
//module.exports = router

// ++++++++++++++++++++++++++

