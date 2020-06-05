const express=require('express')
const Student=require('../models/student.js')
const auth=require('../middleware/auth')
const router=new express.Router()


router.post('/student',auth,async(req,res)=>{
    const student=new Student({
        ...req.body,
        createdby:req.user._id
    })
    try{
        await student.save()
        res.status(201).send(student)        
    }catch(e){
        res.status(500).send()
    }
})

router.get('/student',auth,async(req,res)=>{
    try{
    const students=await Student.find({createdby:req.user._id})
    res.send(students)
    }
    catch(e){
        res.status(500).send()
    }
})

router.get('/student/:id',auth,async(req,res)=>{
    try{
        const student=await Student.findOne({_id:req.params.id,createdby:req.user._id})
        if(!student)
        return res.status(404).send('record not found on database')
        res.send(student)
    }catch(e){
        res.status(500).send()
    }
})
router.patch('/student/:id',auth,async(req,res)=>{
    const fields=['name','class','section','email']
    const updateFields=Object.keys(req.body)
    const isValid=updateFields.every((field)=>fields.includes(field))
    if(!isValid)
    res.status(400).send('invalid operation')
    try{
    const student=await Student.findOneAndUpdate({_id:req.params.id,createdby:req.user._id},req.body,{new:true,runValidators:true})
    if(!student)
    return res.status(404).send('no such record exists in database')
    res.send(student)
    }catch(e){
        res.status(500).send(e)
    }

})

router.delete('/student/:id',auth,async(req,res)=>{
    try{
    const student=await Student.findOneAndDelete({_id:req.params.id,createdby:req.user._id})
    if(!student)
    res.status(404).send('not record in database')
    res.send(student)
    }catch(e){
        res.status(500).send(e)
    }
})

module.exports=router


