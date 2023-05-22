import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3001;

app.use(bodyParser.json());

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'username' && password === 'password') {
    res.status(200).json({ success: true });
  } else {
    res.status(401).json({ success: false, message: 'Authentication failed' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
