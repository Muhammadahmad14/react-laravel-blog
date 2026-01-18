import { useEffect, useState } from "react";
import { userObj } from "../../Laravel/User";
import UserCard from "./UserCard";
import Loading from "../Loading";
import TabButton from "../TabButton";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

function FollowTabs({ userId, Tab = "followers" }) {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(Tab);
  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [loading, setLoading] = useState(false);

  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setActiveTab(Tab || "followers");
  }, [Tab]);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        setLoading(true);
        const response = await userObj.getFollowers(userId);
        if (response.success) setFollowers(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchFollowings = async () => {
      try {
        setLoading(true);
        const response = await userObj.getFollowings(userId);
        if (response.success) setFollowings(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (activeTab === "followers") fetchFollowers();
    if (activeTab === "followings") fetchFollowings();
  }, [activeTab, userId]);

  const filteredUsers =
    activeTab === "followers"
      ? followers.filter((u) =>
          u.name.toLowerCase().includes(query.toLowerCase())
        )
      : followings.filter((u) =>
          u.name.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <>
      <div className="hidden md:flex lg:flex justify-center w-full px-4 md:px-8 mt-4 mb-4">
        <form
          onSubmit={(e) => e.preventDefault()}
          className={`relative flex w-full max-w-xl items-center transition-all duration-200 ${
            isFocused
              ? "ring-2 ring-blue-500/30 dark:ring-blue-400/30 shadow-lg"
              : "shadow-md hover:shadow-lg"
          } bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden`}
        >
          <div className="absolute left-4 pointer-events-none">
            <Search className="w-4 h-4 text-gray-400 dark:text-gray-500" />
          </div>

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={`Search ${activeTab}...`}
            className="flex-1 pl-10 pr-4 py-3 text-gray-800 dark:text-gray-200 bg-transparent placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none"
          />

          <button
            type="submit"
            className="h-full px-4 md:px-5 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white transition-colors flex items-center justify-center min-h-[44px]"
          >
            <Search className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </form>
      </div>

      {/* TABS */}
      <div className="flex justify-center items-center gap-8 mb-6">
        <TabButton
          onClick={() => navigate(`/user/followers/${userId}`)}
          isActive={activeTab === "followers"}
          text="Followers"
        />
        <TabButton
          onClick={() => navigate(`/user/followings/${userId}`)}
          isActive={activeTab === "followings"}
          text="Followings"
        />
      </div>

      {/* LIST */}
      <div>
        {loading && <Loading />}

        {!loading &&
          filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}

        {!loading && filteredUsers.length === 0 && (
          <p className="text-center text-gray-500 mt-6">
            No users found
          </p>
        )}
      </div>
    </>
  );
}

export default FollowTabs;
