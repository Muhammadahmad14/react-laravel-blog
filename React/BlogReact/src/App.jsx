import "./App.css";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/header/Header";
import Sugestion from "./components/header/Sugestion";
import LogoutBtn from "./components/LogoutBtn";
import { authservice } from "./Laravel/Auth";
import { login, logout } from "./store/authSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const userData = await authservice.getUser();
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.warn("login failed", error.message);
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-gray-100 dark:bg-gray-800">
      {/* Top Navbar on small screens */}
      <div className="md:hidden fixed top-0 left-0 w-full z-50">
        <Header />
      </div>

      {/*  Left Sidebar - Hidden on small screens */}
      <div className="hidden md:block md:w-64 bg-white dark:bg-slate-900 border-r border-gray-300 sticky top-0 h-screen">
        <Header />
      </div>

      {/*  Main Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide p-4 sm:p-6 mt-16 md:mt-0">
        <Outlet />
        <LogoutBtn />
      </div>

      {/*  Right Suggestion Panel - Only visible on large screens */}
      <div className="hidden lg:block lg:w-72 bg-white dark:bg-slate-900 border-l border-gray-300 sticky top-0 h-screen">
        <Sugestion />
      </div>
    </div>
  );
}

export default App;
