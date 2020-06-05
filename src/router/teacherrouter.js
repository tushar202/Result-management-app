const express=require('express')
const Teacher=require('../models/teacher.js')
const auth=require('../middleware/auth')
const router=new express.Router()



router.get("/teacher",auth,async(req,res)=>{
    console.log('ok');
    
   res.send(req.user)
})

router.post('/teacher',async(req,res)=>{
    const teacher=new Teacher(req.body)
    try
    {
         await  teacher.save()
         const token=await teacher.generateJwt()
         res.status(201).send({teacher,token});
    }catch(e){
         res.status(500).send()
        
    }
    
})


router.patch('/teacher',auth,async(req,res)=>{
    const fields=['name','email','password']
    const updateFields=Object.keys(req.body)
    const isValid=updateFields.every((field)=>fields.includes(field))
    if(!isValid)
    res.status(400).send('invalid operation')
    try{
    //const teacher= await Teacher.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
    const teacher=req.user
    updateFields.forEach((field)=>{
        teacher[field]=req.body[field]
    })
    await  teacher.save()
    res.send(teacher)
    
}
    catch(e){
        res.status(500).send(e)
    }

})

router.delete('/teacher',auth,async(req,res)=>{
    try{
    const teacher=await Teacher.findByIdAndDelete(req.user._id)
    res.send(teacher)
    }catch(e){
        res.status(500).send(e)
    }
})

router.post('/teacher/login',async(req,res)=>{
    try{
    const teacher=await Teacher.findOne({email:req.body.email})
    if(!teacher){
     res.status(400).send('no user exists with the email entered')
    console.log('no record found');
    }
    else{
    const teacher1=await teacher.checkPassword(req.body.password)
    const token=await teacher1.generateJwt()
    res.send({teacher1,token})
    }
    }
    catch(e){
        res.status(500).send('error')
    }

})

router.post('/teacher/logout',auth,async(req,res)=>{
    try{
        console.log(req.token);
        
        req.user.tokens=req.user.tokens.filter((token)=>{
            return token.token!==req.token
        })
        //console.log(req.user.tokens);
        
        await req.user.save()
        res.send(req.user)
    }catch(e){
        res.status(500).send()
    }
})
router.post('/teacher/logoutall',auth,async(req,res)=>{
    try{
        req.user.tokens=[]
        await req.user.save()
        res.send('logged out of all devices')
    }catch(e){
        res.status(500).send()
    }
})

module.exports=router