//this app accepts the student name along wiith marks ,class, section and subject
//a  read command  throough which  user can  enter the data its builder will have 4 things 1.marks 2.class 3.section 4.subject
//a analysis  command whiich will have a builder in which user can enter 1  one   of the 3. values and  it will show its analysis
//a read  command which  will have  a  builder in which user can enter 1 of the 4 values and  app will display data matching that criteria
//a list commamnnd  which will dislpay name of all the students
//a delete command  which will delete the data of the  student user  asks


//teacher could login ,logout.He has to be  loggedin to perform tasks.make student profiles and store their results
const express=require('express')
require('./db/mongoose.js')
const  teacherRouter=require('./router/teacherrouter.js')
const studentRouter=require('./router/studentrouter')
const  jwt=require('jsonwebtoken')
const resultRouter=require('./router/resultrouter')
const  app=express()



app.use(express.json())

app.use(resultRouter)
app.use(teacherRouter)
app.use(studentRouter)

const fun=async()=>{
const token=await jwt.sign({_id:'5ed8bbd672180e270ceabec3'},'secret')
const  decoded=await jwt.verify(token,'secret')
console.log(decoded);
}
fun()

app.listen('3000',()=>{
    console.log('server is running');
}    
)