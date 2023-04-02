import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { firebaseApp } from "../config/firebase";

const Dashboard = () => {
  const user = useSelector((state) => state.user.value);
  useEffect(() => {
    console.log(user);
  }, []);
  return (
    <>
      {user ? (
        <>
        <div>Hello {user.email}</div>
        <button className="p-2 bg-blue-600" onClick={()=> firebaseApp.auth().signOut()}>Logout</button>
        </>
      ) : (
        <div>
          Please <NavLink to="/login">Login</NavLink> to post some images
        </div>
      )}
      <div>Dashboard</div>
    </>
  );
};

export default Dashboard;
