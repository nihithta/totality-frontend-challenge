import {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import styles from './index.module.css';
import {AuthContext} from '../../context/AuthContext';
import {CartContext} from '../../context/CartContext';

const Header = () => {
  const {user, logout} = useContext(AuthContext);
  const {cart} = useContext(CartContext);
  const [logoutMessage, setLogoutMessage] = useState('');

  const handleLogout = () => {
    logout();
    setLogoutMessage('Logged out successfully!');
    setTimeout(() => {
      setLogoutMessage('');
    }, 3000); 
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img 
          src="https://png.pngtree.com/png-vector/20190227/ourmid/pngtree-vector-rent-icon-png-image_708546.jpg" 
          alt="Totality Rentals Logo" 
          className={styles.logoImg} 
        />
        <Link to="/">Totality Rentals</Link>
      </div>

      <nav className={styles.nav}>
        <Link to="/">Home</Link>
        {user ? (
          <>
            <Link to="/profile">Profile</Link>
            <button onClick={handleLogout} className={styles.logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
        <Link to="/checkout" className={styles.cart}>
          Cart ({cart.length})
        </Link>
      </nav>
      {logoutMessage && <p className={styles.logoutMessage}>{logoutMessage}</p>}
    </header>
  );
};

export default Header;
