import React, { useState } from "react";
import { logo } from "../assets";
// Optionally install react-icons: npm install react-icons
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="w-full flex items-center justify-between p-4 bg-transparent text-white relative">
      {/* Logo Section */}
      <div className="flex items-center">
        <img src={logo} alt="logo" className="w-32 h-auto" />
      </div>

      {/* Desktop Links */}
      <ul className="hidden md:flex space-x-6 font-poppins">
        <li className="hover:text-gray-300">
          <a href="#how-it-works">How It Works</a>
        </li>
        <li className="hover:text-gray-300">
          <a href="#demo">Demo</a>
        </li>
        <li className="hover:text-gray-300">
          <a href="#early-access">Sign Up</a>
        </li>
        <li className="hover:text-gray-300">
          <a href="#contact-us">Contact Us</a>
        </li>
        <li className="hover:text-gray-300">
          <a href="/partners">Partners</a>
        </li>
        <li className="hover:text-gray-300">
          <a href="/blog">Blog</a>
        </li>
      </ul>

      {/* Mobile Menu Button */}
      <button
        onClick={toggleMenu}
        className="md:hidden text-white focus:outline-none"
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Mobile Dropdown */}
      {isOpen && (
        <ul className="absolute top-[60px] right-4 bg-gray-800 p-4 rounded-md md:hidden space-y-4">
          <li className="hover:text-gray-300">
            <a href="#how-it-works" onClick={toggleMenu}>How It Works</a>
          </li>
          <li className="hover:text-gray-300">
            <a href="#demo" onClick={toggleMenu}>Demo</a>
          </li>
          <li className="hover:text-gray-300">
            <a href="#early-access" onClick={toggleMenu}>Sign Up</a>
          </li>
          <li className="hover:text-gray-300">
            <a href="#contact-us" onClick={toggleMenu}>Contact Us</a>
          </li>
          <li className="hover:text-gray-300">
            <a href="/partners" onClick={toggleMenu}>Partners</a>
          </li>
          <li className="hover:text-gray-300">
            <a href="/blog" onClick={toggleMenu}>Blog</a>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
