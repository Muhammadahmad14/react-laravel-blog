import { useParams } from "react-router-dom";
import Loading from "../Loading";
import PostCard from "./PostCard";

function SearchedPost({  }) {
    const { query } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const searchPosts = async () => {
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
    };

    searchPosts();
  }, [query]);

  if (loading) return <Loading />;
  if (error) return <h2>{error}</h2>;
  if (posts.length === 0) return <div>No Post found</div>;

  return (
    <div className="grid grid-cols-1 gap-6 p-4">
      <div className="flex flex-col items-center justify-center min-h-screen">
        {posts.map((post) => (
            <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default SearchedPost;
