import React, {useContext, useEffect, useState} from 'react';
import styles from './favourites.module.css';
import {AuthContext} from '../context/AuthContext';
import axios from 'axios';
import PropertyCard from '../components/PropertyCard';

const Favourites = () => {
  const {user} = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchFavorites = async () => {
        try {
          const res = await axios.get(`http://localhost:5000/users/${user.id}/favorites`);
          setFavorites(res.data);
        } catch (error) {
          console.error('Error fetching favorites:', error);
        }
      };
      fetchFavorites();
    }
  }, [user]);

  if (!user) {
    return <p>Please log in to view your favorites.</p>;
  }

  return (
    <div className={styles.favoritesContainer}>
      <h2>Your Favorites</h2>
      {favorites.length === 0 ? (
        <p>You have no favorite properties.</p>
      ) : (
        <div className={styles.list}>
          {favorites.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favourites;
