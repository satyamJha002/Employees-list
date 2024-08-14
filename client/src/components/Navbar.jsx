import React from "react";
import Logout from "./Logout";

const Navbar = ({ employees }) => {
  return (
    <div className="p-4">
      <div className="flex justify-between">
        <div>
          <h1 className="text-xl">logo</h1>
        </div>

        <div>
          <ul className="flex text-xl gap-10">
            <li></li>

            <li>
              <Logout />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
