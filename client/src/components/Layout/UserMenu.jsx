import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaThList, FaUsers } from "react-icons/fa";
import "./UserMenu.css";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Hamburger (mobile only) */}
      <div className="hamburger-menu d-md-none">
        <FaBars onClick={toggleSidebar} className="hamburger-icon" />
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <h3 className="sidebar-title">User Dashboard</h3>
        <NavLink
          to="/dashboard/user/profile"
          className="sidebar-link"
          onClick={() => setIsOpen(false)}
        >
          <FaUsers className="icon" />
          Edit Profile
        </NavLink>
        <NavLink
          to="/dashboard/user/orders"
          className="sidebar-link"
          onClick={() => setIsOpen(false)}
        >
          <FaThList className="icon" />
          Orders
        </NavLink>
      </div>

      {/* Overlay */}
      {isOpen && <div className="overlay" onClick={toggleSidebar}></div>}
    </>
  );
};

export default UserMenu;
