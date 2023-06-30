const axios = require('axios');

const dates = {
	"checkin": "2023-07-01", 
	"checkout": "2023-07-05"
}

axios.post('http://localhost:8080/search', dates)
    .then(response => {
        console.log('Rooms: ', response.data)
    })
    .catch(error => {
        console.log('Error: ', error)
    })
