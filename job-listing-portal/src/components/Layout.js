// components/Layout.js
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main className="content">{children}</main>
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
