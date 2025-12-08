const express = require("express");
const path = require('path')
const { connectToMongoDB } = require("./connect");
const urlRouter = require('./routes/url');
const URL = require("./models/url");
const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://localhost:27017/short-url")
.then(() => console.log("MongoDB Connected...")
);


app.set("view engine", "ejs");
app.set('views', path.resolve("./views"));


// parse JSON bodies
app.use(express.json());


app.get("/test", async (req, res) => {
    const allUrls = await URL.find({});
    return res.render('home',{
        urls: allUrls,
    });
});

// mount the url router
app.use("/url", urlRouter);

app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
    {
        shortId
    }, 
    {
        $push: {
        visitHistory: {
            timestamp: Date.now(),
        },
    },
    }
);
res.redirect(entry.redirectURL);
});


app.listen(PORT, () => 
    console.log(`Server started at port : ${PORT}`)  //converted to string literals   
)