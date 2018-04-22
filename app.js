const express = require('express');
const mongoose = require('mongoose');
const passport  = require('passport');

//passport config
require('./config/passport')(passport);

//Load routes
const auth = require('./routes/auth')


const app = express();

app.get('/', (Req, res) => {
  res.send('it works');
})

app.use('/auth', auth);

//setting port to listen
const port = process.env.PORT || 5000

//listen at port
app.listen(port, () => {
  console.log(`Server started on port ${port}`)
});