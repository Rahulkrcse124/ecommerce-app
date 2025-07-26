import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";
import axios from "axios";
import Layout from "../components/Layout/Layout";
import {UseCard} from '../components/Context/Card';
import { toast } from "react-toastify";


const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [releatedProducts, setReleatedProducts] = useState([]);


  const[cart,setCart] = UseCard();

  const params = useParams();

  // Get similar products
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/product/related-product/${pid}/${cid}`
      );
      setReleatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  // Get product details
  const getProductDetails = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/product/get-singleproduct/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params?.slug) getProductDetails();
    // eslint-disable-next-line
  }, [params?.slug]);

  return (
    <Layout title="Product Details">
      <div className="product-page-wrapper py-5">
        <div className="product-main row gx-5">
          <div className="col-md-6 product-image-box">
            <img
              src={`${import.meta.env.VITE_API}/api/v1/product/get-photoproduct/${product._id}`}
              alt={product.name}
              className="product-image img-fluid shadow"
            />
          </div>
          <div className="col-md-6">
            <div className="product-details-box shadow-sm p-4">
              <h2 className="product-title">{product.name}</h2>
              <p><strong>Category:</strong> {product?.category?.name}</p>
              <p className="product-description">{product.description}</p>
              <h4 className="text-success">₹ {product.price}</h4>
              <p><strong>In Stock:</strong> {product.quantity}</p>
              <button className="btn stylish-btn mt-3"
              >Add To Cart</button>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="similar-products-box mt-5 shadow-sm p-4">
          <h4 className="mb-4 text-center">🔄 Similar Products</h4>
          <div className="row">
            {releatedProducts?.map((e) => (
              <div className="col-md-4 mb-4" key={e._id}>
                <div className="card h-100 shadow-sm">
                  <img
                    src={`${import.meta.env.VITE_API}/api/v1/product/get-photoproduct/${e._id}`}
                    className="card-img-top"
                    alt={e.name}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{e.name}</h5>
                    <p className="card-text">{e.description.substring(0, 60)}...</p>
                    <div className="mt-auto">
                      <p className="text-success fw-bold">₹ {e.price}</p>
                      <p>Stock: {e.quantity}</p>

                      <button 
                      className="btn stylish-btn w-100"
                      onClick={() => {
                        setCart([...cart, e]);
                        localStorage.setItem("cart",JSON.stringify([...cart,e]))
                        toast.success("Item Added To Cart");
                      }}

                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
