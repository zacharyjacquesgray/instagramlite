import React from 'react';

const ImageParser = ({ json }) => {
  let imageUrls = [];

  try {
    const parsedJson = JSON.parse(json);
    if (
      parsedJson &&
      parsedJson.graphql &&
      parsedJson.graphql.user &&
      parsedJson.graphql.user.edge_felix_video_timeline &&
      parsedJson.graphql.user.edge_felix_video_timeline.edges
    ) {
      const edges = parsedJson.graphql.user.edge_felix_video_timeline.edges;
      imageUrls = edges.map(edge => edge.node.display_url);
    }
  } catch (error) {
    console.log('Error parsing JSON:', error);
  }

  return (
    <div>
      {imageUrls.map((imageUrl, index) => (
        <img key={index} src={imageUrl} alt={`Image ${index}`} />
      ))}
    </div>
  );
};

export default ImageParser;
