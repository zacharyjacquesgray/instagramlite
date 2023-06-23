const express = require('express');
const axios = require('axios');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(cors());

app.get('/:username', async (req, res) => {
  const { username } = req.params;

  const baseUrl = 'http://localhost:3000'; // Update with your server's URL
  const imageUrl = `${baseUrl}/${username}/image`;

  try {
    const response = await axios.get(`https://www.instagram.com/${username}/?__a=1&__d=dis`);
    const data = response.data;

    // Prepare the response object
    const responseObject = {
      imageUrl: imageUrl,
      data: data,
    };

    res.json(responseObject);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/:username/image', (req, res) => {
  const imageUrl = 'https://instagram.fsyd3-1.fna.fbcdn.net/v/t51.2885-15/355228759_776809164177900_9199623976963649295_n.jpg?stp=dst-jpg_e35_p1080x1080&_nc_ht=instagram.fsyd3-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=7tDIStHkRMgAX84RVH5&edm=AKEQFekBAAAA&ccb=7-5&oh=00_AfDkTP2rGdud3HqDLu2diIvKMcLNKmD8dLMGEty0lhSwBA&oe=649B21F2&_nc_sid=1349e3';

  // Proxy the image request to the external URL
  axios({
    method: 'get',
    url: imageUrl,
    responseType: 'stream',
  })
    .then((response) => {
      response.data.pipe(res);
    })
    .catch((error) => {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
