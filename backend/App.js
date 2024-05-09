// Import required modules
const express = require('express');

// Create an Express application
const app = express();
const port = 3010;

// Define a sample route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});