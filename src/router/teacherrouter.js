const express=require('express')
const Teacher=require('../models/teacher.js')

const router=new express.Router()



router.get("/teacher",async(req,res)=>{
    try{
        const teacher=await Teacher.find({})
        res.send(teacher)
        
    }catch(e){
        res.send(500).send()
    }
})

router.post('/teacher',async(req,res)=>{
    const teacher=new Teacher(req.body)
    try
    {
         await  teacher.save()
         await teacher.generateJwt()
         res.send(teacher);
    }catch(e){
         res.status(500).send()
        
    }
    
})
router.get('/teacher/:id',async(req,res)=>{
    try{
        const teacher=await Teacher.findById(req.params.id)
        if(!teacher)
        return res.status(404).send('record not found on database')
        res.send(teacher)
    }catch(e){
        res.status(500).send()
    }
})

router.patch('/teacher/:id',async(req,res)=>{
    const fields=['name','email','password']
    const updateFields=Object.keys(req.body)
    const isValid=updateFields.every((field)=>fields.includes(field))
    if(!isValid)
    res.status(400).send('invalid operation')
    try{
    //const teacher= await Teacher.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
    const teacher=await Teacher.findById(req.params.id)
    if(!teacher)
    return res.status(404).send('no such record exists in database')
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

router.delete('/teacher/:id',async(req,res)=>{
    try{
    const teacher=await Teacher.findByIdAndDelete(req.params.id)
    if(!teacher)
    res.status(404).send('not record in database')
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
    await teacher1.generateJwt()
    res.send(teacher1)
    }
    }
    catch(e){
        res.status(500).send('error')
    }

})

module.exports=router