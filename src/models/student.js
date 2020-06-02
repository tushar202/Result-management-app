const mongoose=require('mongoose')
const validator=require('validator')

const Student=mongoose.model('Student',{
    name:{
        type:String,
        required:true,

    },
    class:{
        type:String,
        required:true
    },
   
    section:{
        type:String
        
    },
    email:{
        type:String,
        trim:true,
        validate(value){
            if(!validator.isEmail(value))
            throw new Error('the email entered is incorrect')
        }
    }
})

module.exports=Student