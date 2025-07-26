const express = require('express');
const dotenv = require('dotenv');
const cors =require('./middleware/cors.js')
const Auth = require('./routers/auth_router.js');
const Course = require('./routers/course_router.js')

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors);

app.use('/', Course);
app.use('/', Auth);

app.get('/', (req, res) => {
    return res.status(200).json({message: "OK"})
})

module.exports = app;