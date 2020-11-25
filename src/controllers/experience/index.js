const pool = require('../../db/')

const getExperience = async (req, res) => {
    const allExperiences = (req.query.country) ?
        await pool.query("SELECT * FROM (experience INNER JOIN plan ON (experience.plan = plan.id)) AS z WHERE z.country = $1", [req.query.country]).then(res => res.rows) :
        await pool.query("SELECT * FROM experience").then(res => res.rows)
    res.json(allExperiences)
}

module.exports = {
    getExperience
}