const express = require('express')
const routes = require('./routes')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())
app.use(routes)

app.listen(3343, () => {
  console.log('Server listening at http://localhost:3343')
})