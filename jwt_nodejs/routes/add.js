import {Router} from 'express'
const router = Router()

import Course from '../models/course.js'

// Lesson 5 -5
import auth from '../middleware/auth.js'

router.get('/', auth, (req, res) => {
    res.render('add', {
      title: 'Добавить курс',
      isAdd: true
    })
  })

 
//POST add 9 urok
// Создание нового курса
router.post('/', auth, async (req, res) => {

  //const course = new Course(req.body.title, req.body.price,req.body.img)
  

  const course = new Course({
    title: req.body.title,
    price: req.body.price,
    img: req.body.img,
    //userId: '62a1d6944205bd3aae66ef0f'
    userId: req.user.id
  })
  
   try {
    // Запись в MongoDB test > courses - данные 
    await course.save()
    res.redirect('/courses')
  } catch (e) {
    console.log(e)
  }
//res.redirect('/courses')
    })

export default router


