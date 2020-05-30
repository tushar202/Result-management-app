//this app accepts the student name along wiith marks ,class, section and subject
//a  read command  throough which  user can  enter the data its builder will have 4 things 1.marks 2.class 3.section 4.subject
//a analysis  command whiich will have a builder in which user can enter 1  one   of the 3. values and  it will show its analysis
//a read  command which  will have  a  builder in which user can enter 1 of the 4 values and  app will display data matching that criteria
//a list commamnnd  which will dislpay name of all the students
//a delete command  which will delete the data of the  student user  asks

const mongodb=require('mongodb')
const MongoClient=mongodb.MongoClient

const yargs=require('yargs')
const chalk=require('chalk')

//------------------------------------||--------------------------------------------------------------------
//add commands

//add

const ObjectId=mongodb.ObjectID

const connectionURL='mongodb://127.0.0.1:27017'
const databaseName='result-app'

MongoClient.connect(connectionURL,{useUnifiedTopology:true}).then((result)=>{
    console.log('connected to database successfully');
    const db=result.db(databaseName)
    
yargs.command({
    command:'add',
    describe:'adds a new result',

    builder:{
        name:{
            describe:'name of the student',
            demandOption:true,
            type:String
        },
        marks:{
            describe:'marks of the student',
            demandOption:true,
            type:String
        },
        section:{
            describe:'section of the  respective',
            demandOption:true,
            type:String
        },
        subject:{
            describe:'subject of the student',
            demandOption:true,
            type:String
        }
    },
    handler:(argv)=>{
          db.collection('result').insertOne({name:argv.name,marks:argv.marks,section:argv.section,subject:argv.subject}).then((success)=>{
            console.log(success.ops);
            
        }).catch((error)=>{
            console.log(error);
            
        })
    }

})

//---------------------||-------------------------------------||----------------------------------------------
//analyse
yargs.command({
    command:'analyse',
    describe:'lets u analyse the result according to the field u want',

    builder:{
        field:{
            describe:'enter the field on the basis of which u want to do anaysis',
            demandOption:true,
            type:String,
        },

        fieldValue:{
            describe:'value of the field u have mentioned',
            demandOption:true,
            type:String
        }
    },
    handler:(argv)=>{

    

}
})

//----------------------------||----------------||----------------------------------------||----------------
//read
yargs.command({
    command:'read',
    describe:'Reads the data matching the name of student u entered',
    builder:{
        name:{
            describe:'The name of the student you want to read  the data of',
            demandOption:true,
            type:String
        }
},
    handler:(argv)=>{
    db.collection('result').find({name:argv.name}).toArray((error,doc)=>console.log(doc))
        
    
        
    

}
})


//----------------------------------------|\------------------------------|\----------------------------------------
//list
yargs.command({
    command:'list',
    describe:'lists the name of  all the student whose data is  entered',
    handler:()=>{

    }
})

//---------------------------------------||-------------------------------------------------------------------
//remove
yargs.command({
    command:'remove',
    describe:'remove the data of student you want',
    builder:{
        name:{
            demandOption:true,
            type:String
        }
    },
    handler:(argv)=>{
        db.collection('result').deleteOne({name:argv.name},(error,result)=>{
            console.log(result);
            
        })
        
    }
})

//--------------------------------------------|\-----------------|\------------------------------------------------
//analyise
//read
//list
//delete



yargs.parse()


}).catch((error)=>{
    console.log('unable to connect to database');
    console.log(error);

    
})