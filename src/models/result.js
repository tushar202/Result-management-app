const mongoose=require('mongoose')
const Student=require('../models/student')


const resultSchema=mongoose.Schema({
    exam:{
        type:String,
        trim:true,
        required:true
    },
    maths:{
        type:Number,
        min:0,
        max:100
    },
    chemisty:{
        type:Number,
        min:0,
        max:100
    },
    physics:{
        type:Number,
        min:0,
        max:100
    },
    cs:{
        type:Number,
        min:0,
        max:100
    },
    resultof:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Student'
    },
    createdby:{
        type:mongoose.Schema.Types.ObjectId
    }

})

const Result=mongoose.model('Result',resultSchema)

module.exports=Result
//to add a  result to a student use this route result/:id the  id  can be used to store the students id in the schema of  result 

