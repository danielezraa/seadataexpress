const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 8080;
const pgp = require('pg-promise')(/* options */)
const db = pgp('postgres://postgres:312166390@34.79.81.80:5432/postgres')
app.use(cors())
app.use(express.json())


app.get('/', async (req, res) => {
    res.send("hello world!")
})

app.get('/users', async (req, res) => {
    await db.any('SELECT * from users')
  .then((data) => {
    res.send(JSON.stringify(data));
  })
  .catch((error) => {
      res.send("error at express server, selecting data")
    console.log('ERROR:', error)
  })
})

app.post('/addUser', (req, res) => {
  const {firstname,lastname,country,city,email,phonenum,jobtitle,yearsofexp} =req.body;
  db.none('INSERT INTO users(firstname,lastname,country,city,email,phonenum,jobtitle,yearsofexp) VALUES($1, $2, $3, $4, $5, $6, $7, $8)', [firstname,lastname,country,city,email,phonenum,jobtitle,yearsofexp])
    .then(() => {
      res.send("user has been added!")
    })
    .catch(error => {
      console.log(error)
      res.status(404).send("error adding new user")
    });
})

app.listen(port, () => {
  console.log(`SeaData express server listening on port ${port}`)
})