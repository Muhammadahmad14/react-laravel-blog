import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import TableContainer from "../TableContainer";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";
import { Pagination, SelectInput } from "../ui";
import { admin } from "../../../Laravel/admin";
import Toast from "../../Toast";
import { Loader2 } from "lucide-react";
import useDebounce from "../../../hooks/useDebounce";
function ManageUsers() {
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [preview, setPreview] = useState(null);
  const [params] = useSearchParams();
  const postId = params.get("post_id");
  const commentId = params.get("comment_id");
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const debouncedSearch = useDebounce(search, 2000);
  // get users
  const getUsers = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const response = await admin.getUsers(
        pageNumber,
        status,
        debouncedSearch,
        postId,
        commentId,
      );
      if (response.success) {
        setUsers(response.data.data);
        setLastPage(response.data.last_page);
      }
    } catch (error) {
      console.log("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getUsers(page);
  }, [page, status, debouncedSearch, postId, commentId]);

  // update role
  const updateUserRole = async (userId, newRole) => {
    setUsers((prevUsers) => {
      return prevUsers.map((user) => {
        if (user.id === userId) {
          return { ...user, role: newRole };
        }
        return user;
      });
    });

    try {
      const response = await admin.updateUserRole(userId, newRole);
      if (response.success) {
        setToast({
          show: true,
          message: response.data,
          type: "success",
        });
      }
    } catch (error) {
      setToast({
        show: true,
        message: response.data || "Failed to update user role",
        type: "error",
      });
      setUsers((prevUsers) => {
        return prevUsers.map((user) => {
          if (user.id === userId) {
            return { ...user, role: user.role };
          }
          return user;
        });
      });
    }
  };
  // update status
  const updateUserStatus = async (userId, newStatus) => {
    setUsers((prevUsers) => {
      return prevUsers.map((user) => {
        if (user.id === userId) {
          return { ...user, status: newStatus };
        }
        return user;
      });
    });

    try {
      const response = await admin.updateUserStatus(userId, newStatus);
      if (response.success) {
        setToast({
          show: true,
          message: response.data,
          type: "success",
        });
      }
    } catch (error) {
      setToast({
        show: true,
        message: response.data || "Failed to update user status",
        type: "success",
      });
      setUsers((prevUsers) => {
        return prevUsers.map((user) => {
          if (user.id === userId) {
            return {
              ...user,
              status: newStatus === "active" ? "blocked" : "active",
            };
          }
          return user;
        });
      });
    }
  };

  const pageNumbers = [];
  for (let i = 1; i <= lastPage; i++) {
    pageNumbers.push(i);
  }
  return (
    <TableContainer
      text="Users"
      search={search}
      setSearch={setSearch}
      data={{
        options: [
          { label: "All", value: "" },
          { label: "Active", value: "active" },
          { label: "Blocked", value: "blocked" },
        ],
        value: status,
        onChange: setStatus,
      }}
    >
      <div className="overflow-x-auto rounded-lg shadow border border-gray-200 dark:border-gray-700">
        {toast.show && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast({ ...toast, show: false })}
          />
        )}
        <Table className="min-w-full table-auto">
          <TableHeader className="bg-gray-100 dark:bg-gray-800">
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Profile Image</TableHead>
              <TableHead>Verfied</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Total Posts</TableHead>
              <TableHead>Joined On</TableHead>
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
            ) : users.length > 0 ? (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.profile_img && (
                      <img
                        src={`${import.meta.env.VITE_IMAGE_PATH}/${user.profile_img}`}
                        alt={user.name}
                        className="w-12 h-12 rounded-lg object-cover border cursor-pointer"
                        onClick={() => setPreview(`${import.meta.env.VITE_IMAGE_PATH}/${user.profile_img}`)}
                      />
                    )}
                    {preview && (
                      <div
                        onClick={() => setPreview(null)}
                        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
                      >
                        <img
                          src={preview}
                          className="max-h-[90%] max-w-[90%]"
                        />
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    {user.has_blue_tick ? (
                      <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100">
                        verified
                      </span>
                    ) : (
                      <span className="px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-yellow-800 dark:bg-yellow-700 dark:text-red-100">
                        Not Verified
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="min-w-[120px] px-2">
                    <SelectInput
                      options={[
                        { label: "Active", value: "active" },
                        { label: "Blocked", value: "blocked" },
                      ]}
                      value={user.status}
                      onChange={(newstatus) =>
                        updateUserStatus(user.id, newstatus)
                      }
                    />
                  </TableCell>
                  <TableCell className="min-w-[120px] px-2">
                    <SelectInput
                      options={[
                        { label: "Admin", value: "admin" },
                        { label: "User", value: "user" },
                      ]}
                      value={user.role}
                      onChange={(newRole) => updateUserRole(user.id, newRole)}
                    />
                  </TableCell>
                  <TableCell>
                    <Link
                      to={`/admin/posts?user_id=${user.id}`}
                      className="text-blue-500 hover:underline"
                    >
                      {user.posts_count}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {new Date(user.created_at).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={100}
                  className="text-center py-10 text-gray-300 dark:text-gray-600"
                >
                  No users found.
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

export default ManageUsers;
