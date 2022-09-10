const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()

// instantiating an app. Creating an instance of express
const app = express()
const workshops = [{ id: 1, name: "Botany Library", volunteers: ["Beatrice Everall"], date: "15/09/22" }, 
,{ id: 2, name: "Long Bay College", volunteers: [], date: "16/09/22"}
,{ id: 3, name: "Rosebank Primary School", volunteers: [], date: "17/09/22"}
,{ id: 4, name: "Puekoware School", volunteers: [], date: "18/09/22"}
,{ id: 5, name: "Pukekohe Intermediate School", volunteers: [], date: "19/09/22"}
,{ id: 6, name: "St Joseph's Catholic School", volunteers: [], date: "20/09/22"}
,{ id: 7, name: "Oteha Valley School", volunteers: [], date: "21/09/22"}
,{ id: 8, name: "Bombay School", volunteers: [], date: "22/09/22"}
,{ id: 9, name: "Botany Library", volunteers: [], date: "23/09/22"}]
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

app.get('/workshops/reset', (req, res) => {
  for (let workshop of workshops) {
    workshop.volunteers = []
  }
  res.send();
})

app.listen(process.env.PORT || 3000, function () {
  console.log("Server is running on port 3000");
});
