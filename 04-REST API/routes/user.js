const express = require('express');
const router = express.Router();

// router.get("/", async(req, res) => {
//     const allDbUsers = await User.find({});
//     const html = `
//         <ul>
//             ${allDbUsers.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join('')}
//         </ul>
//         `;
//     res.send(html);
// });


//REST API

router.get("/",async (req, res) => {
    //res.setHeader("MyName","Arya");  //custom headers
    const allDbUsers = await User.find({});
    return res.json(allDbUsers);
})

router.get("/:id",async (req, res) => {
    const user = await User.findById(req.params.id)
    if(!user) return res.status(404).json({error: 'User not found'})
    return res.json(user);
})


router.post("/", async(req, res) =>{
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

router.patch("/api/users/:id",async (req, res) =>{
    //edit a user with id
    await User.findByIdAndUpdate(req.params.id, {lastName:"Khalid"});
    return res.json({status: "Success"});
})


router.delete("/api/users/:id",async (req, res) =>{
    //delete a user with id
    await User.findByIdAndDelete(req.params.id);
    return res.json({status: "Success"});
})


module.exports = router;