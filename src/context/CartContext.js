import {createContext, useState, useEffect} from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('totalityCart'));
    if (storedCart) {
      setCart(storedCart);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('totalityCart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (property) => {
    const existing = cart.find(item => item.property.id === property.id);
    if (existing) {
      setCart(cart.map(item =>
        item.property.id === property.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { property, quantity: 1, bookingDates: '2024-10-01 to 2024-10-05' }]);
    }
  };

  const updateQuantity = (id, delta) => {
    setCart(cart.map(item =>
      item.property.id === id
        ? { ...item, quantity: item.quantity + delta > 0 ? item.quantity + delta : 1 }
        : item
    ));
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.property.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalCost = cart.reduce((acc, item) => acc + item.property.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart, totalCost }}>
      {children}
    </CartContext.Provider>
  );
};
