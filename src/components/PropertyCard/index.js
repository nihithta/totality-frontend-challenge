import {useContext, useState} from 'react';
import styles from './index.module.css';
import {CartContext} from '../../context/CartContext';

const PropertyCard = ({property}) => {
  const {addToCart} = useContext(CartContext);
  const [showMessage, setShowMessage] = useState(false);

  const handleBookNow = () => {
    addToCart(property);
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  };

  return (
    <div className={styles.card}>
      <img src={property.image} alt={property.title} className={styles.image} />
      <div className={styles.content}>
        <h3>{property.title}</h3>
        <p>{property.description}</p>
        <p><strong>Price:</strong> ${property.price} / night</p>
        <p><strong>Location:</strong> {property.location}</p>
        <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
        <p><strong>Amenities:</strong> {property.amenities.join(', ')}</p>
        
        <button onClick={handleBookNow} className={styles.bookButton}>
          Book Now
        </button>

        {showMessage && <p className={styles.notification}>Added to Cart!</p>}
      </div>
    </div>
  );
};

export default PropertyCard;
