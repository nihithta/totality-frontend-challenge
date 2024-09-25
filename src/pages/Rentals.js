import PropertyList from '../components/PropertyList';
import styles from './rentals.module.css';

const Rentals = () => {
  return (
    <div className={styles.rentalsContainer}>
      <h1 className={styles.rentalsTitle}>Available Properties</h1>
      <PropertyList />
    </div>
  );
};

export default Rentals;
