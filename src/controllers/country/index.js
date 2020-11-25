const pool = require('../../db/')

const getCountry = async (req, res) => {
    const allCountries = await pool.query("SELECT * FROM country").then(res => res.rows)
    res.json(allCountries)
}

module.exports = {
    getCountry
}