import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Auth/Login.jsx";
import { store } from './store/store.js'
import Register from "./components/Auth/Register.jsx";
import PostLists from "./components/Post/PostLists.jsx";
import App from "./App.jsx";
import PostForm from "./components/Post/PostForm.jsx";
import EditPost from "./components/Pages/EditPost.jsx";
import Post from "./components/Pages/Post.jsx";
import SearchPage from "./components/Pages/SearchPage.jsx";
import HomePgae from "./components/Pages/HomePgae.jsx";
import UserProfile from "./components/User/UserProfile.jsx";
const router = createBrowserRouter([
   {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <HomePgae />
      },
      {
      path: "/posts",
      element: <PostLists />
      },
      {
      path: "/post/:postslug",
      element: <Post />
      },
      {
        path: "/add-post",
        element: <PostForm />
      },
      {
        path: "/update-post/:postslug",
        element: <EditPost />
      },{
        path: "/search/:query",
        element: <SearchPage />
      },{
        path: "/:username/:id/profile",
        element: <UserProfile />
      }
    ]
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
