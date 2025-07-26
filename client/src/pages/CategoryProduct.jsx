import { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./CategoryProduct.css";

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  const getProductByCategory = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params?.slug) {
      getProductByCategory();
    }
    //eslint-disable-next-line
  }, [params?.slug]);

  return (
    <Layout>
      <div className="category-page">
        {/* LEFT SIDE: PRODUCT CARDS */}
        <div className="category-products">
          <h4 className="category-title">
            <i className="bi bi-grid me-2"></i>Category - {category.name}
          </h4>
          <p>{products?.length} Product(s) Found</p>

          <div className="product-grid">
            {products?.map((e) => (
              <div className="card" key={e._id}>
                <img
                  src={`${import.meta.env.VITE_API}/api/v1/product/get-photoproduct/${e._id}`}
                  alt={e.name}
                  onError={(e) =>
                    (e.target.src = "https://via.placeholder.com/280x200")
                  }
                />
                <div className="card-body">
                  <h5 className="card-title">{e.name}</h5>
                  <div className="card-text">$ {e.price}</div>
                  <p className="card-text">Available Stock: {e.quantity}</p>
                  <p className="card-category">
                    {e.name || "No Category"}
                  </p>
                  <p className="card-text">
                    {e.description.substring(0, 30)}...
                  </p>

                  <div className="d-flex justify-content-between mt-3">
                    <button
                      onClick={() => navigate(`/product/${e.slug}`)}
                      className="btn btn-primary w-50 me-2"
                    >
                      More Details
                    </button>
                    <button className="btn btn-addtocart w-50">
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE: SUMMARY (Dummy for now) */}
        <div className="category-summary">
          <div className="summary-card">
            <h5 className="border-bottom pb-2">Summary</h5>
            <p><strong>Category:</strong> {category?.name}</p>
            <p><strong>Total Products:</strong> {products?.length}</p>
            <p><strong>More Filters:</strong> Coming soon...</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
