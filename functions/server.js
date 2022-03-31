const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');
// internal
const tilesRoutes = require('../server/routes/tiles');
const connectDB = require('../server/db/connect');
const notFound = require('../server/middleware/notFound');
const errorHandlerMiddleware = require('../server/middleware/errorHandler');

const app = express();
app.use(cors());
app.use(express.json());

// serve routes
app.use('/api/tiles', tilesRoutes); // all tile routes
app.use(notFound); // 404
app.use(errorHandlerMiddleware); // custom error handler middleware

// DJ, spin that sh*t...
const start = async () => {
  try {
    // connect to database
    await connectDB(process.env.DATABASE_URI);
    console.log(`Database connection successful!`);
  } catch (error) {
    console.log(error);
  }
};
start();

module.exports.handler = serverless(app);
