const express = require('express');
const session = require('express-session');
const app = express();


app.use(
    session({
      secret: 'session',
      resave: false,
      saveUninitialized: true,
    //   cookie: {
    //     secure: true, // Set to 'true' if using HTTPS
    //     maxAge: 3600000 // Session expiration time (in milliseconds)
    //   }
    })
  );

const loginRouter = require('./routes/loginRoute');
const userRoute = require('./routes/userDetails');

app.use(express.json());
app.use('/fliptree', loginRouter);
app.use('/fliptree/user', userRoute);

module.exports = app;