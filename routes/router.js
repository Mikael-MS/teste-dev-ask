const express = require('express');
const router = express.Router();
const BrowserService = require('../services/BrowserService');
const ScraperPratagyBeach = require('../services/ScraperService');


router.get('/', (req, res) => {
    res.send('Thank you Asksuit!');
});


router.post('/search', async (req, res) => {
    const checkin = req.body.checkin;
    const checkout = req.body.checkout;

    if(!checkin){
        res.status(400).send({error:'Checkin date not found!'})
        return
    }

    if(!checkout) {
        res.status(400).send({error:'Checkout date not found!'})
        return
    }

    const browser = await BrowserService.getBrowser()

    const rooms = await ScraperPratagyBeach.scraperPratagyBeach(checkin, checkout, browser);
    
    BrowserService.closeBrowser(browser);

    res.status(200).send(rooms)
});

module.exports = router;
