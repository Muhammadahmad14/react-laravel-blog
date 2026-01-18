import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { service } from "../../Laravel/Post";
import PostCard from "../Post/PostCard";
import PostContainer from "../Post/PostContainer";
import Loading from "../Loading";

 function TagPosts() {
  const { tag } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!tag) return;

    const fetchTagPosts = async () => {
      try {
        setLoading(true);
        const response = await service.getTagPosts(tag, currentPage);

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

    fetchTagPosts();
  }, [currentPage, tag]);

  const handleDeletedPost = (postid) => {
    setPosts((prev) => prev.filter((post) => post.id !== postid));
  };

  if (loading && currentPage === 1) return <Loading />;
  if (error) return <h2 className="text-center">{error}</h2>;
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

      <div className="text-center mt-4">
        <button
          disabled={loading || currentPage === lastPage}
          className={
            currentPage === lastPage
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

export default TagPosts;