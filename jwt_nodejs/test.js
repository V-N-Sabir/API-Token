import mongoose from 'mongoose'
import express from  'express'
const app = express()


const PORT =  3000


async function start() {
    try {
      const url = `mongodb+srv://admindb:raCnxPTn9EhLL97X@cluster0.irluk.mongodb.net/?retryWrites=true&w=majority`
      await mongoose.connect(url, {useNewUrlParser: true})
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
      })
    } catch (e) {
      console.log(e)
    }
  }
  
  start()