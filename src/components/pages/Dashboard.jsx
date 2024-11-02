import React, { useContext, useEffect, useState } from "react";
import SideBar from "../layout/SideBar";
import MyBlogs from "../miniComponents/MyBlogs";
import MyProfile from "../miniComponents/MyProfile";
import CreateBlog from "../miniComponents/CreateBlog";
import Chart from "../miniComponents/Chart";
import { Context } from "../../main";
import { Navigate } from "react-router-dom";
const Dashboard = () => {
  const [component, setComponent] = useState("MyBlogs");
  const { mode, isAuthenticated , handleSetAuthenticated} = useContext(Context);

  useEffect(() => {
    // Check if a token exists and set authentication state
    const token = localStorage.getItem("authToken");
    if (token) {
      // Optionally, you can add logic here to validate the token if needed
      handleSetAuthenticated(true); // Update context state based on token existence
    } else {
      handleSetAuthenticated(false);
    }
  }, [handleSetAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <section
      className={mode === "dark" ? "dark-bg dashboard" : "light-bg dashboard"}
    >
      <SideBar component={component} setComponent={setComponent} />
      {component === "My Profile" ? (
        <MyProfile />
      ) : component === "Create Blog" ? (
        <CreateBlog />
      ) : component === "Analytics" ? (
        <Chart />
      ) : (
        <MyBlogs />
      )}
    </section>
  );
};

export default Dashboard;
