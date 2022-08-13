import http from 'http'
//const path = require('path')
//const fs = require('fs')

import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = "mongodb+srv://admindb:raCnxPTn9EhLL97X@cluster0.irluk.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    })

    if (req.url === '/') {
      fs.readFile(
        path.join(__dirname, 'views', 'index.html'),
        'utf-8',
        (err, content) => {
          if (err) {
            throw err
          }

          res.end(content)
        }
      )
    } else if (req.url === '/about') {
      fs.readFile(
        path.join(__dirname, 'views', 'about.html'),
        'utf-8',
        (err, content) => {
          if (err) {
            throw err
          }

          res.end(content)
        }
      )
    } } else if (req.method === 'POST') {
  
    //+++++++++++++++++++
    if (req.url === '/api/users') {
        res.writeHead(200, {
          'Content-Type': 'text/json'
        })
         
    
        //++
        let bodys = "";
        let valueserv = []
        let tovar = ''
        
       // let myFirstPromise = new Promise((resolve, reject) => {
    req.on('data', chunk => {
    bodys += chunk;
    //console.log(bodyr.toString())
    const obj = JSON.parse(bodys)
            
         
    //let myFirstPromise = new Promise((resolve, reject) => { 

//for (let i = 0; i < obj.length; i++) {          
      //tovar = start(obj[i].name,obj[i].id)
      tovar = start(obj.name,obj.id)              
  //let myFirstPromise = new Promise((resolve, reject) => { 
        tovar.then((value) => {
          valueserv.push(value) 
          //console.log(value);
           // On 1C
          res.end(JSON.stringify(valueserv))
                
          //PROMISE                      
          });
     // resolve(valueserv);
  //});       
//CIKL  
// } 
 //req.on(    
  })
 // myFirstPromise.then((valueserv) => {
 // console.log("Ура! ");
 //res.end(JSON.stringify(valueserv))
 // })    
   

   
//myFirstPromise.then((valueserv) => {    
//console.log("Ура! ");
//res.end(JSON.stringify(valueserv))
//})
 
//+++++++++++++++++++++++++++++++++  





    } else if (req.url === '/api/orders'){

    const body = []
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    })
            }
    
    //req.on('data', data => {
      //body.push(Buffer.from(data))
   // })

    //req.on('end', () => {
      //const message = body.toString().split('=')[1]

      //res.end(`
        //<h1>Ваше сообщение: ${message}</h1>
      //`)
    //})
  }
})

server.listen(3000, () => {
  console.log('Server is running...')
})



const start = async (name, age) => {

  try {
    
      await client.connect()
      console.log('Соединение установлено') 
    
      //console.log(client)
      
      //await client.db("mongo").createCollection('users') 
      const users = client.db("mongo").collection('users') 
      await users.insertOne({name: `${name}`, age: age}) 
      const user = await users.findOne({ name: `${name}`}) 
      //console.log(user)
      //console.log(typeof user)
      return user
  } catch(e) {
      console.log(e)
      return e
  } 
  } 

  //start()