import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { service } from "../../Laravel/Post";
import Loading from "../Loading";
import TabButton from "../TabButton";
import PostCard from "../Post/PostCard";
import PostContainer from "../Post/PostContainer";
import UserCard from "../User/UserCard";
import { userObj } from "../../Laravel/User";

function SearchPage() {
  const { query } = useParams();
  const [activeTab, setaActiveTab] = useState("posts");
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const searchQuery = async () => {
      if (activeTab === "posts") {
        try {
          setLoading(true);
          const response = await service.searchPost(query);
          if (response.success) {
            setPosts(response.data);
          }
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      }

      if (activeTab === "users") {
        try {
          setLoading(true);
          const response = await userObj.getSearchedUser(query);
          if (response.success) {
            setUsers(response.data);
          }
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      }
    };
    searchQuery();
  }, [query, activeTab]);

  return (
    <>
      <div className="flex justify-content-center text-center align-items-center gap-8 mb-6">
        <TabButton
          onClick={() => setaActiveTab("posts")}
          isActive={activeTab === "posts" ? true : false}
          text={"Posts"}
        />
        <TabButton
          onClick={() => setaActiveTab("users")}
          isActive={activeTab === "users" ? true : false}
          text={"Users"}
        />
      </div>
      {loading ? (
        <Loading />
      ) : activeTab === "posts" ? (
        <PostContainer>
          {posts.length === 0 ? (
            <span className="text-gray-600 dark:text-gray-200">
              No post found
            </span>
          ) : (
            posts.map((post) => <PostCard key={post.id} post={post} />)
          )}
        </PostContainer>
      ) : (
        <div className="flex flex-col justify-center items-center">
          {users.length === 0 ? (
            <span className="text-gray-600 dark:text-gray-200">
              No user found
            </span>
          ) : (
            users.map((user) => <UserCard key={user.id} user={user} />)
          )}
        </div>
      )}
    </>
  );
}

export default SearchPage;
