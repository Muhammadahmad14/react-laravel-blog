import { useEffect, useState } from "react";
import TableContainer from "../TableContainer";
import { Pagination, SelectInput } from "../ui";
import { TrashIcon, EditIcon, Loader2 } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import ActionButton from "../ActionButton";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../ui/table";
import { admin } from "../../../Laravel/admin";
import Toast from "../../Toast";

export default function ManageComments() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [params] = useSearchParams();
  const postId = params.get("post_id");
  const [comments, setComments] = useState([]);
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

  const getComments = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const response = await admin.getComments(pageNumber, postId);
      if (response.success) {
        setComments(response.data.data);
        setLastPage(response.data.last_page);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (newstatus, id) => {
    const response = await admin.updateCommentStatus(newstatus, id);
    try {
      if (response.success) {
        setToast({
          show: true,
          message: "Successfull Updated",
          type: "success",
        });
        comments.length === 1 && page > 1
          ? setPage(page - 1)
          : getComments(page);
      }
    } catch (error) {
      setToast({
        show: true,
        message: error.message,
        type: "error",
      });
    }
  };

  const deleteCommment = async (id) => {
    try {
      const response = await admin.deleteComment(id);
      if (response.success) {
        setToast({
          show: true,
          message: "Successfull Deleted",
          type: "success",
        });
        comments.length === 1 && page > 1
          ? setPage(page - 1)
          : getComments(page);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getComments(page);
  }, [page, postId]);

  return (
    <TableContainer text={"Comments"} search={search} setSearch={setSearch}>
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast((prev) => ({ ...prev, show: false }))}
        />
      )}
      <div className="overflow-x-auto rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <Table className="min-w-full table-auto">
          <TableHeader className="bg-gray-100 dark:bg-gray-800">
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Comment</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Status</TableHead>
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
            ) : comments.length > 0 ? (
              comments.map((comment) => (
                <TableRow key={comment.id}>
                  <TableCell>{comment.id}</TableCell>
                  <TableCell>{truncateText(comment.body, 5)}</TableCell>
                  <TableCell>
                    <Link
                      to={`/admin/users?comment_id=${comment.id}`}
                      className="text-blue-500"
                    >
                      {comment.user.name}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <SelectInput
                      options={[
                        { label: "Aprroved", value: "approved" },
                        { label: "Spam", value: "spam" },
                      ]}
                      value={comment.status}
                      onChange={(newstatus) =>
                        updateStatus(newstatus, comment.id)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    {new Date(comment.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-2">
                      <ActionButton
                        type="danger"
                        onClick={() => deleteCommment(comment.id)}
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
                  No comments found.
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
