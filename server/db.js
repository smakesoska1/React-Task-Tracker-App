require('dotenv').config();
const { Pool } = require('pg');

const pool=new Pool({
    user: process.env.DB_USER,
    host:process.env.HOST,
    database:'todoapp',
    password:process.env.PASSWORD,
    port:process.env.PORT
   
})

module.exports=pool;