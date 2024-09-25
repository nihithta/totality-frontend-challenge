import React, { useContext } from 'react';
import styles from './index.module.css';
import { CartContext } from '../../context/CartContext';

const Cart = () => {
  const {cart, updateQuantity, removeFromCart} = useContext(CartContext);

  const handleIncrease = (id) => {
    updateQuantity(id, 1);
  };

  const handleDecrease = (id) => {
    updateQuantity(id, -1);
  };

  return (
    <div className={styles.cartContainer}>
      <h2>Your Booked Properties</h2>
      {cart.length === 0 ? (
        <br></br>
      ) : (
        <div>
          {cart.map(item => (
            <div key={item.property.id} className={styles.cartItem}>
              <img src={item.property.image} alt={item.property.title} className={styles.image} />
              <div className={styles.details}>
                <h3>{item.property.title}</h3>
                <p>{item.property.location}</p>
                <p>Booking Dates: {item.bookingDates}</p>
                <p>Price: ${item.property.price} / night</p>
                <div className={styles.quantity}>
                  <button onClick={() => handleDecrease(item.property.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncrease(item.property.id)}>+</button>
                </div>
                <button onClick={() => removeFromCart(item.property.id)} className={styles.remove}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
