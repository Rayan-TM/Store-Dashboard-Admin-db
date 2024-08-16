const express = require('express')
const { databaseQueryHandler } = require("../utils");

const managersRoute = express.Router()

managersRoute.get('/', (req, res) => {
    const getAllManagers = "SELECT * FROM managers"

    databaseQueryHandler(getAllManagers, res)
})

module.exports = managersRoute