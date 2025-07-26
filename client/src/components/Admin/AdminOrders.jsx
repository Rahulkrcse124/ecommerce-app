import { useState, useEffect } from "react";
import Layout from "../Layout/Layout";
import AdminMenu from "../Layout/AdminMenu";
import axios from "axios";
import { toast } from "react-toastify";
import { UseAuth } from "../Context/Auth";
import "./AdminOrders.css";

const AdminOrders = () => {
  const [auth] = UseAuth();
  const [orders, setOrders] = useState([]);
  const [changeState, setChangeState] = useState("");

  const statusOptions = [
    "Not Processed",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/order/all-orders`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      if (data?.success) {
        setOrders(data.orders);
      } else {
        toast.error(data?.message || "Failed to fetch orders");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error fetching orders");
    }
  };

  const handleChange = async (orderId, value) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API}/api/v1/order/order-status/${orderId}`,
        { status: value },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      toast.success("Status updated");
      setChangeState(Date.now()); // Trigger re-fetch
    } catch (error) {
      console.log(error);
      toast.error("Failed to update status");
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
    // eslint-disable-next-line
  }, [auth?.token, changeState]);

  return (
    <Layout title="All Orders">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9 admin-orders-container">
          <h2 className="admin-orders-heading">All Orders</h2>

          {orders.length === 0 ? (
            <h5 className="text-center">No orders yet.</h5>
          ) : (
            <div className="order-table">
              <div className="order-table-header">
                <span>#</span>
                <span>Status</span>
                <span>Buyer</span>
                <span>Date</span>
                <span>Payment</span>
                <span>Quantity</span>
              </div>

              {orders.map((order, index) => (
                <div key={order._id} className="order-row">
                  <span>{index + 1}</span>
                  <span>
                    <select
                      value={order.status}
                      onChange={(e) => handleChange(order._id, e.target.value)}
                      className="status-dropdown"
                    >
                      {statusOptions.map((s, idx) => (
                        <option key={idx} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </span>
                  <span>{order?.buyer?.name}</span>
                  <span>{new Date(order?.createdAt).toLocaleString()}</span>
                  <span>{order?.payment?.success ? "Success" : "Failed"}</span>
                  <span>{order?.products?.length}</span>

                  {/* Product Details */}
                  <div className="product-wrapper">
                    {order.products.map((p) => (
                      <div key={p._id} className="product-item">
                        <img
                          src={`${
                            import.meta.env.VITE_API
                          }/api/v1/product/get-photoproduct/${p._id}`}
                          alt={p.name}
                          className="product-img"
                        />
                        <div className="product-details">
                          <h6>{p.name}</h6>
                          <p>{p.description.substring(0, 40)}...</p>
                          <p>
                            <strong>Price:</strong> ₹{p.price}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
