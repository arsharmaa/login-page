const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const crypto = require('crypto');

const app = express();
const port = 3001;
const hashedPassword = crypto.createHash('sha256').update("password").digest('hex', (err, hashedPassword) => {
    if (err) {
      console.error('Error hashing password:', err);
      return;
    });

app.use(bodyParser.json());
app.use(cors());

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  console.log(hashedPassword)
  console.log(password)

  if (hashedPassword.length != 64) {
    res.status(401);

  }

  if (username === 'username' && password === hashedPassword) {
    console.log('Successful request with status: 200' );
    res.status(200).json({ success: true });
  } else {
    res.status(401).json({ success: false, message: 'Authentication failed' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
