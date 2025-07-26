import React, { useState, useEffect } from "react";
import Layout from "../Layout/Layout";
import "./products.css";
import AdminMenu from "../Layout/AdminMenu";
import axios from "axios";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  const GetAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/product/get-product`
      );

      if (data?.success) {
        toast.success("Products fetched successfully");
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while getting products");
    }
  };

  useEffect(() => {
    GetAllProducts();
  }, []);

  return (
    <Layout title="Admin All Product - Ecommerce App">
      <div className="products-page container-fluid">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3 sidebar-wrapper mb-3 mb-md-0">
            <AdminMenu />
          </div>

          {/* Products Grid */}
          <div className="col-md-9">
            <h1 className="text-center mb-4">All Products List</h1>
            <div className="products-container">
              {products?.map((product) => (
                <div className="card product-card" key={product._id}>
                  <img
                    src={`${
                      import.meta.env.VITE_API
                    }/api/v1/product/get-photoproduct/${product._id}`}
                    alt={product.name}
                    onError={(e) =>
                      (e.target.src = "https://via.placeholder.com/280x200")
                    }
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    <NavLink
                      to={`/dashboard/admin/product/${product.slug}`}
                      className="btn"
                    >
                      View Product
                    </NavLink>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
