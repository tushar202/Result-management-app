const express=require('express')
const Student=require('../models/student.js')

const router=new express.Router()


router.post('/student',async(req,res)=>{
    const student=new Student(req.body)
    try{
        await student.save()
        res.send(student)        
    }catch(e){
        res.status(500).send()
    }
})

router.get('/student',async(req,res)=>{
    try{
    const students=await Student.find({})
    res.send(students)
    }
    catch(e){
        res.status(500).send()
    }
})

router.get('/student/:id',async(req,res)=>{
    try{
        const student=await Student.findById(req.params.id)
        if(!student)
        return res.status(404).send('record not found on database')
        res.send(student)
    }catch(e){
        res.status(500).send()
    }
})
router.patch('/student/:id',async(req,res)=>{
    const fields=['name','class','section','email']
    const updateFields=Object.keys(req.body)
    const isValid=updateFields.every((field)=>fields.includes(field))
    if(!isValid)
    res.status(400).send('invalid operation')
    try{
    const student=await Student.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
    if(!student)
    return res.status(404).send('no such record exists in database')
    res.send(student)
    }catch(e){
        res.status(500).send(e)
    }

})

router.delete('/student/:id',async(req,res)=>{
    try{
    const student=await Student.findByIdAndDelete(req.params.id)
    if(!student)
    res.status(404).send('not record in database')
    res.send(student)
    }catch(e){
        res.status(500).send(e)
    }
})

module.exports=router


