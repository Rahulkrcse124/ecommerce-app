import { useState, useEffect } from "react";
import Layout from "../Layout/Layout";
import "./UpdateProduct.css";
import AdminMenu from "../Layout/AdminMenu";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { Select } from "antd";
const { Option } = Select;

const UpdateProduct = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [categories, setCategories] = useState([]);
  const [name, setname] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [photo, setPhoto] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [category, setCategory] = useState("");

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/product/get-singleproduct/${
          params.slug
        }`
      );
      if (data?.success && data.product) {
        const product = data.product;
        setId(product._id);
        setname(product.name || "");
        setDescription(product.description || "");
        setPrice(product.price || 0);
        setQuantity(product.quantity || 0);
        setCategory(product.category?._id || "");
        setShipping(product.shipping);
      } else {
        toast.error("Product not found");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while getting product");
    }
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while getting categories");
    }
  };

  const handleUpdateProduct = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("quantity", quantity);
      photo && formData.append("photo", photo);
      formData.append("category", category);
      formData.append("shipping", shipping);

      const { data } = await axios.put(
        `${import.meta.env.VITE_API}/api/v1/product/update-product/${id}`,
        formData
      );

      if (data?.success) {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while updating product");
    }
  };

  const handleDeleteProduct = async () => {
    try {
      const answer = window.prompt(
        "Are you sure you want to delete this product?"
      );
      if (!answer) return;
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API}/api/v1/product/delete-product/${id}`
      );
      if (data?.success) {
        toast.success("Product Deleted Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error deleting product");
    }
  };

  useEffect(() => {
    getSingleProduct();
    getAllCategory();
    //eslint-disable-next-line
  }, []);

  return (
    <Layout title="Dashboard - Update Product">
      <div className="dashboard-container container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center mb-4">Update Product</h1>
            <div className="product-form-container">
              <Select
                placeholder="Select a Category"
                size="large"
                className="form-select mb-3"
                value={category}
                onChange={(value) => setCategory(value)}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>

              <label className="upload-label mb-3">
                {photo ? photo.name : "Upload Photo"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                />
              </label>

              <div className="image-preview mb-3">
                <img
                  src={
                    photo
                      ? URL.createObjectURL(photo)
                      : `${
                          import.meta.env.VITE_API
                        }/api/v1/product/get-photoproduct/${id}`
                  }
                  alt="product"
                  height="200px"
                />
              </div>

              <input
                type="text"
                value={name}
                placeholder="Product Name"
                className="form-control"
                onChange={(e) => setname(e.target.value)}
              />
              <textarea
                value={description}
                placeholder="Product Description"
                className="form-control"
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                type="number"
                value={price}
                placeholder="Price"
                className="form-control"
                onChange={(e) => setPrice(e.target.value)}
              />
              <input
                type="number"
                value={quantity}
                placeholder="Quantity"
                className="form-control"
                onChange={(e) => setQuantity(e.target.value)}
              />

              <Select
                placeholder="Shipping"
                className="form-select mb-3"
                size="large"
                value={shipping ? "1" : "0"}
                onChange={(value) => setShipping(value)}
              >
                <Option value="1">Yes</Option>
                <Option value="0">No</Option>
              </Select>

              <div className="mb-3">
                <button
                  className="btn btn-primary"
                  onClick={handleUpdateProduct}
                >
                  Update Product
                </button>
                <button
                  className="btn btn-danger ms-3"
                  onClick={handleDeleteProduct}
                >
                  Delete Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
