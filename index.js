const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const pgp = require('pg-promise')(/* options */)
const db = pgp('postgres://postgres:312166390@34.79.81.80:5432/postgres')


app.get('/', async (req, res) => {
    res.send("hello world!aaa")
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

app.listen(port, () => {
  console.log(`SeaData express server listening on port ${port}`)
})
