const functions = require("firebase-functions");
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

const saveImagesLocally = false;

app.use(cors());

app.get("/:username", async (req, res) => {
  const {username} = req.params;
  let moreImagesKey = "";

  console.log('Request received');

  try {
    const instagramUrl = `https://www.instagram.com/${username}/?__a=1`;
    const urlParams = "&__d=dis";
    const endCursorParam = "&max_id=";

    let i = 0;
    let response = null;
    let data = null;
    let responseObject = null;
    let searchUrl = instagramUrl + urlParams;
    const userUrl = [];
    const captions = [];
    const isVideos = [];
    const likes = [];
    const locations = [];

    do {
      console.log(searchUrl);
      response = await axios.get(searchUrl);
      data = response.data;
      const moreImagesUrl = data.graphql.user.edge_owner_to_timeline_media;
      moreImagesKey = moreImagesUrl.page_info.end_cursor;
      searchUrl = instagramUrl + endCursorParam + moreImagesKey + urlParams;
      i++;
    } while (i < 1); // If potentially can call more images

    // Locate Profile Picture and add to start of array
    userUrl.push(data.graphql.user.profile_pic_url);
    console.log('Profile pic URL: ' + data.graphql.user.profile_pic_url);

    // Go through and find all main posts
    for (const num of data.graphql.user.edge_owner_to_timeline_media.edges) {
      userUrl.push(num.node.display_url);
      isVideos.push(num.node.is_video || false);
      captions.push(num.node.edge_media_to_caption.edges[0].node.text || "");
      likes.push(num.node.edge_liked_by.count || null);
      locations.push(num.node.location || "");

      // Make an object to hold each of the carousel images.
      // This way they can be displayed together.

      // Go through and find all carousel images
      if (
        num.node.edge_sidecar_to_children &&
        num.node.edge_sidecar_to_children.edges &&
        num.node.edge_sidecar_to_children.edges.length > 0
      ) {
        for (let sidecar of num.node.edge_sidecar_to_children.edges) {
          if (sidecar.node.display_url !== num.node.display_url) {
            userUrl.push(sidecar.node.display_url);
            isVideos.push(num.node.is_video || false);
            captions.push(num.node.edge_media_to_caption.edges[0].node.text || "");
            likes.push(num.node.edge_liked_by.count || null);
            locations.push(num.node.location || "");
          }
        }
      }
    }

    responseObject = {
      data: data,
      imageUrl: userUrl,
      name: data.graphql.user.full_name,
      isVerified: data.graphql.user.is_verified,
      isVideo: isVideos,
      caption: captions,
      likes: likes,
      location: locations,
    };
    console.log(responseObject.caption);

    res.json(responseObject);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/img/:username/:post", async (req, res) => {
  const {username, post} = req.params;

  try {
    const response = await axios({
      method: "get",
      url: post,
      responseType: "stream",
    });

    response.data.pipe(res);

    const directoryPath = path.join(__dirname, `posts/${username}`);
    const filePath = `${directoryPath}/${username}${post.slice(-23, -15)}.jpg`;

    // Save images locally:

    if (saveImagesLocally) {
      // console.log(post);

      if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, {recursive: true});
      }

      const writer = fs.createWriteStream(filePath);
      response.data.pipe(writer);
      writer.on("finish", () => {
        console.log(`Image ${post.slice(-23, -15)} from '@${username}' saved locally.`);
      });
      writer.on("error", (err) => {
        console.error("Error saving image:", err);
      });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

//*************************/
// For if we want to run the server locally
const port = 3001;

// Start the server on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
// ************************/

exports.api = functions.https.onRequest(app);
