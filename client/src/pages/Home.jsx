import Layout from "../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Checkbox, Radio } from "antd";
import { Price } from "../components/Price";
import "./Home.css";
import { UseCard } from "../components/Context/Card";
import banner from "./banner.png";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);

  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [cart, setCart] = UseCard();

  // navigate
  const navigate = useNavigate();

  // get total product count
  const totalProductCount = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/product/product-count`
      );
      if (data?.success) {
        setTotal(data.productCount);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // get paginated products
  const getPaginatedProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      if (data?.success) {
        if (page === 1) {
          setProducts(data.products);
        } else {
          setProducts([...products, ...data.products]);
        }
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // get all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error While Getting Category");
    }
  };

  // get filtered products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API}/api/v1/product/filters-product`,
        {
          checked,
          radio,
        }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  // handle category filter
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  // useEffect section
  useEffect(() => {
    getAllCategories();
    totalProductCount();
  }, []);

  useEffect(() => {
    if (!checked.length && !radio.length) {
      getPaginatedProducts(); // when no filters applied
    }
    // eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    if (checked.length || radio.length) {
      filterProduct();
    }
    // reset to page 1 when filters change
    setPage(1);
    // eslint-disable-next-line
  }, [checked, radio]);

  return (
    <Layout title="Home Page - Ecommerce App">
      <img className="banner" src={banner} alt="banner" />
      <h1 className="text-center fw-bold border-bottom">
        <i className="bi bi-grid me-2"></i>All Products List
      </h1>
      <div className="row">
        {/* <h1 className="text-center mt-3 mb-1">All Products List</h1> */}

        <div className="col-md-2">
          <h4 className="ms-3">Filter By Category</h4>
          <div className="d-flex flex-column">
            {categories.map((e) => (
              <Checkbox
                className="checkbox"
                key={e._id}
                onChange={(event) => handleFilter(event.target.checked, e._id)}
              >
                {e.name}
              </Checkbox>
            ))}
          </div>

          <h4 className="ms-3 mt-4">Filter By Prices</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Price?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.Array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
            <div className="d-flex flex-column mt-3">
              <button
                style={{ width: "130px" }}
                onClick={() => window.location.reload()}
                className="btn btn-danger"
              >
                Reset Filter
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-9">
          <div className="products-container">
            {products?.map((e) => (
              <div className="product-card" key={e._id}>
                <div className="product-image">
                  <img
                    src={`${
                      import.meta.env.VITE_API
                    }/api/v1/product/get-photoproduct/${e._id}`}
                    alt={e.name}
                    onError={(e) =>
                      (e.target.src = "https://via.placeholder.com/280x200")
                    }
                  />
                </div>
                <div className="product-info">
                  <h5 className="product-name">{e.name}</h5>
                  <p className="product-price">₹ {e.price}</p>
                  <p className="product-stock">
                    Stock:{" "}
                    <span
                      className={e.quantity > 0 ? "in-stock" : "out-of-stock"}
                    >
                      {e.quantity > 0 ? e.quantity : "Out of Stock"}
                    </span>
                  </p>
                  <p className="product-desc">
                    {e.description.substring(0, 50)}...
                  </p>
                  <div className="product-actions">
                    <button
                      className="btn btn-primary"
                      onClick={() => navigate(`/product/${e.slug}`)}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-secondary"
                      style={{ background: "#5a6268" }}
                      onClick={() => {
                        setCart([...cart, e]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, e])
                        );
                        toast.success("Item Added To Cart");
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="m-2 p-3">
            {products &&
              products.length < total &&
              !checked.length &&
              !radio.length && (
                <button
                  className="btn btn-warning"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? "Loading ..." : "Load More"}
                </button>
              )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
