import {Router} from 'express'
const router = Router()
import jwt from 'jsonwebtoken'
import User from '../models/user.js'
import bcrypt from 'bcryptjs'
//import router from './apiorders.js'
//import passport from 'passport'
//--
import key from '../keys/keys.dev.js'


//http://localhost:3000/tokenposting
router.post('/', async (req, res) => {
 
  let bodys = ''
  let values = ''
    //console.log('Vse rabotaer')
   req.on('data', async chunk => {
       bodys+= chunk;
        //console.log(bodyr.toString())
       values = JSON.parse(bodys)
       //console.log(`values_email = ${values.email}`)

                      //
    const candidate =  await User.findOne({email: values.email}) //values.email
    
  if (candidate) {
    // сравнение паролей param: 1 не хэш, 2 hesh
    const passwordResult = bcrypt.compareSync(values.password ,candidate.password) // '1234' = values.password
    if(passwordResult) {
      // Генерация токена, пароли совпали
      const token = jwt.sign({
        email: candidate.email,
        userId: candidate._id
      }, key.TOKEN_KEY, {expiresIn: '1h'})
     // console.log(token)
      res.status(200).json({
        // Для FrontEnd
        //token:  `Bearer ${token}` 
        token: `${token}`
        
      })
    }  else {
      // Пароли не совпали
      res.status(401).json({message : 'Пароли не совпадают!'})
    }
  } else {
    //ошибка
    res.status(404).json({message : 'Пользователь с таким email не найден !'})
}
    
})

})


export default router