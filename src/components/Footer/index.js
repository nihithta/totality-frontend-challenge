import styles from './index.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>&copy; {new Date().getFullYear()} Totality Rentals. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
