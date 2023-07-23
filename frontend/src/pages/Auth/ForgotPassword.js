import React, { useState } from 'react';
import Layout from '../../components/Layout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/AuthStyles.css';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [answer, setAnswer] = useState('');
  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://mern-eshop-u016.onrender.com/api/auth/forgot-password', {
        email,
        newPassword,
        answer,
      });
      if (res && res.data.success) {
        navigate('/login');
        toast.success(res.data && res.data.message);
        // alert(res.data.message);
      } else {
        toast.error(res.data.message);
        // alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong!');
      // alert('Something went wrong!');
    }
  };
  return (
    <Layout>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h2 className="title">Forgot Password</h2>
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
              type="text"
              className="form-control"
              id="answer"
              placeholder="Enter your secret answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Change Password
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
