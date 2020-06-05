const jwt=require('jsonwebtoken')
const Teacher=require('../models/teacher')

const  auth=async (req,res,next)=>{
    try{
        const token=req.header('Authorization').replace('Bearer ','')
        const decoded= await jwt.verify(token,'secret')
        //console.log(decoded);
        
        const user=await  Teacher.findOne({_id:decoded._id,'tokens.token':token})
        if(!user)
        throw new  Error('not ')
        req.user=user
        req.token=token
        console.log('1');
        

    }catch(e){
        res.status(403).send()
    }

    next()
}

module.exports=auth