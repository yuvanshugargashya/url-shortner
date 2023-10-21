const shortid = require("shortid");
const URL = require('../models/url');

async function handleGenerateNewShortURL(req , res){
    const body = req.body;
    if(!body.url) return res.status(400).json({error: 'url is required'});
    const shortID = shortid();
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
        createdBy: req.user._id,
    });

    return res.render("home" , {
        id: shortID,
    });

    



}

//
async function handleGenerateNewShortURLmanual(req , res){
    try{
    const body = req.body;
    if(!body.url) return res.status(400).json({error: 'url is required'});
    
    const isexi2 = await URL.findOne({shortId: req.body.shortId});
    if(isexi2){
        throw new Error('already there');
    }
    

    
    await URL.create({
        shortId: body.myid,
        redirectURL: body.url,
        visitHistory: [],
        createdBy: req.user._id,
    });

    return res.render("home" , {
        id: req.body.myid,
    })
}

    catch(error){
        return res.status(500).json(error.message)
    }

    



}
async function handleGetAnalytics(req , res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    return res.json({ totalClicks:result.visitHistory.length , analytics: result.visitHistory,});
}
module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
    handleGenerateNewShortURLmanual,

};