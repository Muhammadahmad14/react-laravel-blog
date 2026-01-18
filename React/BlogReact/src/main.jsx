import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Auth/Login.jsx";
import { store } from "./store/store.js";
import Register from "./components/Auth/Register.jsx";
import PostLists from "./components/Post/PostLists.jsx";
import App from "./App.jsx";
import PostForm from "./components/Post/PostForm.jsx";
import EditPost from "./components/Pages/EditPost.jsx";
import Post from "./components/Pages/Post.jsx";
import SearchPage from "./components/Pages/SearchPage.jsx";
import HomePgae from "./components/Pages/HomePgae.jsx";
import UserProfile from "./components/User/UserProfile/UserProfile.jsx";
import FollowPage from "./components/Pages/FollowPage.jsx";
import SettingPage from "./components/Pages/SettingPage.jsx";
import TagsPostsPage from "./components/Pages/TagsPostsPage.jsx";
import Authlayout from "./utils/Authlayout.jsx";
import NotFound from "./components/Pages/NotFound.jsx";
import GuestLayout from "./utils/GuestLayout.jsx";
const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <GuestLayout>
        <Login />
      </GuestLayout>
    ),
  },
  {
    path: "/register",
    element: (
      <GuestLayout>
        <Register />
      </GuestLayout>
    ),
  },
  {
    path: "/",
    element: (
      <Authlayout authentication>
        <App />
      </Authlayout>
    ),
    children: [
      {
        path: "/",
        element: <HomePgae />,
      },
      {
        path: "/posts",
        element: (
          <Authlayout authentication>
            <PostLists />
          </Authlayout>
        ),
      },
      {
        path: "/post/:postslug",
        element: (
          <Authlayout authentication>
            <Post />
          </Authlayout>
        ),
      },
      {
        path: "/tag/:tag",
        element: (
          <Authlayout>
            <TagsPostsPage />
          </Authlayout>
        ),
      },
      {
        path: "/add-post",
        element: (
          <Authlayout authentication>
            <PostForm />
          </Authlayout>
        ),
      },
      {
        path: "/update-post/:postslug",
        element: (
          <Authlayout authentication>
            <EditPost />
          </Authlayout>
        ),
      },
      {
        path: "/search/:query",
        element: (
          <Authlayout authentication>
            <SearchPage />
          </Authlayout>
        ),
      },
      {
        path: "/:username/:id/profile",
        element: (
          <Authlayout authentication>
            <UserProfile />
          </Authlayout>
        ),
      },
      {
        path: "/setting",
        element: (
          <Authlayout authentication>
            <SettingPage />
          </Authlayout>
        ),
      },
      {
        path: "/user/:tab/:id",
        element: <FollowPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
