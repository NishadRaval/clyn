import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styles from './App.module.css';
import { ToastContainer } from 'react-toastify'; // <-- 1. IMPORT
import 'react-toastify/dist/ReactToastify.css'; // <-- 1. IMPORT CSS

// Import Components
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx'; // Remove .jsx
import AdminRoute from './components/AdminRoute.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';

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

            {/* --- Protected Admin Routes --- */}
            <Route path="/admin" element={<AdminRoute />}>
              <Route path="products" element={<AdminProductList />} />
              <Route path="product/create" element={<AdminCreateProduct />} />
              <Route path="product/edit/:id" element={<AdminEditProduct />} />
              <Route path="orders" element={<AdminOrderList />} />
            </Route>

            {/* --- Protected User Routes --- */}
            <Route path="" element={<PrivateRoute />}>
              <Route path="/shipping" element={<ShippingPage />} />
              <Route path="/placeorder" element={<PlaceOrderPage />} />
              <Route path="/myorders" element={<MyOrdersPage />} />
              <Route path="/order/:id" element={<OrderDetailPage />} />
            </Route>

          </Routes>
        </main>
        <Footer /> {/* Add Footer */}
        {/* 2. ADD TOAST CONTAINER */}
        <ToastContainer
          position="bottom-right" // Position on screen
          autoClose={3000}        // Close after 3 seconds
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark" // Use dark theme to match our site
        />
      </div>
    </BrowserRouter>
  );
}

export default App;