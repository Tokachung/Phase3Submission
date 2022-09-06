const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()

// instantiating an app. Creating an instance of express
const app = express()
const workshops = [{ id: 1, name: "Botany Library", volunteers: ["Beatrice Everall"] }, { id: 2, name: "Pakuranga Library", volunteers: [] }]
var cors = require('cors')

app.use(cors())
app.use(bodyParser.json())


app.get('/workshops', function (req, res) {
  res.send(workshops)
})

app.post('/workshop/:id/register', function (req, res) {
  const workshopId = req.params.id;
  const newVolunteer = req.body.name;
  for (let workshop of workshops) {
    if (workshop.id == workshopId) {
      workshop.volunteers.push(newVolunteer)
    }
  }

  res.send();
})

app.listen(process.env.PORT || 3000, function () {
  console.log("Server is running on port 3000");
});
