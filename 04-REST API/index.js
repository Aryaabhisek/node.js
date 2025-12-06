const express = require('express');
// const users = require('./MOCK_DATA.json');
const app = express();
const fs = require('fs');
// const mongoose = require('mongoose');
const {connectMongoDb} = require('./connection')

const userRouter = require('./routes/user')
const {logReqRes} = require("./middlewares/index")

const { log } = require('console');
const PORT = 8000;


//connection 
connectMongoDb("mongodb://127.0.0.1:27017/New-Demo").then(() => 
    console.log("MongoDB Connected")
);
/* mongoose.connect('mongodb://127.0.0.1:27017/New-Demo')
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log("Mongo Error",err)); */



//Schema
/* const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    jobTitle:{
        type:String,
    },
    gender:{
        type:String,
    }
}, { timestamps: true }); */

//Model
/* const User = mongoose.model('user',userSchema) */




//Middleware
app.use(express.urlencoded({extended:false}));

app.use(logReqRes("log.txt"));
/*     fs.appendFile(
        "log.txt",
        `${Date.now()}:${req.ip} ${req.method}: ${req.path}\n`,
        (err, data) => {
            next();
        }
    )
    console.log("Hello from middleware 1");
    next()
})

app.use((req,res,next) => {
    console.log("Hello from middleware 2");
    next()
}) */

//Routes
/* app.get("/users", async(req, res) => {
    const allDbUsers = await User.find({});
    const html = `
        <ul>
            ${allDbUsers.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join('')}
        </ul>
        `;
    res.send(html);
});


//REST API

app.get("/api/users",async (req, res) => {
    //res.setHeader("MyName","Arya");  //custom headers
    const allDbUsers = await User.find({});
    return res.json(allDbUsers);
})

app.get("/api/users/:id",async (req, res) => {
    const user = await User.findById(req.params.id)
    if(!user) return res.status(404).json({error: 'User not found'})
    return res.json(user);
})


app.post("/api/users", async(req, res) =>{
    //create new user
    const body = req.body;
    if (!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title){
        return res.status(400).json({msg: "All fields are required"})
    }

    const result = await User.create({
        firstName:body.first_name,
        lastName:body.last_name,
        email:body.email,
        gender:body.gender,
        jobTitle:body.job_title,

    });

    console.log("Result:",result);
    

    return res.status(201).json({msg: "Success"})

    // console.log("body",body);
    // users.push({...body,id: users.length + 1});
    // fs.writeFile("MOCK_DATA.json",JSON.stringify(users), (err, data) => {
    // return res.status(201).json({status: "Success",id: users.length + 1});

    // })
    
})

app.patch("/api/users/:id",async (req, res) =>{
    //edit a user with id
    await User.findByIdAndUpdate(req.params.id, {lastName:"Khalid"});
    return res.json({status: "Success"});
})


app.delete("/api/users/:id",async (req, res) =>{
    //delete a user with id
    await User.findByIdAndDelete(req.params.id);
    return res.json({status: "Success"});
})
 */


app.use("/api/user", userRouter);

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));

