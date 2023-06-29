const express = require('express');
const router = express.Router();
const BrowserService = require('../services/BrowserService');


router.get('/', (req, res) => {
    req.
    res.send('Hello Mikael!');
});

//TODO implement endpoint here
router.post('/search', async (req, res) => {
    const checkin = req.body.checkin;
    const checkout = req.body.checkout;

    if(!checkin || !checkout) {
        res.status(400).send({error:'Missing checkin or checkout'})
        return
    }

    const browser = await BrowserService.getBrowser()

    const result = await BrowserService.scraperPratagyBeach(checkin, checkout, browser);
    
    BrowserService.closeBrowser(browser);

    res.status(200).send(result)
});

module.exports = router;
