import React from 'react'
import Layout from '../Layout/Layout'
import './Users.css';
import AdminMenu from '../Layout/AdminMenu';

const Users = () => {
  return (
    <Layout title='dashboad - All Users'>
      <div className="dashboard-container container-fluid p-3">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu/>
        </div>
        <div className="col-md-9">
          <h1 className='text-center'>All users</h1>
        </div>
      </div>
      </div>
    </Layout>
  )
}

export default Users
