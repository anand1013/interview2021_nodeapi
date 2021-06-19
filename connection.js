
const mysql = require('mysql');
let pool = mysql.createPool({
    host: 'sql6.freemysqlhosting.net',
    user: 'sql6420029',
    password: 'FzqUdt2EEJ',
    database: 'sql6420029',
    port: 3306,
    charset: 'utf8mb4'
})

module.exports = pool;