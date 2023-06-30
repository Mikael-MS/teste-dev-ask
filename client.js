const axios = require('axios');

(async () => {
    
    const dates = {
        "checkin": "2023-07-10",
        "checkout": "2023-07-15"
    }

    try {
        const response = await axios.post('http://localhost:8080/search', dates)
        console.log('Rooms: ', response.data)

    } catch (error) {
        console.log(error)
    }

})()