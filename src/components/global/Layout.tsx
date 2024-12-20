import React from 'react'
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import { NavbarContextProvider } from '../contexts/NavbarContext';

const Layout = () => {
  return (
    <div>
      <NavbarContextProvider>
        <Navbar />
      </NavbarContextProvider>
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout;