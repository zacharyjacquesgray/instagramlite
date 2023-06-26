export function getUserData(data) {

      console.log("Before running getUserData: d" + data)
      let userData = {
            name: data.graphql.user.full_name,
            is_verified: data.graphql.user.is_verified,
            is_video: [],
            caption: [],
            likes: [],
            location: [],
      };

      for (let num of data.graphql.user.edge_owner_to_timeline_media.edges) {
            for (let sidecar of num.node.edge_sidecar_to_children.edges) {
                  userData.is_video.push(num.node.is_video || null)
                  userData.caption.push(num.node.edge_media_to_caption.edges[0].node.text || null)
                  userData.likes.push(num.node.edge_liked_by || null)
                  userData.location.push(num.node.location || null)
            }
      }

      console.log("After running getUserData: " + userData);

      return userData;
}