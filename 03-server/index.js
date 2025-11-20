const http = require("http");
// const fs = require("fs");
// const url = require("url");
const express = require("express");
/* const myServer = http.createServer((req, res) => {
    console.log("New Request received");// if you want to print all the meta info the write only "req" in console.log(req);
    res.end("Hello From Server..");
    
});

//create a port to listen
myServer.listen(8000, () => console.log("Server Started!.."));//gave a callback if everything runs fine then print it */

const app = express();

app.get("/",(req, res) => {
    return res.send("Hello from homepage");
})

app.get("/about",(req, res) => {
    // return res.send("Hello from about page" + "hey" + req.query.name);
    return res.send(`Hello from ${req.query.name}`);
})

app.listen(8000, () => console.log("Server Started!..at port 8000"));

// const myServer = http.createServer(app);

// function myHandler(req, res){

//         if (req.url === '/favicon.ico') return res.end();
//     const log = `${Date.now()}: ${req.method} ${req.url}New req received\n`
//     const myUrl = url.parse(req.url,true);//true is written to give query as object for every search
//     // console.log(myUrl);
    
    

//     fs.appendFile('log.txt',log, (err, data) => {
//         // res.end("Hello from server again!..")

//         switch(myUrl.pathname){
//             case "/": 
//                 res.end("Homepage");
//                 break;
//             case "/about":  
//                 // res.end("I am Arya");
//                 const username = myUrl.query.myname;
//                 res.end(`Hi ${username}`);
//                 break;
//             case "/search":
//                 const search = myUrl.query.search_query;
//                 res.end("Here are your results for "+search);
//             case "/signup":
//                 if (req.method === "GET") res.end("This is a Signup form")
//                 else if (req.method === "POST"){
//                     //DB Query
//                     res.end("Success");
//             }
//             default:res.end("404 not found!")
//         }
//     });
//     }



// myServer.listen(8000, () => console.log("Server Started!..at port 8000"));



