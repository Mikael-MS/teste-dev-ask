const moment = require('moment');

class ScraperPratagyBeach {

    static async scraperPratagyBeach(checkin, checkout, browser) {
        if(!browser) {
            return 'Browser has not been initialized!'
        }

        const page = await browser.newPage();
    
        if(moment().isAfter(checkin)) {
            return 'Checkin must be after the current date!'
        }

        if(moment(checkin).isAfter(checkout)) {
            return 'Checkout must be after the checkin date!'
        }
    
        const dateCheckin = moment(checkin).format('DD/MM/YYYY');
        const dateCheckout = moment(checkout).format('DD/MM/YYYY'); 
       
    
        const url = `https://pratagy.letsbook.com.br/D/Reserva?checkin=${dateCheckin}&checkout=${dateCheckout}&cidade=&hotel=12&adultos=2&criancas=&destino=Pratagy+Beach+Resort+All+Inclusive&promocode=&tarifa=&mesCalendario=6%2F14%2F2022`
    
        await page.goto(url);
      
        await page.waitForSelector('#tblAcomodacoes > tbody > tr.row-quarto');
    
        const roomData = await page.evaluate(() => {
            const elementsRooms = document.querySelectorAll('#tblAcomodacoes > tbody > tr.row-quarto');
    
            const roomInformation = [];
    
            for(const room of elementsRooms) {
    
                const nameElement = room.querySelector('td.tdQuarto > div > div.flex-table-row > span');
                const nameRoom = nameElement? nameElement.textContent: '';
                
    
                const descriptionElement = room.querySelector('td.tdQuarto > div > div.quartoContent > div > div > p');
                const descriptionRoom = descriptionElement? descriptionElement.textContent: '';
                
    
                const priceElement = room.querySelector('#tblCondicoes > tbody > tr > td.precoQuarto > div.relative > div.flex-price > span.valorFinal');
                const dailyPrice = priceElement? priceElement.textContent: '';
                
    
                const imagesElements = room.querySelector('td.tdQuarto > div > div.left-col > ul > div.slick-list.draggable > div > li.slick-slide.slick-current.slick-active > img');
                const imagesRoom = imagesElements? imagesElements.dataset.src: '';
                
    
                roomInformation.push({
                    "name": nameRoom,
                    "description": descriptionRoom,
                    "price": dailyPrice,
                    "image": imagesRoom
                });
    
            }
            return roomInformation
        });
        return roomData
    }

}

module.exports = ScraperPratagyBeach;
