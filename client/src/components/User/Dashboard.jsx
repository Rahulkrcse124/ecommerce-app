import React from "react";
import Layout from "../Layout/Layout";
import UserMenu from "../Layout/UserMenu";
import { UseAuth } from "../Context/Auth";

const Dashboard = () => {
  const [auth] = UseAuth();

  return (
    <Layout title="User Dashboard | Ecommerce App">
      <div className="container-fluid">
        <div className="row">
          
          {/* Sidebar */}
          <div className="col-md-3 col-12 mb-3">
            <UserMenu />
          </div>

          {/* Main Content */}
          <div className="col-md-9 col-12">
            <div className="card p-4 shadow-sm">
              <h3 className="mb-3">Welcome, {auth?.user?.name || "User"}!</h3>
              <h5 className="text-muted">Your Profile Details:</h5>
              {auth?.user ? (
                <div className="mt-3">
                  <p><strong>Name:</strong> {auth.user.name}</p>
                  <p><strong>Email:</strong> {auth.user.email}</p>
                  <p><strong>Phone:</strong> {auth.user.phone}</p>
                  <p><strong>Address:</strong> {auth.user.address}</p>
                </div>
              ) : (
                <p className="text-danger">User information not available.</p>
              )}
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
