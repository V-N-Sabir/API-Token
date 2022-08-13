import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = "mongodb+srv://admindb:raCnxPTn9EhLL97X@cluster0.irluk.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



const start = async () => {

    try {
        await client.connect()
        console.log('Соединение установлено') 
        //console.log(client)
        
        //await client.db("mongo").createCollection('users') 
        const users = client.db("mongo").collection('users') 
        await users.insertOne({name: "Sabir", age: 33}) 
        const user = await users.findOne({ name: 'Sabir'}) 
        console.log(user)
    } catch(e) {
        console.log(e)
    } 
    } 
    
    start() 




