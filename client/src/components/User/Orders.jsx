import { useState, useEffect } from "react";
import Layout from "../Layout/Layout";
import "./Orders.css";
import UserMenu from "../Layout/UserMenu";
import axios from "axios";
import { UseAuth } from "../Context/Auth";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = UseAuth();

  useEffect(() => {
    if (auth?.token) getOrders();
    //eslint-disable-next-line
  }, [auth?.token]);

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/order/orders`,
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      setOrders(data?.orders || []);
    } catch (error) {
      console.log("Error fetching orders:", error);
    }
  };

  return (
    <Layout title="Your Orders">
      <div className="container-fluid p-3">
        <div className="row">
          <div className="d-none d-md-block col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9 orders-container">
            <h2 className="orders-heading">All Orders</h2>

            {orders && orders.length > 0 ? (
              orders.map((order, index) => (
                <div key={index} className="order-card">
                  <div className="order-header">
                    <span>#{index + 1}</span>
                    <span>{order?.status}</span>
                    <span>
                      {moment(order?.createdAt).format("L, h:mm:ss A")}
                    </span>
                    <span>
                      {order?.payment?.success ? "Success" : "Failed"}
                    </span>
                    <span>{order?.products?.length || 0}</span>
                  </div>
                  <hr />
                  <div className="products-list">
                    {order?.products?.map((p, i) => (
                      <div className="product-item" key={i}>
                        <img
                          src={`${
                            import.meta.env.VITE_API
                          }/api/v1/product/get-photoproduct/${p._id}`}
                          alt={p.name}
                          className="product-img"
                        />
                        <div className="product-details">
                          <h6>{p.name}</h6>
                          <p>{p.description?.substring(0, 60)}...</p>
                          <p>Price: ₹{p.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p>No orders yet.</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
