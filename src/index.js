const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const errorHandler = require('./middleware/error.js')
const router = require('./routes/index.js')
const environment = require('dotenv').config().parsed
const app = express()

/*
 * Middleware
 */
app.use(cors())
app.use(bodyParser.json())

/**
 * Routes
 */
app.use('/', router)

/*
 * Error handler
 */
app.use(errorHandler)

const server = app.listen(
    environment.PORT,
    console.log(`Server running on port ${environment.PORT}`)
)

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
    console.log(`Error: ${err.message}`)
    // Close server exit
    server.close(() => process.exit(1))
})