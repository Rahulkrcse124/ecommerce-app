import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  FaBars,
  FaHome,
  FaPlus,
  FaThList,
  FaUsers,
  FaReceipt
} from "react-icons/fa";
import "./AdminMenu.css";

const AdminMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  // Close sidebar on outside click (mobile)
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        isOpen &&
        !e.target.closest(".admin-sidebar") &&
        !e.target.closest(".hamburger")
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [isOpen]);

  return (
    <>
      {/* Hamburger for mobile */}
      <div className="hamburger d-md-none" onClick={toggleSidebar}>
        <FaBars />
      </div>

      {/* Sidebar */}
      <div className={`admin-sidebar ${isOpen ? "open" : ""}`}>
        <h5 className="text-white mb-4 text-center">Admin Panel</h5>
        <NavLink to="/dashboard/admin" className="nav-link">
          <FaHome className="me-2" /> Dashboard
        </NavLink>
        <NavLink to="/dashboard/admin/create-category" className="nav-link">
          <FaPlus className="me-2" /> Create Category
        </NavLink>
        <NavLink to="/dashboard/admin/create-product" className="nav-link">
          <FaPlus className="me-2" /> Create Product
        </NavLink>
        <NavLink to="/dashboard/admin/products" className="nav-link">
          <FaThList className="me-2" /> Products
        </NavLink>
         <NavLink to="/dashboard/admin/orders" className="nav-link">
          <FaReceipt className="me-2" /> Orders
        </NavLink>
        <NavLink to="/dashboard/admin/users" className="nav-link">
          <FaUsers className="me-2" /> Users
        </NavLink>
      </div>
    </>
  );
};

export default AdminMenu;