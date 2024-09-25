import {useContext, useState} from 'react';
import styles from './checkout.module.css';
import {CartContext} from '../context/CartContext';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import Cart from '../components/Cart';

const Checkout = () => {
  const {cart, totalCost, clearCart} = useContext(CartContext);
  const [bookingDetails, setBookingDetails] = useState({
    name: '',
    email: '',
    phone: '',
    payment: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setBookingDetails({ ...bookingDetails, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const booking = {
        ...bookingDetails,
        cart,
        totalCost,
        date: new Date().toISOString()
      };
      await axios.post('http://localhost:5000/bookings', booking);
      clearCart();
      alert('Booking successful!');
      navigate('/');
    } catch (error) {
      console.error('Error processing booking:', error);
      alert('There was an error processing your booking.');
    }
  };

  return (
    <div className={styles.checkoutContainer}>
      <h2>Checkout</h2>
      <Cart />
      {cart.length === 0 ? (
        <p>Your cart is empty. <a href="/">Browse properties</a></p>
      ) : (
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label>Name:</label>
            <input type="text" name="name" value={bookingDetails.name} onChange={handleChange} required />
          </div>
          <div className={styles.field}>
            <label>Email:</label>
            <input type="email" name="email" value={bookingDetails.email} onChange={handleChange} required />
          </div>
          <div className={styles.field}>
            <label>Phone:</label>
            <input type="tel" name="phone" value={bookingDetails.phone} onChange={handleChange} required />
          </div>
          <div className={styles.field}>
            <label>Payment Details:</label>
            <input type="text" name="payment" value={bookingDetails.payment} onChange={handleChange} required placeholder="Card Number" />
          </div>
          <div className={styles.summary}>
            <h3>Total: ${totalCost}</h3>
            <button type="submit" className={styles.submitButton}>Confirm Booking</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Checkout;
