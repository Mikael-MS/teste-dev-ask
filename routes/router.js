const express = require('express');
const router = express.Router();
const BrowserService = require('../services/BrowserService');
const pup = require('puppeteer');
const moment = require('moment');


router.get('/', (req, res) => {
    res.send('Hello Mikael!');
});



//TODO implement endpoint here
router.post('/search', (req, res) => {
    console.log(req.body);
    const checkin = req.body.checkin;
    const checkout = req.body.checkout;

    console.log(checkin);
    console.log(checkout);

    

    return res.send(result)
});

async function  scraperPratagyBeach(checkin, checkout) {
    const browser = await pup.launch({headless: false});
    const page = await browser.newPage();

    if(moment().isAfter(checkin) || moment(checkin).isAfter(checkout)) {
        return 'Invalid checkin or checkout'
    }

    const dateCheckin = moment(checkin).format('DD-MM-YYYY');
    const dateCheckout = moment(checkout).format('DD-MM-YYYY');

    const url = `https://pratagy.letsbook.com.br/D/Reserva?checkin=29%2F06%2F2023&checkout=01%2F07%2F2023&cidade=&hotel=12&adultos=2&criancas=&destino=Pratagy+Beach+Resort+All+Inclusive&promocode=&tarifa=&mesCalendario=6%2F14%2F2022`

    await page.goto(url);
    await page.setViewport({
        width: 1400,
        height: 1600
    });

    await page.waitForSelector('#tblAcomodacoes > tbody > tr.row-quarto');

    const roomData = await page.evaluate(() => {
        const rooms = document.querySelectorAll('#tblAcomodacoes > tbody > tr.row-quarto');

        const roomIformation = [];

        for(const room of rooms) {

            const name = room.querySelector('td.tdQuarto > div > div.flex-table-row > span');
            const nameRoom = name? name.textContent: '';
            

            const description = room.querySelector('td.tdQuarto > div > div.quartoContent > div > div > p');
            const descriptionRoom = description? description.textContent: '';
            

            const price = room.querySelector('#tblCondicoes > tbody > tr > td.precoQuarto > div.relative > div.flex-price > span.valorFinal');
            const dailyPrice = price? price.textContent: '';
            

            const images = room.querySelector('td.tdQuarto > div > div.left-col > ul > div.slick-list.draggable > div > li.slick-slide.slick-current.slick-active > img');
            const imageRoom = images? images.dataset.src: '';
            

            roomIformation.push({
                "name": nameRoom,
                "description": descriptionRoom,
                "price": dailyPrice,
                "image": imageRoom
            });

        }

        return roomIformation 
    })


    // await browser.close();
    
}

scraperPratagyBeach()

module.exports = router;
