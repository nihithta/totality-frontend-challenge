import React, {useContext, useState} from 'react';
import styles from './profile.module.css';
import {AuthContext} from '../context/AuthContext';
import axios from 'axios';

const UserProfile = () => {
  const {user, updateUser} = useContext(AuthContext);
  const [details, setDetails] = useState({
    name: user?.name || '',
    email: user?.email || '',
    avatar: user?.avatar || ''
  });

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/users/${user.id}`, details);
      updateUser(details);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile.');
    }
  };

  if (!user) {
    return <p>Please log in to view your profile.</p>;
  }

  const getInitials = (name) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className={styles.profileContainer}>
      <h2>User Profile</h2>

      <div className={styles.profileOverview}>
        {user.avatar ? (
          <img src={user.avatar} alt="User Avatar" className={styles.avatar} />
        ) : (
          <div className={styles.avatarPlaceholder}>
            {getInitials(user.name)}
          </div>
        )}
        <div className={styles.userInfo}>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      </div>

      <form onSubmit={handleUpdate} className={styles.form}>
        <div className={styles.field}>
          <label>Name:</label>
          <input type="text" name="name" value={details.name} onChange={handleChange} required />
        </div>
        <div className={styles.field}>
          <label>Email:</label>
          <input type="email" name="email" value={details.email} onChange={handleChange} required />
        </div>
        <div className={styles.field}>
          <label>Avatar URL:</label>
          <input type="text" name="avatar" value={details.avatar} onChange={handleChange} />
        </div>
        <button type="submit" className={styles.updateButton}>Update Profile</button>
      </form>
    </div>
  );
};

export default UserProfile;
