import {useContext} from 'react';
import {Link} from 'react-router-dom';
import styles from './home.module.css';
import {CartContext} from '../context/CartContext';

const Home = () => {
  const {cart} = useContext(CartContext);

  return (
    <div className={styles.container}>
      <div className={styles.homeContainer}>
        <h1>Welcome to Totality Rentals</h1>
        <p>Browse through our wide collection of rentals to find your perfect match!</p>
        <div className={styles.buttons}>
          <Link to="/rentals" className={styles.button}>
            Browse Rentals
          </Link>
          <Link to="/profile" className={styles.button}>
            Get Started
          </Link>
        </div>
        <div className={styles.cartInfo}>
          <Link to="/checkout" className={styles.cart}>
            Go to Cart ({cart.length})
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
