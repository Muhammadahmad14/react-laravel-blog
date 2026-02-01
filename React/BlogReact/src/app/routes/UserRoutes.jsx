import AuthLayout from "../../layouts/AuthLayout";
import PostForm from "../../components/Post/PostForm";
import {
  HomePage,
  Post,
  TagsPostsPage,
  EditPost,
  SearchPage,
  SettingPage,
  FollowPage,
  PaymentPage,
  SuccessPage,
} from "../../pages/user";
import PostLists from "../../components/Post/PostLists";
import UserProfile from "../../components/User/UserProfile/UserProfile"
import App from "../../App";
const UserRoutes = [
  {
    element: <AuthLayout/>,
    children: [
      {path: "/", element: <App />,
        children: [
      { path: "/", element: <HomePage /> },
      { path: "/posts", element: <PostLists /> },
      { path: "/post/:postslug", element: <Post /> },
      { path: "/tag/:tag", element: <TagsPostsPage /> },
      { path: "/add-post", element: <PostForm /> },
      { path: "/update-post/:postslug", element: <EditPost /> },
      { path: "/search/:query", element: <SearchPage /> },
      { path: "/:username/:id/profile", element: <UserProfile /> },
      { path: "/setting", element: <SettingPage /> },
      { path: "/user/:tab/:id", element: <FollowPage /> },
      { path: "/payment/plans", element: <PaymentPage /> },
      { path: "/success", element: <SuccessPage /> },
    ]},
  ],
  },
];

export default UserRoutes;
