const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('hello world')
})

app.listen("3000", function(err){
  if (err) console.log("Error in server setup")
  console.log("Server listening on Port 3000");
})