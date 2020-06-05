const Result=require('../models/result')
const Student=require('../models/student')
const mongoose=require('mongoose')
const express=require('express')
const router=new express.Router()
const auth=require('../middleware/auth')
const studentauth=require('../middleware/studentauth')

router.post('/result/:id',auth,studentauth,async(req,res)=>{
    const result=new Result({
        ...req.body,
        resultof:req.params.id,
        createdby:req.user._id
    })
    console.log(result);
    
    try{
        await result.save()
        res.status(201).send(result)
    }catch(e){
        res.status(500).send()
    }
})

router.get('/result/:id',auth,studentauth,async(req,res)=>{
    try{
    //he could not access the result of the person he didnt created
    //const student=await Student.find({createdby:req.user._id})
    
    const  result=await Result.find({resultof:req.params.id})
    if(!result)
    return res.send(404).send('wrond data provided')
    //result.populate('resultof').execPopulate()
    const  student=await Student.findById(req.params.id)

    res.send({result,student})
    }catch(e){
        res.status(500).send()
    }
})

router.get('/result/:id/exam/:exam',auth,studentauth,async(req,res)=>{
    try{
    const result=await Result.findOne({exam:req.params.exam,resultof:req.params.id})
    if(!result){
        return res.status(404).send('sorry we could not retiv')
    }
    const student=req.student
    res.send({result,student})
}
catch(e){
    res.status(500).send()
}})

router.get('/exam/:exam',auth,async(req,res)=>{
    try{
        const result=await Result.find({exam:req.params.exam,createdby:req.user._id})
        // if(result.length()===0){
        //     res.status(404).send()
        // }else{
        //     res.send(result)
        // }
        res.send(result)

    }
catch(e){
    res.status(500).send()
}})

// router.get('/result/:id',auth,async()=>{

// }
module.exports=router

//sem1-s1