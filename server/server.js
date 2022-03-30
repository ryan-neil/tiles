const express = require('express');
const app = express();

// serve our client folder
app.use(express.static('./client'));

// DJ, spin that sh*t...
const start = async () => {
  const PORT = 3001;

  app.listen(PORT, () =>
    console.log(`App running at: http://localhost:${PORT}`)
  );
};
start();
