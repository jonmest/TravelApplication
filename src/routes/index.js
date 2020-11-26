const express = require('express')
const controllers = require('../controllers')
const router = express.Router()

router.route('/plan/:id')
    .get(controllers.plan.getOnePlan)
    .put(controllers.plan.updateOnePlan)
    .delete(controllers.plan.deleteOnePlan)

router.route('/plan')
    .get(controllers.plan.getPlan)
    .post(controllers.plan.postPlan)

router.route('/experience')
    .get(controllers.experience.getExperience)
    .post(controllers.experience.postExperience)

router.route('/country')
    .get(controllers.country.getCountry)

module.exports = router