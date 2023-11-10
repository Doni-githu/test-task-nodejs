const axios = require('axios')
module.exports = async function (data) {
    try {
        await axios.post('http://localhost:8080/api/history/create', data)
    } catch (error) {
        console.log(error)
    }
}