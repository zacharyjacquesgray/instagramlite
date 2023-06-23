const express = require('express');
const axios = require('axios');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(cors());

let emilyWillis = null;

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

    
    console.log(responseObject.data.graphql.user.edge_owner_to_timeline_media.edges[0].node.display_url); // I want to pass this as the pathway to the URL

    emilyWillis = responseObject.data.graphql.user.edge_owner_to_timeline_media.edges[0].node.display_url;
    console.log("Image URL:   " + emilyWillis)

    res.json(responseObject);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/:username/image', (req, res) => {
  const imageUrl = 'https://instagram.fsyd3-1.fna.fbcdn.net/v/t51.2885-15/273425399_461846525648315_849094583189862936_n.jpg?stp=dst-jpg_e35_s1080x1080&_nc_ht=instagram.fsyd3-1.fna.fbcdn.net&_nc_cat=111&_nc_ohc=n3m4qjj8aOMAX-hcj55&edm=AKEQFekBAAAA&ccb=7-5&oh=00_AfDUwXvSUco4zPW-qsRCU1rLrYHw0Fwv8TT89NgKwnd6dg&oe=649AFFCC&_nc_sid=1349e3';
  // I want to replace this with the URL found under responseObject.data.graphql.user.edge_owner_to_timeline_media.edges[0].node.display_url



  // Proxy the image request to the external URL
  axios({
    method: 'get',
    url: emilyWillis,
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
