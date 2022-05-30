const express = require('express');
const users = require('./users')
const app = express()

app.use(express.json())

app.get("/", (req,res)=>{
    res.send("Home Page");
})

app.get("/users",(req,res)=>{
    res.send(users);
})


app.get('/users/:id',(req,res)=>{
    const id=req.params.id;
    const user_data=users.find((user)=>user.id==id);
    if(!user_data){
        res.status(404)
        res.send('User Not Found')
    }
    else{
        // console.log(user_data)
        res.send(user_data)
    }
})

app.post("/users",(req,res)=>{
    const user = {
        id : users.length + 1,
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        email : req.body.email,
        gender : req.body.gender
    }
    users.push(user)
    res.send(user)
})

app.put("/users/:id",(req,res)=>{
    const id = req.params.id;
    console.log(id)
    
    const first_name = req.body.first_name
    const last_name = req.body.last_name
    const email = req.body.email
    const gender = req.body.gender
    
    const index = users.findIndex((users)=>{
        return (users.id == parseInt(id))
    })

    if(index > 0){
        let mod_user = users[index]
        mod_user.first_name = first_name
        mod_user.last_name = last_name
        mod_user.email = email
        mod_user.gender = gender
        res.send(mod_user)
    }else{
        res.status(404)
        res.end()
    }
}) 


app.delete("/users/:id",(req,res)=>{
    const id = req.params.id;
    const index = users.findIndex((users)=>{
        return (users.id == parseInt(id))
    })
    if(index > 0){
        const del_user = users[index]
        users.splice(index,1)
        res.send(del_user)
    }
    else{
        res.status(404)
        res.end()
    }

})

app.listen(3000, ()=>{
    console.log('Listening on port 3000')
})

