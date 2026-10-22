const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 5001;

app.use(express.urlencoded({ extended: false }));

app.get('/form', (req, res) => {
  res.sendFile(path.join(__dirname, 'form.html'));
});

app.post('/submit', (req, res) => {
  res.json(req.body);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// http://localhost:5001/form should return a form with input elements for username, email, and submit button

// http://localhost:5001/submit should return all the data the user entered
