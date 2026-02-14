import React, { useEffect, useState } from 'react';
import AdminPostForm from '../../../components/Admin/posts/AdminPostForm';
import { useParams } from 'react-router-dom';
import { admin } from '../../../Laravel/admin';
import Loading from '../../../components/Loading';

function EditPost() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { postslug } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await admin.getPost({ slug: postslug });
        if (response.success) {
          setPost(response.data); 
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postslug]);

  if (loading) return <Loading />;
  if (!post) return <div>Post not found</div>;

  return <AdminPostForm post={post} />;
}

export default EditPost;
