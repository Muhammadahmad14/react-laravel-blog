import { useEffect, useState } from "react";
import TableContainer from "../TableContainer";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../ui/table";
import { Pagination } from "../ui";
import { admin } from "../../../Laravel/admin";
import useDebounce from "../../../hooks/useDebounce";
import { TrashIcon, EditIcon, Plus, Loader2 } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import ActionButton from "../ActionButton";
import Toast from "../../Toast";

function ManagePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [params] = useSearchParams();
  const tag = params.get("tag");
  const user_id = params.get("user_id");

  const debouncedSearch = useDebounce(search, 2000);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });
  function truncateText(text, wordLimit = 5) {
    if (!text) return "";
    const words = text.split(" ");
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  const deletePost = async (id) => {
    try {
      const response = await admin.deletePost(id);
      if (response.success) {
        setToast({
          show: true,
          message: "Post Successfully Deleted",
          type: "success",
        });
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };
  const fetchPosts = async (pageNumber = 1) => {
    setLoading(true);

    try {
      const response = await admin.getPosts(
        pageNumber,
        status,
        debouncedSearch,
        tag,
        user_id,
      );
      if (response.success) {
        setPosts(response.data.data);
        setLastPage(response.data.last_page);
      }
    } catch (error) {
      console.log("Error fetching posts:", error);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchPosts(page);
  }, [page, status, debouncedSearch, tag, user_id]);

  const pageNumbers = [];
  for (let i = 1; i <= lastPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <TableContainer
      text={"Posts"}
      search={search}
      setSearch={setSearch}
      data={{
        options: [
          { label: "All", value: "" },
          { value: "published", label: "Published" },
          { value: "block", label: "Blocked" },
        ],
        value: status,
        onChange: setStatus,
      }}
    >
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast((prev) => ({ ...prev, show: false }))}
        />
      )}
      <div className="w-full flex justify-end">
        <Link to="/admin/add-post">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 
        py-2 rounded-md font-medium cursor-pointer"
          >
            <Plus className="w-4 h-4 inline-block mr-1" />
            Add Post
          </button>
        </Link>
      </div>
      <div className="overflow-x-auto rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <Table className="min-w-full table-auto">
          <TableHeader className="bg-gray-100 dark:bg-gray-800">
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Body</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Likes</TableHead>
              <TableHead>Comments</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={100} className="py-10">
                  <div className="flex justify-center items-center">
                    <Loader2 className="w-8 h-8 animate-spin text-gray-600 dark:text-gray-300" />
                  </div>
                </TableCell>
              </TableRow>
            ) : posts.length > 0 ? (
              posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>{post.id}</TableCell>
                  <TableCell>{truncateText(post.title)}</TableCell>
                  <TableCell>{truncateText(post.body)}</TableCell>
                  <TableCell>
                    <Link
                      to={`/admin/users?post_id=${post.id}`}
                      className="text-blue-500 hover:underline"
                    >
                      {post.user.name}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {post.image && (
                      <img
                        src={`${import.meta.env.VITE_IMAGE_PATH}/${post.image}`}
                        alt={post.title}
                        className="w-12 h-12 rounded-lg object-cover border"
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        post.status === "published"
                          ? "bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100"
                      }`}
                    >
                      {post.status}
                    </span>
                  </TableCell>
                  <TableCell>{post.likes_count}</TableCell>
                  <TableCell>
                    <Link to={`/admin/comments?post_id=${post.id}`}>{post.comments_count}</Link>
                  </TableCell>
                  <TableCell>
                    {new Date(post.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-2">
                      <Link to={`/admin/edit-post/${post.slug}`}>
                        <ActionButton type="primary">
                          <EditIcon className="w-4 h-4" />
                        </ActionButton>
                      </Link>
                      <ActionButton
                        type="danger"
                        onClick={() => deletePost(post.id)}
                      >
                        <TrashIcon className="w-4 h-4" />
                      </ActionButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center py-10 dark:text-gray-300"
                >
                  No posts found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <Pagination
        page={page}
        lastPage={lastPage}
        setPage={setPage}
        loading={loading}
      />
    </TableContainer>
  );
}

export default ManagePosts;
