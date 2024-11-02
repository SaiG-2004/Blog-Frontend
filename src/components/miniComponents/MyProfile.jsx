import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";

const MyProfile = () => {
  // const { user } = useContext(Context);
  const [user, setUser] = useState(null)


  useEffect(() => {
    // Retrieve user data from localStorage
    const storedUser = localStorage.getItem("user");
    
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Parse and set user data in state
    }
    
  }, []); // Empty dependency array means this runs once on component mount


  return (
    <section className="profile">
      {user? (
        <div>
      <div className="avatar">
        <img src={user.avatar?.url} alt="avatar" />
      </div>
      <div className="user-detail">
        <p>
          Name: <span>{user.name}</span>
        </p>
        <p>
          Email: <span>{user.email}</span>
        </p>
        <p>
          Phone: <span>{user.phone}</span>
        </p>
        <p>
          Role: <span>{user.role}</span>
        </p>
      </div>
        </div>
      )  : (
        <p>Loading user data...</p>
      )}
    </section>
  );
};

export default MyProfile;
