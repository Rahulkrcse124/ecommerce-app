import React, { useState } from "react";
import Layout from "../Layout/Layout";
import AdminMenu from "../Layout/AdminMenu";
import { UseAuth } from "../Context/Auth";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [auth] = UseAuth();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <Layout title="Admin Dashboard - Ecommerce App">
      <div className="dashboard-container container-fluid">
        <div className="dashboard-row row">
          {/* Hamburger for mobile */}
          <div className="d-block d-md-none text-start mb-3">
            <button
              className="hamburger-btn"
              onClick={() => setShowMenu(!showMenu)}
            >
              &#9776; Admin Menu
            </button>
            {showMenu && (
              <div className="mobile-sidebar">
                <AdminMenu />
              </div>
            )}
          </div>

          {/* Sidebar (Left column - visible only on desktop) */}
          <div className="d-none d-md-block col-md-3 mb-4">
            <AdminMenu />
          </div>

          {/* Admin Info */}
          <div className="col-12 col-md-9">
            <div className="admin-card card shadow p-4">
              <h2 className="mb-3">Admin Dashboard</h2>
              <hr />
              <div className="admin-info">
                <p>
                  <strong>Name:</strong> {auth?.user?.name}
                </p>
                <p>
                  <strong>Email:</strong> {auth?.user?.email}
                </p>
                <p>
                  <strong>Phone:</strong> {auth?.user?.phone}
                </p>
                <p>
                  <strong>Address:</strong> {auth?.user?.address}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
