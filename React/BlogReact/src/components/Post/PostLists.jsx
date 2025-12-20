import React, { useEffect, useState } from "react";
import { service } from "../../Laravel/Post";
import PostCard from "./PostCard";
import Loading from "../Loading";
import PostContainer from "./PostContainer";

function PostLists() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsResult = await service.listPosts();
        if (postsResult.success) {
          setPosts(postsResult.data);
        } else {
          setError("No posts available");
        }
      } catch (err) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  // delete post
  const handleDeletedPost = (postid) => {
    setPosts((prev) => prev.filter((posts) => posts.id !== postid));
  };

  if (loading)
    return (
      <>
        <Loading />
      </>
    );
  if (error) return <h2>{error}</h2>;
  if (posts.length === 0)
    return <div className="text-center">No posts available</div>;

  return (
    <>
      <PostContainer>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} onDeleted={handleDeletedPost} />
        ))}
      </PostContainer>
    </>
  );
}

export default PostLists;
