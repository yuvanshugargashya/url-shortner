const express = require("express");
const path = require('path');
const {connectToMongoDB} = require('./connect');
const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticRouter');
const URL = require('./models/url');
const app = express();
const port = 8001;

connectToMongoDB('mongodb+srv://yuvanshugargashya:%40Smileyuvi52@cluster0.3i4nmkr.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp').then( ()=> //mongodb://localhost:27017/shorturl
console.log("mongodb connected"));

app.set("view engine", "ejs");
app.set("views" , path.resolve("./views"));




app.use(express.json());
app.use(express.urlencoded({ extended: false}));






app.use('/url' , urlRoute);
app.use('/' , staticRoute);
app.get('/:shortId' , async (req, res) =>{
    const shortId = req.params.shortId;

    const entry = await URL.findOneAndUpdate({
        shortId 
    }, {$push: {
        visitHistory: {
            timestamp: Date.now(),
        },
    },
});

res.redirect(entry.redirectURL);

})




app.listen(port , ()=> console.log(`server started on port: ${port}`));
