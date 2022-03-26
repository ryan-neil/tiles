const express = require('express');
const app = express();

// imports
require('dotenv').config();
const tiles = require('./src/routes/tiles');
const connectDB = require('./src/db/connect');
const notFound = require('./src/middleware/notFound');
const errorHandlerMiddleware = require('./src/middleware/errorHandler');

// serve middleware
app.use(express.static('../client'));
app.use(express.json());

// serve routes
app.use('/api/v1/tiles', tiles); // all tile routes
app.use(notFound); // 404
app.use(errorHandlerMiddleware); // custom error handler middleware

// DJ, spin that sh*t...
const start = async () => {
  const { PORT } = process.env || 9001;
  const { DATABASE_URI } = process.env;

  try {
    // connect to database
    await connectDB(DATABASE_URI);
    // fire up the server once we successfully connect to the database
    app.listen(PORT, () =>
      console.log(`Server listening at: http://localhost:${PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
};
start();
