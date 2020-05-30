const mongodb=require('mongodb')
const MongoClient=mongodb.MongoClient
const ObjectId=mongodb.ObjectID

const connectionURL='mongodb://127.0.0.1:27017'
const databaseName='result-app'

let addData=(name,marks,section,subject)
MongoClient.connect(connectionURL,{useUnifiedTopology:true}).then((result)=>{
    console.log('connected to database successfully');
    const db=result.db(databaseName)
    addData=(name,marks,section,subject)=>{
        db.collection('result').insertOne({name:name,marks:marks,section:section,subject:subject}).then((success)=>{
            console.log(success.ops);
            
        }).catch((error)=>{
            console.log(error);
            
        })
        
    }


}).catch((error)=>{
    console.log('unable to connect to database');
    console.log(error);

    
})

module.exports={
    addData:addData
}