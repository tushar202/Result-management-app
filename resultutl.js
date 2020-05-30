

const addData(name,marks,section,subject)=>{
    db.collection('result').insertOne({name:name,marks:marks,section:section,subject:subject}).then((success)=>{
        console.log(success.ops);
        
    }).catch((error)=>{
        console.log(error);
        
    })
    
}