const fs = require("fs");


//Sync
fs.writeFileSync("./test.txt","This is ex of sync");


//Async
fs.writeFile("./test2.txt","This is async",(err) => {}) 


//Sync
// const result = fs.readFileSync("./contacts.txt","utf-8")
// console.log(result);

//Async
fs.readFile("./contacts.txt","utf-8",(err,result) =>{
    if (err){
        console.log("Error",err)
    }
    else{
        console.log(result);
        
    }
})


fs.appendFileSync("./contacts.txt",`Bapun : +91 7873446009\n`)