import React, { useEffect, useState } from "react";
import { service } from "../../Laravel/Post";
import PostCard from "./PostCard";
import Loading from "../Loading";
import PostContainer from "./PostContainer";

function PostLists() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentpage, setCurrentPage] = useState(1);
  const [lastpage, setLastPage] = useState(1);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async (page = 1) => {
      try {
        setLoading(true);
        const postsResult = await service.listPosts(page);
        if (postsResult.success) {
          setPosts((prev) =>{
            const SamePosts = new Set(prev.map(post => post.id));
            const newPosts = postsResult.data.data.filter((post) => !SamePosts.has(post.id));
            return [...prev,...newPosts];
          });
          setCurrentPage(postsResult.data.current_page);
          setLastPage(postsResult.data.last_page);
        } else {
          setError("No posts available");
        }
      } catch (error) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData(currentpage);
  }, [currentpage]);
  const handleDeletedPost = (postid) => {
    setPosts((prev) => prev.filter((posts) => posts.id !== postid));
  };

  if (loading && currentpage === 1)
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

      <div className="text-center">
        <button
          disabled={loading || currentpage === lastpage}
          className={currentpage === lastpage ? "sr-only" : "text-blue-700 p-3 cursor-pointer"}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          {loading ? "Loading..." : "See More"}
        </button>
      </div>
    </>
  );
}

export default PostLists;
