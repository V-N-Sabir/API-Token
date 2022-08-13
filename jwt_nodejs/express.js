import express from  'express'

// M-5 L 10
import csrf from 'csurf'

//М-5 L 11
import flash from 'connect-flash'

import exphbs from 'express-handlebars'

// Lesson 5 - 2
//const session = require('express-session')
import session from 'express-session'

// Подключать после подключения: express-session
//var MongoDBStore = require('connect-mongodb-session')(session);
import MongoStor from 'connect-mongodb-session'
let MongoStore = MongoStor(session)
//Router
import homeRouters from './routes/home.js'
import AddRouters from './routes/add.js'
import CoursesRouters from './routes/courses.js'
import cardRoutes from './routes/card.js'

// Modul 8, 3
import compression from 'compression' 

// Modul 4
import mongoose from 'mongoose'


//INTEGRACION
import api_token from './routes/api_token.js'

import salesIn from './routes/salesin.js'

import ordersApi from './routes/apiorders.js'

// Модуль 4 Урок 7
//import User from './models/user.js'

// Модуль 4 Урок 12
import ordersRoutes from './routes/orders.js'


// Modul 5
import authRoutes from './routes/auth.js'

import userMiddleware from './middleware/user.js'
// Lesson 5-2
//const varMiddleware = require('./middleware/variables')
import varMiddleware from './middleware/variables.js'


import keys from './keys/keys.dev.js'
//import keys from './keys/index.js'
//import keys from './keys/keys.prod.js'





//import passport from 'passport'
//++
//-import cookieParser from 'cookie-parser'
//-import bodyParser from 'body-parser'
//++
const app = express()



//https://www.npmjs.com/package/express-handlebars
const hbs = exphbs.create({ 
  //Файл в папке layouts
  defaultLayout: 'main',
   // ИмяФайла.hbs - расширение файла.
  extname: 'hbs',
  // Будет читать и отображать данные с других ресурсов.
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
  }

})

//const MONGODB_URI = `mongodb+srv://admindb:raCnxPTn9EhLL97X@cluster0.irluk.mongodb.net/?retryWrites=true&w=majority`

const store = new MongoStore({
  collection: 'sessions',
  uri: keys.MONGODB_URI
})

// Настрайка движка для рендеринга страниц!
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
//Где хранятся все страницы в какой папке. 
// 1 Ключ = 'views', 2 имя папки
app.set('views', 'views')

//app.use(async (req, res, next) => {
  //try {
    // 
//    const user = await User.findById('62a1e4ed71b09d781122d36a')
//    req.user = user
//    //console.log(`тип ${typeof user}`)
//    next()
//  } catch (e) {
//    console.log(e)
//  }
//}) 


// Если путь будет "/" Тогда будет смотреть в папку public
// и искать файл cdncss.css
//app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static('public'))
// POST add 9 urok
app.use(express.urlencoded({extended: true}))

//Lesson 5-2
app.use(session({
  secret: keys.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store
}))

//M-5 L-10
//++


//++
//cs app.use(csrf())
//M / 5 L - 11
app.use(flash())
app.use(compression())
app.use(varMiddleware)
app.use(userMiddleware)

//Routeri
app.use('/', homeRouters)
app.use('/add', AddRouters)
app.use('/courses', CoursesRouters)

app.use('/card', cardRoutes)

app.use('/orders', ordersRoutes)

app.use('/auth', authRoutes)

//app.use(passport.initialize())

//import passportWeb  from './middleware/passport.js'
//const pasport = 
//passportWeb(passport)

app.use('/api_token', api_token)

app.use('/apisales', salesIn)

app.use('/ordersapi', ordersApi)








//-app.use(cookieParser())

//-let csrfProtection = csrf({ cookie: true })
//--let parseForm = bodyParser.urlencoded({ extended: false })




const PORT = process.env.PORT || 3000
//const PORT =  3000


app.post('/api/users', (req, res) => {
   // res.render('about')
   res.send('<h1>Hello World!</h1>')
  })


//app.listen(PORT, () => {
   // console.log(`Server is running on port ${PORT}`)
 // })

  
  async function start() {
    try {
      //mongodb+srv://admindb:raCnxPTn9EhLL97X@cluster0.irluk.mongodb.net/?retryWrites=true&w=majority
     // const url = `mongodb+srv:admindb:raCnxPTn9EhLL97X@cluster0.irluk.mongodb.net/?retryWrites=true&w=majority`
      
      await mongoose.connect(keys.MONGODB_URI, {
        useNewUrlParser: true})
      // Modul 4 Urok 7
   //   const candidate = await User.findOne()
   //   if (!candidate) {
   //     const user = new User({
   //       email: 't_ik-t_ok@mail.ru',
   //       name: 'Sabir',
   //       cart: {items: []}
   //   })
   // await user.save()
   // }  
      //
    
      

 //////////------------------     
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`) //
      })
    } catch (e) {
     console.log(e)
    }
  }
  
  start()