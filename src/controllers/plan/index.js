const pool = require('../../db/')
const Plan = require('../../models/Plan')

const _queryStringBuilder = items => {
    let str = ""
    let index = 0
    items.map((item, i) => {
        if (i == 0) str += `${item} = $${i + 1}`
        else str += `, ${item} = $${i + 1}`
        index = i + 1;
    })
    return [str, index]
}

const queryFactory = obj => {
    const keys = []
    const values = []

    for (const key in obj) {
        if (obj[key]) {
            keys.push(key);
            values.push(obj[key])
        }
    }
    const [query, count] = _queryStringBuilder(keys)
    return [query, values, count]
}

const getPlan = async (req, res) => {
    const allPlans = (req.query.country) ?
        await pool.query('SELECT * FROM detailed_plan WHERE (country = $1 OR name LIKE $2)', [req.query.country.toUpperCase(), "%" + req.query.country + "%"]) :
        await pool.query('SELECT * FROM detailed_plan')

    const count = (req.query.country) ?
        await pool.query('SELECT COUNT(*) FROM detailed_plan WHERE (country = $1 OR name LIKE $2)', [req.query.country.toUpperCase(), "%" + req.query.country + "%"])
            .then(res => res.rows[0].count) :
        await pool.query('SELECT COUNT(*) FROM detailed_plan').then(res => res.rows[0].count)

    const plans = []
    for (const plan of allPlans.rows) {
        const planExperiences = await pool.query('SELECT * FROM experience WHERE (plan = $1)', [plan.id]).then(res => res.rows)
        plan.experiences = planExperiences
        plans.push(plan)
    }

    res.json({ plans, count })
}

const postPlan = async (req, res) => {
    const plan = new Plan(req.body)
    const planID = await pool.query(
        "INSERT INTO plan (location, country, start_date, end_date, title, description) VALUES ($1, $2, $3, $4, $5, $6)",
        [plan.location, plan.country, plan.start_date, plan.end_date, plan.title, plan.description]
    ).then(async () => {
        return pool.query("SELECT currval(pg_get_serial_sequence('plan','id'))")
    }).then(res => res.rows[0].currval)

    for (const experience of plan.experiences) {
        pool.query(
            "INSERT INTO experience(start_datetime, end_datetime, title, description, plan) VALUES ($1, $2, $3, $4, (SELECT id FROM plan WHERE id = $5)) ON CONFLICT DO NOTHING",
            [experience.start_datetime, experience.end_datetime, experience.title, experience.description, planID]
        )
    }
    res.json({
        success: true
    })
}

const getOnePlan = async (req, res) => {
    const {
        id
    } = req.params
    const plan = await pool.query("SELECT * FROM plan WHERE id = $1", [id]).then(res => res.rows[0])
    res.json(plan)
}

const updateOnePlan = async (req, res) => {
    const {
        id
    } = req.params
    const updatedPlan = new Plan(req.body)

    const [partialQuery, queryValues, argumentCount] = queryFactory({
        title: updatedPlan.title,
        country: updatedPlan.country,
        start_date: updatedPlan.start_date,
        end_date: updatedPlan.end_date,
        location: updatedPlan.location,
        description: updatedPlan.description
    })

    queryValues.push(id)
    const finalQuery = `UPDATE plan SET ${partialQuery} WHERE id = $${argumentCount + 1}`
    console.log(finalQuery)
    console.log(queryValues)
    await pool.query(finalQuery, queryValues)

    if (Array.isArray(updatedPlan.experiences)) {
        for (const experience of updatedPlan.experiences) {
            const [expPartialQuery, expQueryValues, expArgumentCount] = queryFactory({
                title: experience.title,
                start_datetime: experience.start_datetime,
                end_datetime: experience.end_datetime,
                description: experience.description
            })

            expQueryValues.push(experience.id)
            const expFinalQuery = `UPDATE experience SET ${expPartialQuery} WHERE id = $${expArgumentCount + 1}`
            await pool.query(expFinalQuery, expQueryValues)
        }
    }

    res.json({
        success: true
    })
}



const deleteOnePlan = async (req, res) => {
    const {
        id
    } = req.params
    await pool.query("DELETE FROM plan WHERE id = $1", [id])
    res.json({
        "success": true
    })
}


module.exports = {
    getPlan,
    postPlan,
    getOnePlan,
    updateOnePlan,
    deleteOnePlan
}