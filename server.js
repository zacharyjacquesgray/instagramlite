const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');

const port = 3000;

app.use(cors());

app.get('/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const response = await axios.get(`https://www.instagram.com/${username}/?__a=1&__d=dis`);
    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
