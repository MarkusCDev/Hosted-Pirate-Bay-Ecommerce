/* Libaries */
import React from "react";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "semantic-ui-css/semantic.min.css";
import "./ttt.css"

/* Components */
import Login from './components/Login';
import Signup from './components/Signup';
import { UserAuthContextProvider } from './components/UserAuth';
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from './components/Navbar';
import Footer from "./components/Footer";
import Product1 from "./pages/Product1";
import ProductList from "./pages/ProductList";

/* Pages */
import Home from './pages/Home';
import Account from './pages/Account'
import Banking from "./pages/Banking";
import AddItem from "./pages/AddItem";
import Cart from "./pages/Cart";
import CheckoutPage from "./pages/Checkout";
import Transactions from "./pages/Transactions";

/* Categories */
import Boats from "./pages/category/Boats";
import Cannons from "./pages/category/Cannons";
import Maps from "./pages/category/Maps";
import Ships from "./pages/category/Ships";
import Weapons from "./pages/category/Weapons";
import Food from "./pages/category/Food";
import Pricedesc from "./pages/category/Pricedesc";
import Priceasc from "./pages/category/Priceasc";




/* Admin Pages */
import AdminNewItems from "./pages/admin/AdminNewItems";
import AdminUserData from "./pages/admin/AdminUserData";
import AdminReports from "./pages/admin/AdminReports";






function App() {
  return (
    <UserAuthContextProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/account"
          element={
            <ProtectedRoute>
              {" "}
              <Account />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/account/banking"
          element={
            <ProtectedRoute>
              {" "}
              <Banking />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/account/add-item"
          element={
            <ProtectedRoute>
              {" "}
              <AddItem />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/account/transaction-history"
          element={
            <ProtectedRoute>
              <Transactions />
            </ProtectedRoute>
          }
        />

        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:uid" element={<Product1 />} />

        <Route path="/category/Boats" element={<Boats />} />
        <Route path="/category/Cannons" element={<Cannons />} />
        <Route path="/category/Food" element={<Food />} />
        <Route path="/category/Maps" element={<Maps />} />
        <Route path="/category/Ships" element={<Ships />} />
        <Route path="/category/Weapons" element={<Weapons />} />
        <Route path="/category/Pricedesc" element={<Pricedesc />} />
        <Route path="/category/Priceasc" element={<Priceasc />} />

        {/* Admin Routes */}
        <Route
          path="/account/AdminUserData"
          element={
            <ProtectedRoute>
              <AdminUserData />
            </ProtectedRoute>
          }
        />
        <Route
          path="/account/AdminNewItems"
          element={
            <ProtectedRoute>
              <AdminNewItems />
            </ProtectedRoute>
          }
        />
        <Route
          path="/account/AdminReports"
          element={
            <ProtectedRoute>
              <AdminReports />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </UserAuthContextProvider>
  );
}

export default App;
