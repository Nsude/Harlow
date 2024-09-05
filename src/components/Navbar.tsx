import React, { useState } from 'react'
import Logo from '../assets/icons/Logo';
import { Link } from 'react-router-dom';
import ProfileIcon from '../assets/icons/ProfileIcon';
import CartIcon from '../assets/icons/CartIcon';
import SearchIcon from '../assets/icons/SearchIcon';

const Navbar = () => {
  const [mobileMenuText, setMobileMenuText] = useState<string>("Menu");
  return (
    <nav className='navbar-container flex jc-sb'>
      <button className="menu">{mobileMenuText}</button>

      {/* logo */}
      <div className="logo-search-con flex">
        <Logo />
        <div className="search-box">
          <input type="text" placeholder="Search" />
        </div>
      </div>

      {/* Destop Links */}
      <div className="desktop-links">
        <Link to={"/men"}>Men</Link>
        <Link to={"/women"}>Women</Link>
        <Link to={"/kids"}>Kids</Link>
        <Link to={"/accessories"}>Accessories</Link>
      </div>

      <div className="side-links flex cg-15">
        <button className="m-search-button"><SearchIcon /></button>
        <Link to={"/profile"} className="profile-link"><ProfileIcon /> </Link>
        <Link to={"/cart"}><CartIcon /></Link>
      </div>
    </nav>
  )
}

export default Navbar;