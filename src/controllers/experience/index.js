const pool = require('../../db/')

const getExperience = async (req, res) => {
    const allExperiences = (req.query.country) ?
        await pool.query("SELECT * FROM (experience INNER JOIN plan ON (experience.plan = plan.id)) AS z WHERE z.country = $1", [req.query.country]).then(res => res.rows) :
        await pool.query("SELECT * FROM experience").then(res => res.rows)
    res.json(allExperiences)
}

const postExperience = async (req, res) => {
    const { title, description, start_datetime, end_datetime, plan } = req.body
    pool.query(
        "INSERT INTO experience(start_datetime, end_datetime, title, description, plan) VALUES ($1, $2, $3, $4, (SELECT id FROM plan WHERE id = $5)) ON CONFLICT DO NOTHING",
        [start_datetime, end_datetime, title, description, plan]
    )
    res.json({ success: true })
}

module.exports = {
    getExperience,
    postExperience
}