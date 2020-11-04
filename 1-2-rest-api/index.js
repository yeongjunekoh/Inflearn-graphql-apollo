const express = require('express')
const app = express()

const teamRouter = require('./routes/team.js')
const peopleRouter = require('./routes/people.js')
const roleRouter = require('./routes/role.js')
const softwareRouter = require('./routes/software.js')
const equipmentRouter = require('./routes/equipment.js')

const port = 3000

app.use(express.json())
app.use(express.urlencoded())

app.use('/api/team', teamRouter)
app.use('/api/people', peopleRouter)
app.use('/api/role', roleRouter)
app.use('/api/software', softwareRouter)
app.use('/api/equipment', equipmentRouter)

app.listen(port, () => {
  console.log(`REST API listening at http://localhost:${port}`)
})
