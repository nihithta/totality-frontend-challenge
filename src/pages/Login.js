import {useContext, useState} from 'react';
import styles from './auth.module.css';
import {AuthContext} from '../context/AuthContext';
import {useNavigate} from 'react-router-dom';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(credentials.email, credentials.password);
      setSuccessMessage('Login successful!'); // Set success message
      navigate('/');
    } catch (error) {
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className={styles.authContainer}>
      <h2>Login</h2>
      {successMessage && <p className={styles.successMessage}>{successMessage}</p>} {/* Display success message */}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label>Email:</label>
          <input type="email" name="email" value={credentials.email} onChange={handleChange} required />
        </div>
        <div className={styles.field}>
          <label>Password:</label>
          <input type="password" name="password" value={credentials.password} onChange={handleChange} required />
        </div>
        <button type="submit" className={styles.submitButton}>Login</button>
      </form>
    </div>
  );
};

export default Login;
