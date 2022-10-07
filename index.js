const { time } = require('console')
const { text } = require('express')
const express = require('express')
const app = express()
const fs = require('fs')

let timeStamp = new Date()
let date = timeStamp.toDateString()
let hours = timeStamp.getHours()
let minutes = timeStamp.getMinutes()
let seconds = timeStamp.getSeconds()
let dateTime = `${date} - ${hours};${minutes};${seconds}`

fs.appendFile(`./TimeStamp/${dateTime}`, `${timeStamp}`, function (err) {
  if (err) {
    console.log(err)
  } else {
    console.log('done')
  }
})

fs.readdir('./TimeStamp', (err, files) => {
  if (err) console.log(err)
  else {
    app.get('/', function (req, res) {
      res.send(files)
    })
  }
  console.log(files)
})

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
  console.log('Press Ctrl+C to quit.')
})