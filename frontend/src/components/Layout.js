import React from 'react';
import Footer from './Footer';
import Header from './Header';
import { Helmet } from 'react-helmet';
import { Toaster } from 'react-hot-toast';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: '76vh' }}>
        <Toaster />
        {children}
      </main>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: 'Welcome To Eshop',
  description: 'mern stack project',
  keywords: 'mern, react, node, express, mongodb',
  author: 'srisai',
};

export default Layout;
