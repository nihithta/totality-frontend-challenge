import { useState } from 'react';
import styles from './index.module.css';

const Filters = ({filters, onFilterChange}) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleChange = (e) => {
    const {name, value, checked} = e.target;
    if (name === 'amenities') {
      let newAmenities = [...localFilters.amenities];
      if (checked) {
        newAmenities.push(value);
      } else {
        newAmenities = newAmenities.filter(item => item !== value);
      }
      setLocalFilters({ ...localFilters, amenities: newAmenities });
    } else if (name === 'bedrooms') {
      setLocalFilters({ ...localFilters, bedrooms: parseInt(value) });
    } else if (name === 'location') {
      setLocalFilters({ ...localFilters, location: value });
    } else if (name === 'priceMin' || name === 'priceMax') {
      const priceMin = name === 'priceMin' ? parseInt(value) : localFilters.priceRange[0];
      const priceMax = name === 'priceMax' ? parseInt(value) : localFilters.priceRange[1];
      setLocalFilters({ ...localFilters, priceRange: [priceMin, priceMax] });
    }
  };

  const applyFilters = () => {
    onFilterChange(localFilters);
  };

  const resetFilters = () => {
    const reset = {
      location: '',
      priceRange: [0, 1000],
      bedrooms: 0,
      amenities: []
    };
    setLocalFilters(reset);
    onFilterChange(reset);
  };

  return (
    <div className={styles.filters}>
      <h3>Filters</h3>
      <div className={styles.filterGroup}>
        <label>Location:</label>
        <input
          type="text"
          name="location"
          value={localFilters.location}
          onChange={handleChange}
          placeholder="Enter location"
        />
      </div>
      <div className={styles.filterGroup}>
        <label>Price Range:</label>
        <div className={styles.priceRange}>
          <input
            type="number"
            name="priceMin"
            value={localFilters.priceRange[0]}
            onChange={handleChange}
            placeholder="Min"
          />
          <span> - </span>
          <input
            type="number"
            name="priceMax"
            value={localFilters.priceRange[1]}
            onChange={handleChange}
            placeholder="Max"
          />
        </div>
      </div>
      <div className={styles.filterGroup}>
        <label>Bedrooms:</label>
        <select name="bedrooms" value={localFilters.bedrooms} onChange={handleChange}>
          <option value={0}>Any</option>
          <option value={1}>1+</option>
          <option value={2}>2+</option>
          <option value={3}>3+</option>
          <option value={4}>4+</option>
        </select>
      </div>
      <div className={styles.filterGroup}>
        <label>Amenities:</label>
        <div className={styles.amenities}>
          <label>
            <input
              type="checkbox"
              name="amenities"
              value="WiFi"
              checked={localFilters.amenities.includes('WiFi')}
              onChange={handleChange}
            />
            WiFi
          </label>
          <label>
            <input
              type="checkbox"
              name="amenities"
              value="Air Conditioning"
              checked={localFilters.amenities.includes('Air Conditioning')}
              onChange={handleChange}
            />
            Air Conditioning
          </label>
          <label>
            <input
              type="checkbox"
              name="amenities"
              value="Pool"
              checked={localFilters.amenities.includes('Pool')}
              onChange={handleChange}
            />
            Pool
          </label>
          <label>
            <input
              type="checkbox"
              name="amenities"
              value="Parking"
              checked={localFilters.amenities.includes('Parking')}
              onChange={handleChange}
            />
            Parking
          </label>
          <label>
            <input
              type="checkbox"
              name="amenities"
              value="Kitchen"
              checked={localFilters.amenities.includes('Kitchen')}
              onChange={handleChange}
            />
            Kitchen
          </label>
        </div>
      </div>
      <div className={styles.buttons}>
        <button onClick={applyFilters} className={styles.applyButton}>Apply</button>
        <button onClick={resetFilters} className={styles.resetButton}>Reset</button>
      </div>
    </div>
  );
};

export default Filters;
