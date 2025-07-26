import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Pages & Components
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Search from "./pages/Search";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Categories from "./pages/Categories";
import CategoryProduct from "./pages/CategoryProduct";
import Policy from "./pages/Policy";
import PageNotFound from "./pages/PageNotFound";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import ForgotPassword from "./components/Auth/ForgotPassword";
import Dashboard from "./components/User/Dashboard";
import AdminDashboad from "./components/Admin/AdminDashboard";
import AdminOrders from "./components/Admin/AdminOrders";
import CreateCategory from "./components/Admin/CreateCategory";
import CreateProduct from "./components/Admin/CreateProduct";
import UpdateProduct from "./components/Admin/UpdateProduct";
import AdminProfile from "./components/Admin/AdminProfile";
import Products from "./components/Admin/products";
import ProductDetails from "./pages/ProductDetails";
import Users from "./components/Admin/Users";
import Orders from "./components/User/Orders";
import Profile from "./components/User/Profile";
import { Private } from "./components/Routes/Private";
import { AdminRoute } from "./components/Routes/AdminRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="/search" element={<Search />} />
        <Route path="/product/:slug" element={<ProductDetails />} />

        {/* Private User Routes */}
        <Route path="/dashboard/user" element={<Private />}>
          <Route index element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/dashboard/admin" element={<AdminRoute />}>
          <Route index element={<AdminDashboad />} />
          <Route path="create-category" element={<CreateCategory />} />
          <Route path="create-product" element={<CreateProduct />} />
          <Route path="product/:slug" element={<UpdateProduct />} />
          <Route path="products" element={<Products />} />
          <Route path="users" element={<Users />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="profile" element={<AdminProfile />} />
        </Route>

        {/* Auth */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Static Pages */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;