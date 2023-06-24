const express = require('express');
const session = require('express-session');
const app = express();


app.use(
    session({
      secret: 'session',
      resave: false,
    })
  );

const loginRouter = require('./routes/loginRoute');
const userRoute = require('./routes/userDetails');

app.use(express.json());
app.use('/fliptree', loginRouter);
app.use('/fliptree/user', userRoute);

module.exports = app;