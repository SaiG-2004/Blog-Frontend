import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { getIsAuthenticatedToLocal, setIsAuthenticatedToLocal } from "./utils/localstorage.js";

export const Context = createContext({
  isAuthenticated: false,
});

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(getIsAuthenticatedToLocal());
  const [user, setUser] = useState({});
  const [blogs, setBlogs] = useState([]);
  const [mode, setMode] = useState("dark");
  const [role, setRole] = useState("")

  const handleSetAuthenticated = (auth) => {
   setIsAuthenticated(auth);
   setIsAuthenticatedToLocal(auth)

  }

const handleSetUser = (role) => {
  setRole(role);
  setIsRoleToLocal(role)
}

// const handleSetUserData = (user) => {
//   setUser(user);

// }

  return (
    <Context.Provider
      value={{
        user,
        setUser,
        blogs,
        setBlogs,
        mode,
        setMode,
        isAuthenticated,
        handleSetAuthenticated,
        role,
        handleSetUser,
      }}
    >
      <App />
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
