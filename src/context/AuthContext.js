import {createContext, useState, useEffect} from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('totalityUser'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('totalityUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('totalityUser');
    }
  }, [user]);

  const login = async (email, password) => {
    const res = await axios.get(`http://localhost:5000/users?email=${email}&password=${password}`);
    if (res.data.length > 0) {
      setUser(res.data[0]);
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const register = async (name, email, password, avatar) => {
    const newUser = { name, email, password, avatar };
    const res = await axios.post('http://localhost:5000/users', newUser);
    setUser(res.data);
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (updatedDetails) => {
    setUser({ ...user, ...updatedDetails });
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
