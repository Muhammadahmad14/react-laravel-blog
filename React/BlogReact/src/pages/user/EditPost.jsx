import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PostForm from "../../components/Post/PostForm";
import { service } from "../../Laravel/Post";
import Loading from "../../components/Loading";
function EditPost() {
  const { postslug } = useParams();
  const [post, setPost] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await service.getPost({ slug: postslug });

        if (response.success) {
          setPost(response.data); 
        } else {
          console.log("Failed TO fetch post");
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postslug]);

  if (loading) {
    return <Loading />;
  }

  if (!post) {
    return <div>Post not found.</div>;
  }

  return <PostForm post={post} />;
}

export default EditPost;
