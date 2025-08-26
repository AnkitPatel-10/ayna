import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const isAdmin = !!localStorage.getItem("adminToken");

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>Welcome to the Form App</h1>
      {isAdmin ? (
        <Link to="/admin/create-form">
          <button>Create a Form</button>
        </Link>
      ) : (
        <Link to="/admin/login">
          <button>Create a Form </button>
        </Link>
      )}
    </div>
  );
};


export default Home;