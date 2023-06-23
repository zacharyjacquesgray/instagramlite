const express = require('express');
const axios = require('axios');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(cors());

let userUrl = [];

app.get('/:username', async (req, res) => {
  const { username } = req.params;

  const baseUrl = 'http://localhost:3000'; // Update with your server's URL

  try {
    const response = await axios.get(`https://www.instagram.com/${username}/?__a=1&__d=dis`);
    const data = response.data;

    // Prepare the response object
    const responseObject = {
      data: data,
    };


    console.log(responseObject.data.graphql.user.edge_owner_to_timeline_media.edges[0].node.display_url); // I want to pass this as the pathway to the URL

    userUrl = [];
    for (let node = 0; node < 10; node++) {
      userUrl.push(responseObject.data.graphql.user.edge_owner_to_timeline_media.edges[node].node.display_url);
    }
    console.log(responseObject.imageUrl)

    res.json(responseObject);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

for (let posts = 0; posts < 10; posts++) {
  app.get(`/:username/image${posts}`, (req, res) => {
    // URL found under responseObject.data.graphql.user.edge_owner_to_timeline_media.edges[0].node.display_url

    // Proxy the image request to the external URL
    axios({
      method: 'get',
      url: userUrl[posts],
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
}


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
