const express = require('express');
const axios = require('axios');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

const saveImagesLocally = false; // Adjust if you want a session where files are saved locally.

app.use(cors());

app.get('/:username', async (req, res) => {
  const { username } = req.params;
  const baseUrl = 'http://localhost:3000'; // Server URL
  let moreImagesKey = '';

  try {
    const instagramUrl = `https://www.instagram.com/${username}/?__a=1`;
    const urlParams = '&__d=dis';
    const endCursorParam = '&max_id=';

    let i = 0;
    let response = null;
    let data = null;
    let responseObject = null;
    let searchUrl = instagramUrl + urlParams;

    do {
      console.log(searchUrl);
      response = await axios.get(searchUrl);
      data = response.data;
      moreImagesKey = data.graphql.user.edge_owner_to_timeline_media.page_info.end_cursor;
      searchUrl = instagramUrl + endCursorParam + moreImagesKey + urlParams;
      i++;
    } while (i < 1);

    const userUrl = [];

    for (let node of data.graphql.user.edge_owner_to_timeline_media.edges) {
      userUrl.push(node.node.display_url);
    }

    responseObject = {
      data: data,
      imageUrl: userUrl,
    };

    res.json(responseObject);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/:username/:post', async (req, res) => {
  const { username, post } = req.params;

  try {
    const response = await axios({
      method: 'get',
      url: post,
      responseType: 'stream',
    });

    response.data.pipe(res);

    const directoryPath = path.join(__dirname, `posts/${username}`);
    const filePath = `${directoryPath}/${username}${post.slice(-23, -15)}.jpg`;


    // Save images locally:

    if (saveImagesLocally) {
      // console.log(post);

      if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
      }

      const writer = fs.createWriteStream(filePath);
      response.data.pipe(writer);
      writer.on('finish', () => {
        console.log(`Image ${post.slice(-23, -15)} from '@${username}' saved locally.`);
      });
      writer.on('error', (err) => {
        console.error('Error saving image:', err);
      });
    }

  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }

});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
