import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./store/store.js";
import PublicRoutes from "./app/routes/PublicRoutes.jsx";
import UserRoutes from "./app/routes/UserRoutes.jsx";
const routes = [...PublicRoutes, ...UserRoutes];
const router = createBrowserRouter(routes)
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
