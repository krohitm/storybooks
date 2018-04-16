const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.get('/', (Req, res) => {
  res.send('it works');
})

//setting port to listen
const port = process.env.PORT || 5000

//listen at port
app.listen(port, () => {
  console.log(`Server started on port ${port}`)
});