require('dotenv').config(); 
const mongoose = require('mongoose');
const app = require('./app');


mongoose.set('strictQuery', false);

const uri = process.env.MONGODB_URL;
const dbName = process.env.DATABASE_NAME;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, dbName })
  .then(() => {
    console.log(`Connected successfully to the database: ${dbName}`);

    app.listen(process.env.PORT, () => {
      console.log(`Server running at port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to the database:', error);
    process.exit(1);
  });