import React, { useState } from 'react';
import Layout from '../../components/Layout';
import axios from 'axios';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/Auth';
import '../../styles/AuthStyles.css';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://mern-eshop-u016.onrender.com/api/auth/login', {
        email,
        password,
      });
      if (res && res.data.success) {
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem('auth', JSON.stringify(res.data));
        navigate(location.state || '/');
        toast.success(res.data && res.data.message);
        // alert(res.data.message);
      } else {
        toast.error(res.data && res.data.message);
        // alert(res.data.message);
      }
    } catch (error) {
      // console.log(error);
      toast.error('Something went wrong!');
      // alert('Something went wrong!');
    }
  };

  return (
    <Layout title={'Login - Eshop App'}>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h2 className="title">Login Form</h2>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3 text-center ">
            <Link className="text-decoration-none" to="/forgot-password">
              Forgot Password
            </Link>
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
