const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const passport = require('passport');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');

//load user model
require('./models/User');

//passport config
require('./config/passport')(passport);

//Load routes
const index = require('./routes/index')
const auth = require('./routes/auth')
const stories = require('./routes/stories')


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

//handlebars middleware
app.engine('handlebars', exphbs({
  defaultLayout:'main'
}));
app.set('view engine', 'handlebars');

app.use(cookieParser());
app.use(expressSession({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}))

//passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//set global vars
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
})

//set static folder
app.use(express.static(path.join(__dirname, 'public')))

//routes
app.use('/', index);
app.use('/auth', auth);
app.use('/stories', stories);

//setting port to listen
const port = process.env.PORT || 5000

//listen at port
app.listen(port, () => {
  console.log(`Server started on port ${port}`)
});