const express = require("express");
const path = require('path')
const { connectToMongoDB } = require("./connect");
const urlRouter = require('./routes/url');
const staticRoute = require("./routes/staticRouter");
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
app.use(express.urlencoded({extended: false}));


/* app.get("/test", async (req, res) => {
    const allUrls = await URL.find({});
    return res.render('home',{
        urls: allUrls,
    });
}); */

// mount the url router
app.use("/url", urlRouter);

app.use("/",staticRoute);

app.get(['/:shortId', '/url/:shortId'], async (req, res) => {
    const shortId = req.params.shortId;
    const updated = await URL.findOneAndUpdate(
        { shortId },
        { $push: { visitHistory: { timestamp: Date.now() } } },
        { new: true }
    );
    if (!updated) {
        return res.status(404).send('Short URL not found');
    }
    return res.redirect(updated.redirectURL);
});


app.listen(PORT, () => 
    console.log(`Server started at port : ${PORT}`)  //converted to string literals   
)