const  Student=require('../models/student')
const Teacher=require('../models/teacher')

const studentauth=async(req,res,next)=>{
    try{
    const student=await Student.findOne({createdby:req.user._id})
    console.log(student);
    
    if(!student){
        return res.status(403).send('not authorised to access this')
    }
    console.log('2');
    req.student=student

    
}catch(e){
    res.status(500).send()
}

next()

}
module.exports=studentauth