import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styles from './App.module.css';

// Import Components
import Navbar from './components/Navbar.jsx';
import AdminRoute from './components/AdminRoute.jsx'; // <-- 1. IMPORT THE GUARD

// Import Pages
import HomePage from './pages/HomePage.jsx';
import CartPage from './pages/CartPage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import AdminProductList from './pages/AdminProductList.jsx';
import AdminCreateProduct from './pages/AdminCreateProduct.jsx';
import AdminEditProduct from './pages/AdminEditProduct.jsx';
import AdminOrderList from './pages/AdminOrderList.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import ShippingPage from './pages/ShippingPage.jsx';
import PlaceOrderPage from './pages/PlaceOrderPage.jsx';
import MyOrdersPage from './pages/MyOrdersPage.jsx';
import OrderDetailPage from './pages/OrderDetailPage.jsx';


function App() {
  return (
    <BrowserRouter>
      <div className={styles.appContainer}>
        <Navbar />
        <main className={styles.mainContent}>
          <Routes>
            {/* --- Public Routes --- */}
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* --- Protected Admin Routes --- */}
            {/* 2. ALL ADMIN ROUTES GO INSIDE HERE */}
            <Route path="/admin" element={<AdminRoute />}>
              <Route path="products" element={<AdminProductList />} />
              <Route path="product/create" element={<AdminCreateProduct />} />
              <Route path="product/edit/:id" element={<AdminEditProduct />} />
              <Route path="orders" element={<AdminOrderList />} />
            </Route>

            <Route path="" element={<PrivateRoute />}>
              <Route path="/shipping" element={<ShippingPage />} />
              {/* We'll add /payment and /order/:id here later */}
              <Route path="/placeorder" element={<PlaceOrderPage />} />
              <Route path="/myorders" element={<MyOrdersPage />} />
              <Route path="/order/:id" element={<OrderDetailPage />} />
            </Route>
            
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;