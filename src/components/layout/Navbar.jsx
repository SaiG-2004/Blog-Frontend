import React, { useContext } from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { Context } from "../../main";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import axios from "axios";
import toast from "react-hot-toast";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const handleNavbar = () => {
    setShow(!show);
  };

  const storedUser = JSON.parse(localStorage.getItem("user"));
  
  const isDashboard = useLocation();
  
  const { mode, setMode, isAuthenticated, handleSetAuthenticated } = useContext(Context);
  
  // const navigateTo = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    // try {
    //   const { data } = await axios.get(
    //     "https://blog-backend-two-chi.vercel.app/api/v1/user/logout",
    //     { withCredentials: true }
    //   );
      

    //   handleSetAuthenticated(false);
    //   toast.success(data.message);
    //   navigateTo("/");
    // } catch (error) {
    //   toast.error(error.response.data.message);
    // }
    localStorage.clear();
    handleSetAuthenticated(false);
    toast.success("Logged out successfully");
  };
console.log(isAuthenticated)
  return (
    <section
      className={
        isDashboard.pathname === "/dashboard"
          ? "hideNavbar"
          : 
          mode === "light"
          ? "header light-navbar"
          : "header dark-navbar"
      }
    >
      <nav>
        <div className="logo">
        <span>BLOG</span>SPOT
        </div>
        <div className={show ? "links show" : "links"}>
          <ul>
            <li>
              <Link to={"/"} onClick={handleNavbar}>
                HOME
              </Link>
            </li>
            <li>
              <Link to={"/blogs"} onClick={handleNavbar}>
                BLOGS
              </Link>
            </li>
            <li>
              <Link to={"/authors"} onClick={handleNavbar}>
                ALL AUTHORS
              </Link>
            </li>
            <li>
              <Link to={"/about"} onClick={handleNavbar}>
                ABOUT
              </Link>
            </li>
          </ul>
          <div className="btns">
            <button
              onClick={() =>
                mode === "light" ? setMode("dark") : setMode("light")
              }
              className={
                mode === "light" ? "mode-btn light-mode" : "mode-btn dark-mode"
              }
            >
              {mode === "light" ? (
                <CiLight className="light-icon" />
              ) : (
                <MdDarkMode className="dark-icon" />
              )}
            </button>
            {isAuthenticated && storedUser?.role === "author" && (
              <Link to="/dashboard" onClick={handleNavbar} className="dashboard-btn">
                DASHBOARD
              </Link>
            )}
            {!isAuthenticated ? (
              <Link to={"/login"} onClick={handleNavbar} className="login-btn">
                LOGIN
              </Link>
            ) : (
              <div>
                <button className="logout-btn" onClick={handleLogout}>
                  LOGOUT
                </button>
              </div>
            )}
          </div>
        </div>
        <RxHamburgerMenu className="hamburger" onClick={handleNavbar} />
      </nav>
    </section>
  );
};

export default Navbar;
