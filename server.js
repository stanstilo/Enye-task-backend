const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()
app.use(bodyParser.json())
app.use(express.json())

const ratesRouter = require('./routes/rate')
app.use('/api', ratesRouter)

const port = process.env.PORT || 8000

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
})