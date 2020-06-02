const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const teacherSchema=mongoose.Schema(
    {
        name:{
            type:String,
            required:true
    
        },
        email:{
            type:String,
            trim:true,
            unique:true,
            validate(value)
            {
                if(!validator.isEmail(value))
                    throw new Error('please enter a correct  email')    
            }
        },
        password:{
            type:String,
            required:true
        },
        tokens:[{
            token:{
                type:String,
                required:true
            }
        }

        ]
    })
    
teacherSchema.methods.generateJwt=async function(){
    const teacher=this
    console.log(teacher);
    
    const token=await jwt.sign({_id:teacher._id.toString()},'secret')
    teacher.tokens=teacher.tokens.concat({token:token})
    await teacher.save()
    console.log(token);
}


teacherSchema.methods.checkPassword=async function(inputPassword){
    const teacher =this
    const isMatching= await bcrypt.compare(inputPassword,teacher.password)
    if(isMatching)
    return teacher
    throw new Error('incorrect  password')

}

teacherSchema.pre('save',async function(next){
    const  teacher=this
    console.log("reached here");
    
    if(teacher.isModified('password')){
        teacher.password= await bcrypt.hash(teacher.password,8)
    }
        next()
})

const Teacher=mongoose.model('Teacher',teacherSchema)
module.exports=Teacher