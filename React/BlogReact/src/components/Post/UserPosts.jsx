import React, { useEffect, useState } from "react";
import { service } from "../../Laravel/Post";
import PostCard from "./PostCard";
import Loading from "../Loading";
import PostContainer from "./PostContainer";

function UserPosts({ id }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentpage, setCurrentPage] = useState(1);
  const [lastpage, setLastPage] = useState(1);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchUserPosts = async () => {
      try {
        setLoading(true);
        const response = await service.getUserPosts(currentpage, id);

        if (response.success) {
          setPosts((prev) => {
            const existingIds = new Set(prev.map((p) => p.id));
            const newPosts = response.data.data.filter(
              (post) => !existingIds.has(post.id)
            );
            return [...prev, ...newPosts];
          });

          setLastPage(response.data.last_page);
        } else {
          setError("No posts available");
        }
      } catch (err) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [currentpage, id]);

  const handleDeletedPost = (postid) => {
    setPosts((prev) => prev.filter((post) => post.id !== postid));
  };

  if (loading && currentpage === 1) return <Loading />;
  if (error) return <h2>{error}</h2>;
  if (!loading && posts.length === 0)
    return <div className="text-center">No posts yet</div>;

  return (
    <div>
      <PostContainer>
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onDeleted={handleDeletedPost}
          />
        ))}
      </PostContainer>

      <div className="text-center">
        <button
          disabled={loading || currentpage === lastpage}
          className={
            currentpage === lastpage
              ? "sr-only"
              : "text-blue-700 p-3 cursor-pointer"
          }
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          {loading ? "Loading..." : "See More"}
        </button>
      </div>
    </div>
  );
}

export default UserPosts;
