const express = require('express');
const axios = require('axios');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3001;

const saveImagesLocally = false; // Adjust if you want a session where files are saved locally.

app.use(cors());

app.get('/:username', async (req, res) => {
  const { username } = req.params;
  const baseUrl = `http://localhost:${port}`; // Server URL
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
    const userUrl = [];

    do {
      console.log(searchUrl);
      response = await axios.get(searchUrl);
      data = response.data;
      moreImagesKey = data.graphql.user.edge_owner_to_timeline_media.page_info.end_cursor;
      searchUrl = instagramUrl + endCursorParam + moreImagesKey + urlParams;
      i++;
    } while (i < 1);

    // Locate Profile Picture and add to start of array
    userUrl.push(data.graphql.user.profile_pic_url);

    // Go through and find all main posts
    for (let num of data.graphql.user.edge_owner_to_timeline_media.edges) {
      userUrl.push(num.node.display_url); // The main images are a part of the carousel

      // Make an object to hold each of the carousel images. This way they can be displayed together.

      // Go through and find all carousel images
      if (
        num.node.edge_sidecar_to_children &&
        num.node.edge_sidecar_to_children.edges &&
        num.node.edge_sidecar_to_children.edges.length > 0
      ) {
        for (let sidecar of num.node.edge_sidecar_to_children.edges) {
          if (sidecar.node.display_url !== num.node.display_url) {
            userUrl.push(sidecar.node.display_url);
          }
        }
      }
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
