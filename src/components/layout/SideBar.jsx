import React, { useContext, useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { Context } from "../../main";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";

const SideBar = ({ setComponent }) => {
  const [show, setShow] = useState(false);
  const { mode, setMode, handleSetAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();


  const [user, setUser] = useState(null)

  useEffect(() => {
    // Retrieve user data from localStorage
    const storedUser = localStorage.getItem("user");
    
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Parse and set user data in state
    }
  }, []); // Empty dependency array means this runs once on component mount


  const handleLogout = async (e) => {
    e.preventDefault();
    // try {
    //   const { data } = await axios.get(
    //     "https://blog-backend-two-chi.vercel.app/api/v1/user/logout",
    //     { withCredentials: true }
    //   );

    //   localStorage.removeItem('token');
    //   handleSetAuthenticated(false);
    //   toast.success(data.message);
    //   navigateTo("/");
    // } catch (error) {
    //   toast.error(error.response.data.message);
    // }
    localStorage.clear();
    handleSetAuthenticated(false);
  };

  const gotoHome = () => {
    navigateTo("/");
  };
  const handleComponent = (value) => {
    setComponent(value);
  };
  return (
    <>
      <div className="icon-wrapper" onClick={() => setShow(!show)}>
        <RxHamburgerMenu />
      </div>
      <section className={show ? "show-sidebar sidebar" : "sidebar"}>
        <div className="icon-wrapper-arrow" onClick={() => setShow(!show)}>
          <FaArrowLeft />
        </div>
        {user ? (
         <div className="user-detail">
          <img src={user.avatar?.url} alt="avatar" />
          <p>{user.name}</p>
        </div>
        ) : (
          <p>Loading user avatar...</p>
        )}
        <ul>
          <button onClick={() => handleComponent("My Blogs")}>MY BLOGS</button>
          <button onClick={() => handleComponent("Create Blog")}>
            CREATE BLOG
          </button>
          <button onClick={() => handleComponent("Analytics")}>
            CHART
          </button>
          <button onClick={() => handleComponent("My Profile")}>
            MY PROFILE
          </button>
          <button onClick={gotoHome}>HOME</button>
          <button onClick={handleLogout}>LOGOUT</button>
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
        </ul>
      </section>
    </>
  );
};

export default SideBar;
