class Experience {
    constructor({
        title, description, start_datetime, end_datetime, id
    }) {
        this.title = title
        this.start_datetime = start_datetime
        this.end_datetime = end_datetime
        this.description = description
        if (id) { this.id = id }
    }
}

module.exports = Experience