import { message } from "antd";
import React from "react";

const Logout = () => {
  const logoutHandler = () => {
    localStorage.removeItem("token");
    message.success("Logout Successfully");
  };
  return (
    <div>
      <button className="btn btn-primary" onClick={logoutHandler}>
        Logout
      </button>
    </div>
  );
};

export default Logout;
