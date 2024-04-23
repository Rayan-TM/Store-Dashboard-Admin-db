const mysql = require('mysql')

const shopDB = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'wpmonster_store'
})

module.exports = shopDB