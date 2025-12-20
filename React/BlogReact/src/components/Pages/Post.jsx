import { useEffect, useState } from "react";
import PostCard from "../Post/PostCard";
import { useParams } from "react-router-dom";
import { service } from "../../Laravel/Post";

function Post() {
  const { postslug } = useParams();
  const [post, setPost] = useState(null);
  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await service.getPost({ slug: postslug });
        if (response.success) {
          setPost(response.data.post);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getPost();
  }, [postslug]);
  return (
    <div>
    {post && <PostCard post={post} />}
    </div>
  );
}

export default Post;
