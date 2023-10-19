const express = require('express');
const {handleGenerateNewShortURL , handleGetAnalytics , handleGenerateNewShortURLmanual} = require('../controllers/url');

const router = express.Router();

router.post("/", handleGenerateNewShortURL);
router.post("/urlmanual", handleGenerateNewShortURLmanual);

router.get('/analytics/:shortId' ,handleGetAnalytics );

module.exports = router;