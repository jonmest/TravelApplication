const Experience = require("./Experience")

class Plan {
    constructor({
        country, location, title, start_date, end_date, description, experiences
    }) {
        this.country = country
        this.location = location
        this.title = title
        this.start_date = start_date
        this.end_date = end_date
        this.description = description

        if (Array.isArray(experiences)) {
            experiences = experiences.map(item => {
                return new Experience(item)
            })
        } else experiences = []
        this.experiences = experiences
    }
}

module.exports = Plan