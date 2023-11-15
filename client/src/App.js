import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import ErrorPage from "./pages/ErrorPage";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
// import PrivateRoute from './components/Routes/PrivateRoute';
// import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ManageCategory from "./pages/Admin/ManageCategory";
import Users from "./pages/Admin/Users";
import UpdateCategory from "./pages/Admin/UpdateCategory";
import CreateProduct from './pages/Admin/CreateProduct';
import Products from './pages/Admin/Products';
import UserDashboard from "./pages/user/UserDashboard";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import UserProfile from "./pages/user/UserProfile";
import AdminProfile from "./pages/Admin/AdminProfile";
import CartPage from "./pages/CartPage";
import Orders from './pages/user/Orders';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<Search/>} />

        <Route path="/cart" element={<CartPage/>} />
        <Route path="/product/:slug" element={<ProductDetails/>}/>

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/user" element={<UserDashboard />} />
        <Route path="/user/profile" element={<UserProfile/>}/>
        <Route path="/user/orders" element={<Orders/>}/>

        
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/profile" element={<AdminProfile />} />
        <Route path="/manage-category" element={<ManageCategory />} />
        <Route path="/manage-category/update-category/:id" element={<UpdateCategory/>}/>
        <Route path="/create-product" element={<CreateProduct />} />
        <Route path="/update-product/:slug" element={<UpdateProduct />} />
        <Route path="/manage-products" element={<Products/>}/>
        <Route path="/users" element={<Users />} />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
