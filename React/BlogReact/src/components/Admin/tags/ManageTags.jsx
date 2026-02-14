import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TableContainer from "../TableContainer";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";
import { admin } from "../../../Laravel/admin";
import { Pagination } from "../ui";
import { EditIcon, Loader2, Plus, TrashIcon } from "lucide-react";
import ActionButton from "../ActionButton";
import useDebounce from "../../../hooks/useDebounce";

function ManageTags() {
  const [tags, setTags] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const debounceSearch = useDebounce(search, 2000);

  const deleteTag = async (id) => {
    try {
      const response = await admin.deleteTag(id);
      if (response.success) {
        fetchTags(page);
      } else {
        console.error("Failed to delete tag:", response.error);
      }
    } catch (error) {
      console.error("Error deleting tag:", error);
    }
  };
  const fetchTags = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const response = await admin.getTags(pageNumber, debounceSearch);
      if (response.success) {
        setTags(response.data.data);
        setLastPage(response.data.last_page);
      }
    } catch (error) {
      console.error("Error fetching tags:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTags(page);
  }, [page, debounceSearch]);

  const pageNumbers = [];
  for (let i = 1; i <= lastPage; i++) {
    pageNumbers.push(i);
  }
  return (
    <>
      <TableContainer
        text={"Manage Tags"}
        search={search}
        setSearch={setSearch}
      >
        <div className="w-full flex justify-end">
          <Link to="/admin/add-tag">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 
        py-2 rounded-md font-medium cursor-pointer"
            >
              <Plus className="w-4 h-4 inline-block mr-1" />
              Add Tag
            </button>
          </Link>
        </div>
        <Table className="min-w-full table-auto">
          <TableHeader className="bg-gray-100 dark:bg-gray-800">
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Total Posts</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="py-10">
                  <div className="flex justify-center items-center">
                    <Loader2 className="w-8 h-8 animate-spin text-gray-600 dark:text-gray-300" />
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              tags.map((tag) => (
                <TableRow key={tag.id}>
                  <TableCell>{tag.id}</TableCell>
                  <TableCell>{tag.name}</TableCell>
                  <TableCell>{tag.user?.name || "N/A"}</TableCell>
                  <TableCell>
                    {" "}
                    <Link
                      to={`/admin/posts?tag=${tag.name}`}
                      className="text-blue-500 hover:underline"
                    >
                      {tag.posts_count}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {new Date(tag.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-2">
                      <Link to={`/admin/edit-tag/${tag.id}`}>
                        <ActionButton type="primary">
                          <EditIcon className="w-4 h-4" />
                        </ActionButton>
                      </Link>
                      <ActionButton
                        type="danger"
                        onClick={() => deleteTag(tag.id)}
                      >
                        <TrashIcon className="w-4 h-4" />
                      </ActionButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        page={page}
        lastPage={lastPage}
        setPage={setPage}
        loading={loading}
      />
    </>
  );
}

export default ManageTags;
