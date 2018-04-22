const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

//passport config
require('./config/passport')(passport);

//Load routes
const auth = require('./routes/auth')


//setting access to config vars
if (process.env.NODE_ENV === 'production') {
  mongoURI = process.env.mongoURI;
}
else {
  const keys = require('./config/keys');
  mongoURI = keys.mongoURI;
}

//Map global promises
mongoose.Promise = global.Promise;

//Mongoose connect
mongoose.connect(mongoURI, {
})
.then(() => console.log('MongoDB connected!'))
.catch(err => console.log(err));

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