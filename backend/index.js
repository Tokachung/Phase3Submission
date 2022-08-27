const express = require('express')

// instantiating an app. Creating an instance of express
const app = express()
const workshops = [{ name: "Botany Library", volunteers: ["Beatrice Everall"] }, { name: "Pakuranga Library", volunteers: [] }]
var cors = require('cors')

app.use(cors())


app.get('/workshops', function (req, res) {
  res.send(workshops)
})


app.listen(3001)