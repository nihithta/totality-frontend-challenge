import React, { useContext, useState } from 'react';
import styles from './auth.module.css';
import {AuthContext} from '../context/AuthContext';
import {useNavigate} from 'react-router-dom';

const Register = () => {
  const {register} = useContext(AuthContext);
  const [details, setDetails] = useState({
    name: '',
    email: '',
    password: '',
    avatar: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(details.name, details.email, details.password, details.avatar);
      setSuccessMessage('Registration successful!');
      navigate('/');
    } catch (error) {
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className={styles.authContainer}>
      <h2>Register</h2>
      {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label>Name:</label>
          <input type="text" name="name" value={details.name} onChange={handleChange} required />
        </div>
        <div className={styles.field}>
          <label>Email:</label>
          <input type="email" name="email" value={details.email} onChange={handleChange} required />
        </div>
        <div className={styles.field}>
          <label>Password:</label>
          <input type="password" name="password" value={details.password} onChange={handleChange} required />
        </div>
        <div className={styles.field}>
          <label>Avatar URL:</label>
          <input type="text" name="avatar" value={details.avatar} onChange={handleChange} placeholder="Optional" />
        </div>
        <button type="submit" className={styles.submitButton}>Register</button>
      </form>
    </div>
  );
};

export default Register;
