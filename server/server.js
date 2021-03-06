// imports
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const tilesRoutes = require('./routes/tiles');
const connectDB = require('./db/connect');
const notFound = require('./middleware/notFound');

const errorHandlerMiddleware = require('./middleware/errorHandler');
const app = express();

app.use(cors());

// serve middleware
app.use(express.static('./client'));
app.use(express.json());

// serve routes
app.use('/api/v1/tiles', tilesRoutes); // all tile routes
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
