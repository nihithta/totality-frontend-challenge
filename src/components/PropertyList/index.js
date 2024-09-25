import {useEffect, useState} from 'react';
import PropertyCard from '../PropertyCard';
import Filters from '../Filters';
import styles from './index.module.css';
import axios from 'axios';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProps, setFilteredProps] = useState([]);
  const [filters, setFilters] = useState({
    location: '',
    priceRange: [0, 1000],
    bedrooms: 0,
    amenities: []
  });

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get('http://localhost:5000/properties');
        setProperties(res.data);
        setFilteredProps(res.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };
    fetchProperties();
  }, []);

  useEffect(() => {
    let temp = [...properties];
    if (filters.location) {
      temp = temp.filter(prop => prop.location.toLowerCase().includes(filters.location.toLowerCase()));
    }
    temp = temp.filter(prop => prop.price >= filters.priceRange[0] && prop.price <= filters.priceRange[1]);
    if (filters.bedrooms) {
      temp = temp.filter(prop => prop.bedrooms >= filters.bedrooms);
    }
    if (filters.amenities.length > 0) {
      temp = temp.filter(prop => filters.amenities.every(amenity => prop.amenities.includes(amenity)));
    }
    setFilteredProps(temp);
  }, [filters, properties]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className={styles.container}>
      <Filters filters={filters} onFilterChange={handleFilterChange} />
      <div className={styles.list}>
        {filteredProps.length > 0 ? (
          filteredProps.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))
        ) : (
          <p>No properties found matching your criteria.</p>
        )}
      </div>
    </div>
  );
};

export default PropertyList;
