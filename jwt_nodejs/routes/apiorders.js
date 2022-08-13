import {Router} from 'express'
const router = Router()
import Order from '../models/order.js'
//import jwt from 'jsonwebtoken'
//import key from '../keys/keys.dev.js'

import validateRefreshToken from '../token_verification.js'
 
//++++++++++++++++++
 //async function validateRefreshToken(token) {
//      try {
//            const userData = jwt.verify(token, key.TOKEN_KEY); //jwt-secret-key - ключ
//            return userData;
//        } catch (e) {
//           return null;
//        }
//    }

//++++++++++++++

//passport.authenticate('dev-jwt', {session: false}),
router.post('/', validateRefreshToken, async (reg, res) => {
    let orders = ''
    let bodys = ''

    


    reg.on('data', async chunk => {
        bodys += chunk;
        //console.log(bodyr.toString())
        const obj = JSON.parse(bodys)
        
        //+++
        //const userData = await validateRefreshToken(obj.token)
       
        //if (!userData) {
        //    return res.status(401).json({message : 'Token is not correct'});
        //}
        //-----

        //console.log(`это obj - ${typeof obj}`)
        let date = new Date(obj.data);
        const valueorder =  ordersap(date)
       
        let valueserv = []
        valueorder.then((value) => {
            valueserv.push(value) 
            //console.log(value);
             // On 1C
            res.send(JSON.stringify(valueserv))
                  
            //PROMISE                      
            });  
        //$gt -  Больше чем.//$gte - Больше или равно.//$ne - НЕ

        //.populate('user.userId') //{'user.userId': req.user._id}
       // 
        //console.log(orders)    
          
    })

    // On 1C    
    //res.send(JSON.stringify(valueorder))

    async function ordersap (date) {
        //let date = obj
        // let date = new Date(obj);
        //let date = new Date('2022-08-02');//T06:50
        orders = await Order.find({date: {$gt:date}})
       
        return orders
    }


})




export default router