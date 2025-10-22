import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const localData = localStorage.getItem('cartItems');
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      return [];
    }
  });

  const [shippingAddress, setShippingAddress] = useState(() => {
    try {
      const localData = localStorage.getItem('shippingAddress');
      return localData ? JSON.parse(localData) : {};
    } catch (error) {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, size, color) => {
    // ... (your existing addToCart function... no changes)
    const newItem = {
      ...product,
      selectedSize: size,
      selectedColor: color,
      cartItemId: `${product._id}-${size}-${color}`,
    };
    const existingItem = cartItems.find(
      (item) => item.cartItemId === newItem.cartItemId
    );
    if (existingItem) {
      toast.warn('Item already in cart!');
    } else {
      setCartItems([...cartItems, newItem]);
      toast.success('Added to cart!');
    }
  };

  const removeFromCart = (cartItemId) => {
    // ... (your existing removeFromCart function... no changes)
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.cartItemId !== cartItemId)
    );
  };

  const saveShippingAddress = (data) => {
    // ... (your existing saveShippingAddress function... no changes)
    setShippingAddress(data);
    localStorage.setItem('shippingAddress', JSON.stringify(data));
  };

  // --- 1. ADD THIS NEW FUNCTION ---
  const clearCart = () => {
    setCartItems([]);
    setShippingAddress({});
    localStorage.removeItem('cartItems');
    localStorage.removeItem('shippingAddress');
  };

  const value = {
    cartItems,
    shippingAddress,
    addToCart,
    removeFromCart,
    saveShippingAddress,
    clearCart, // <-- 2. PASS IT DOWN
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};