import { useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { UseAuth } from "../components/Context/Auth";
import { UseCard } from "../components/Context/Card";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Cart = () => {
  const [auth] = UseAuth();
  const [cart, setCart] = UseCard();
  const navigate = useNavigate();

  // total price
  const totalPrice = () => {
    const total = cart.reduce((acc, item) => acc + item.price, 0);
    return total.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    });
  };

  // handle remove product
  const handleRemoveProduct = (id) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  useEffect(() => {
    // wait until auth is initialized
    const isAuthLoaded = auth && Object.keys(auth).length > 0;

    if (isAuthLoaded && !auth?.token) {
      navigate("/login");
    }
  }, [auth, navigate]);

  // payment handler
  const handleRazorpayPayment = async () => {
    try {
      const amount = cart.reduce((acc, item) => acc + item.price, 0);

      const { data: order } = await axios.post(
        `${import.meta.env.VITE_API}/api/v1/payment/create-order`,
        { amount }
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Ecommerce App",
        description: "Test Payment",
        order_id: order.id,
        handler: async function (response) {
          const res = await axios.post(
            `${import.meta.env.VITE_API}/api/v1/payment/verify-order`,
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              cart,
            },
            {
              headers: {
                Authorization: `Bearer ${auth?.token}`,
              },
            }
          );

          if (res.data.success) {
            toast.success("🎉 Payment Successful!");
            setCart([]);
            localStorage.removeItem("cart");
            navigate("/dashboard/user/orders");
          } else {
            toast.error("❌ Payment Failed");
          }
        },
        prefill: {
          name: auth?.user?.name,
          email: auth?.user?.email,
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (err) {
      console.error(err);
      alert("Payment initiation failed");
    }
  };

  return (
    <Layout title="Cart - Ecommerce App">
      <div className="cart-page">
        <h2 className="greeting">
          {auth?.token
            ? `Hello, ${auth?.user?.name || "User"}`
            : "Welcome to Your Cart"}
        </h2>

        <p className="cart-status">
          {cart?.length
            ? `You have ${cart.length} item${
                cart.length > 1 ? "s" : ""
              } in your cart.`
            : "Your Cart is Empty"}
        </p>

        <div className="cart-container">
          <div className="cart-items">
            {cart?.map((product, index) => (
              <div className="cart-item" key={`${product._id}-${index}`}>
                <div className="cart-image">
                  <img
                    src={`${
                      import.meta.env.VITE_API
                    }/api/v1/product/get-photoproduct/${product._id}`}
                    alt={product.name}
                    onError={(e) =>
                      (e.target.src = "https://via.placeholder.com/280x200")
                    }
                  />
                </div>
                <div className="cart-details">
                  <h4>{product.name}</h4>
                  <p>{product.description}</p>
                  <p>
                    <strong>Price:</strong> ₹{product.price}
                  </p>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleRemoveProduct(product._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="summary-box">
            <h3>Cart Summary</h3>
            <hr />
            <p>Total Items: {cart?.length}</p>
            <p>
              <strong>Total Price:</strong>
              {totalPrice()}
            </p>

            <div className="d-flex flex-wrap gap-2 mt-3">
              <button
                className="btn btn-primary mt-3"
                onClick={handleRazorpayPayment}
              >
                Proceed to Payment
              </button>

              <button
                className="btn btn-outline-warning mt-3"
                onClick={() =>
                  navigate(
                    auth?.user?.role === 1
                      ? "/dashboard/admin/profile"
                      : "/dashboard/user/profile"
                  )
                }
              >
                📋 Update Shipping Info
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Cart;
