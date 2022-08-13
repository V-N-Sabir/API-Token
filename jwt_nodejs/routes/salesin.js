import {Router} from 'express'
const router = Router()
//++
//import jwt from 'jsonwebtoken'
//import key from '../keys/keys.dev.js'
//--
import validateRefreshToken from '../token_verification.js'
 

//async function validateRefreshToken(token) {
   // try {
   //       const userData = jwt.verify(token, key.TOKEN_KEY); //jwt-secret-key - ключ
  //        return userData;
  //    } catch (e) {
  //       return null;
  //    }
  //}



import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = "mongodb+srv://admindb:raCnxPTn9EhLL97X@cluster0.irluk.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


//router.post('/', passport.authenticate('jwt', {session: false}),(reg, res) => {

router.post('/', validateRefreshToken, async (reg, res) => {

    
    let bodys = "";
    let valueserv = []
    let tovar = ''
    
   // let myFirstPromise = new Promise((resolve, reject) => {
reg.on('data', async chunk => {
    bodys += chunk;
    //console.log(bodyr.toString())
    const obj = JSON.parse(bodys)
        
    //console.log("Ok vse")     
    //let myFirstPromise = new Promise((resolve, reject) => { 

    //for (let i = 0; i < obj.length; i++) {          
    //tovar = start(obj[i].name,obj[i].id)

//--ТОКЕН
//  const userData = await validateRefreshToken(obj.token)   
//    if (!userData) {
//        return res.status(401).json({message : 'Token is not correct'});
//    }
//--

  tovar = start(obj.name,obj.price, obj.url)              

    tovar.then((value) => {
      valueserv.push(value) 
      //console.log(value);
       // On 1C
      res.send(JSON.stringify(valueserv))
            
      //PROMISE                      
      });   
})


})




const start = async (name, price, url) => {

    try {
      
        await client.connect()
        //console.log('Соединение установлено') 
      
        //console.log(client)
        
        //await client.db("mongo").createCollection('users') 
        const users = client.db("test").collection('courses') 
        await users.insertOne({title: `${name}`, price: price, img: url}) 
        const user = await users.findOne({ title: `${name}`}) 
        //console.log(user)
        //console.log(typeof user)
        return user
    } catch(e) {
        console.log(e)
        return e
    } 
    } 


export default router