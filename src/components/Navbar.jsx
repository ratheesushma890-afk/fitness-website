import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiUser,
  FiArrowUpRight,
} from "react-icons/fi";
import { FaDumbbell } from "react-icons/fa";

import "./Navbar.css";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMenu = () => {
    setMobileOpen(false);
  };

  return (
    <>
      <header className="gym-navbar">
        <div className="gym-nav-container">

          {/* ================= LOGO ================= */}
          <Link
            to="/"
            className="gym-logo"
            onClick={closeMenu}
          >
            <div className="gym-logo-icon">
              <FaDumbbell />
            </div>

            <div className="gym-logo-text">
              <span>FIT</span>
              <strong>ZONE</strong>
            </div>
          </Link>


          {/* ================= DESKTOP NAV ================= */}
          <nav className="gym-nav-links">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "active" : ""
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "active" : ""
              }
            >
              About
            </NavLink>

            <NavLink
              to="/classes"
              className={({ isActive }) =>
                isActive ? "active" : ""
              }
            >
              Classes
            </NavLink>

            <NavLink
              to="/trainers"
              className={({ isActive }) =>
                isActive ? "active" : ""
              }
            >
              Trainers
            </NavLink>

            <NavLink
              to="/membership"
              className={({ isActive }) =>
                isActive ? "active" : ""
              }
            >
              Membership
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? "active" : ""
              }
            >
              Contact
            </NavLink>
          </nav>


          {/* ================= RIGHT SIDE ================= */}
          <div className="gym-nav-actions">

            <Link to="/login" className="gym-login">
              <FiUser />
              <span>Login</span>
            </Link>

            <Link to="/join" className="gym-join-btn">
              Join Now
              <FiArrowUpRight />
            </Link>

            <button
              className="gym-menu-btn"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Open menu"
            >
              {mobileOpen ? <FiX /> : <FiMenu />}
            </button>

          </div>
        </div>
      </header>


      {/* ================= MOBILE MENU ================= */}
      <div
        className={`gym-mobile-menu ${
          mobileOpen ? "show" : ""
        }`}
      >
        <NavLink to="/" onClick={closeMenu}>
          Home
        </NavLink>

        <NavLink to="/about" onClick={closeMenu}>
          About
        </NavLink>

        <NavLink to="/classes" onClick={closeMenu}>
          Classes
        </NavLink>

        <NavLink to="/trainers" onClick={closeMenu}>
          Trainers
        </NavLink>

        <NavLink to="/membership" onClick={closeMenu}>
          Membership
        </NavLink>

        <NavLink to="/contact" onClick={closeMenu}>
          Contact
        </NavLink>

        <Link
          to="/login"
          className="mobile-login"
          onClick={closeMenu}
        >
          <FiUser />
          Login
        </Link>

        <Link
          to="/join"
          className="mobile-join"
          onClick={closeMenu}
        >
          Join Now
          <FiArrowUpRight />
        </Link>
      </div>
    </>
  );
};

export default Navbar;