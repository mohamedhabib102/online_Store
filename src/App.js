// import logo from './logo.svg';
// import './App.css';

import { Route, Routes } from "react-router-dom";
import Register from "./ComponentsProducts/Auth/Register";
import Login from "./ComponentsProducts/Auth/Login";
import Header from "./ComponentsProducts/Dashboard/Header/Header";
import ContentDashboard from "./ComponentsProducts/Dashboard/ContentDashboard";
import Home from "./ComponentsProducts/Home/Home";
import Users from "./ComponentsProducts/Dashboard/Users";
import ProtectedRoute from "./ComponentsProducts/Auth/ProtectedRoute";
import Product from "./ComponentsProducts/Products/Product";
import ProductsD from "./ComponentsProducts/Dashboard/ProductsDash/ProductsD";
import AddProduct from "./ComponentsProducts/Dashboard/ProductsDash/AddProduct";
import AddBrand from "./ComponentsProducts/Dashboard/BrandDash/AddBrand";
import Brand from "./ComponentsProducts/Dashboard/BrandDash/Brand";
import EditProduct from "./ComponentsProducts/Dashboard/ProductsDash/EditProduct";
import EditBrand from "./ComponentsProducts/Dashboard/BrandDash/EditBrand";
import GetBrand from "./ComponentsProducts/Brands/Brands";
import CartProduct from "./ComponentsProducts/Cart/CartProduct";
import Favourite from "./ComponentsProducts/Cart/Favourite";
import Payment from "./ComponentsProducts/Cart/Payment";

// This Last Project
// import NavbarApp from "./Components/Navbar";
// import Products from "./Components/Products"
// import Cart from "./Components/Cart"

function App() {
  return (
    <div className="App">
    <Routes>
        <Route path="/"  element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/products"  element={<Product />}/>
        <Route path="/brands"  element={<GetBrand />}/>
        <Route path="/cart"  element={<CartProduct />}/>
        <Route path="cart/payment"  element={<Payment />}/>
        <Route path="/favourite"  element={<Favourite />}/>
        <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<ContentDashboard />}>
              <Route path="users" element={<Users />}/>
              <Route path="products" element={<ProductsD />}/>
              <Route path="brands" element={<Brand />}/>
              <Route path="products/addProduct" element={<AddProduct />}/>
              <Route path="products/edit/:Id" element={<EditProduct />}/>
              <Route path="brands/addBrand" element={<AddBrand />}/>
              <Route path="brands/editBrand/:Id" element={<EditBrand />}/>
            </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
