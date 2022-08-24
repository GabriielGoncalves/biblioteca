const express = require("express")
const cors = require('cors')
const bodyParser = require('body-parser')
const routes = require('./controller/controller')


const port = 3031
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.text())

app.use('/', routes)

app.listen(port, () => {
    console.log(`Server is running in the port ${port}`)
})