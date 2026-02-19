import AdminLayout from "../../components/Admin/AdminLayout";
import ManageSetting from "../../components/Admin/setting/ManageSetting";
import { ThemeProvider } from "../../context/ThemeContext";
import AdminRouteLayout from "../../layouts/AdminRouteLayout";
import {
  PostsPage,
  EditPost,
  DashboardPage,
  AddPost,
  UserPage,
  TagsPage,
  AddTag,
  EditTag,
  CommentsPage,
} from "../../pages/admin";
const AdminRoutes = [
  {
    element: <AdminRouteLayout />,
    children: [
      {
        path: "/admin",
        element: (
          <ThemeProvider>
            <AdminLayout />
          </ThemeProvider>
        ),
        children: [
          {
            path: "",
            element: <DashboardPage />,
          },
          {
            path: "posts",
            element: <PostsPage />,
          },
          {
            path: "add-post",
            element: <AddPost />,
          },
          {
            path: "edit-post/:postslug",
            element: <EditPost />,
          },
          {
            path: "users",
            element: <UserPage />,
          },
          {
            path: "tags",
            element: <TagsPage />,
          },
          {
            path: "add-tag",
            element: <AddTag />,
          },
          {
            path: "edit-tag/:id",
            element: <EditTag />,
          },
          {
            path: "comments",
            element: <CommentsPage />,
          },
          {
            path: "settings",
            element: <ManageSetting/>
          },
        ],
      },
    ],
  },
];

export default AdminRoutes;
