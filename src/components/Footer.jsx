
import React from "react";
import { Link } from "react-router-dom";

import {
  FiArrowRight,
  FiArrowUp,
  FiInstagram,
  FiFacebook,
  FiYoutube,
  FiMapPin,
  FiPhone,
  FiMail,
  FiClock,
} from "react-icons/fi";

import { FaDumbbell, FaWhatsapp } from "react-icons/fa";

import "./Footer.css";

const Footer = () => {

  /* =========================================
     SCROLL TO TOP
  ========================================= */

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =========================================
     QUICK LINKS
  ========================================= */

  const quickLinks = [
    { title: "Home", path: "/" },
    { title: "About Us", path: "/about" },
    { title: "Classes", path: "/classes" },
    { title: "Trainers", path: "/trainers" },
    { title: "Membership", path: "/membership" },
    { title: "Contact", path: "/contact" },
  ];

  /* =========================================
     OUR CLASSES — CATEGORY LINKS
  ========================================= */

  const classLinks = [
    {
      title: "Strength Training",
      category: "strength",
    },
    {
      title: "Cardio Fitness",
      category: "cardio",
    },
    {
      title: "Yoga & Flexibility",
      category: "yoga",
    },
    {
      title: "Personal Training",
      category: "personal",
    },
  ];

  /* =========================================
     MEMBERSHIP LINKS
  ========================================= */

  const membershipLinks = [
    {
      title: "Basic Plan",
      path: "/membership",
    },
    {
      title: "Standard Plan",
      path: "/membership",
    },
    {
      title: "Premium Plan",
      path: "/membership",
    },
    {
      title: "Join Now",
      path: "/join",
    },
  ];

  /* =========================================
     SOCIAL LINKS
  ========================================= */

  const socialLinks = [
    {
      title: "Instagram",
      icon: <FiInstagram />,
      url: "https://www.instagram.com/",
    },
    {
      title: "Facebook",
      icon: <FiFacebook />,
      url: "https://www.facebook.com/",
    },
    {
      title: "YouTube",
      icon: <FiYoutube />,
      url: "https://www.youtube.com/",
    },
    {
      title: "WhatsApp",
      icon: <FaWhatsapp />,
      url: "https://wa.me/919876543210",
    },
  ];

  return (
    <footer className="fzft-root">

      {/* =====================================
          MAIN FOOTER
      ===================================== */}

      <div className="fzft-main">

        <div className="fzft-main-grid">

          {/* =====================================
              BRAND
          ===================================== */}

          <div className="fzft-brand">

            <Link
              to="/"
              className="fzft-brand-logo"
              onClick={scrollTop}
            >
              <span className="fzft-brand-icon">
                <FaDumbbell />
              </span>

              <span className="fzft-brand-name">
                <span>FIT</span>
                <strong>ZONE</strong>
              </span>
            </Link>

            <p className="fzft-brand-description">
              More than a gym. A place to become
              stronger, healthier and more confident
              every single day.
            </p>

            {/* SOCIAL MEDIA */}

            <div className="fzft-social-list">

              {socialLinks.map((social) => (
                <a
                  key={social.title}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fzft-social-button"
                  title={social.title}
                  aria-label={social.title}
                >
                  {social.icon}
                </a>
              ))}

            </div>

          </div>

          {/* =====================================
              QUICK LINKS
          ===================================== */}

          <div className="fzft-links-block">

            <h3 className="fzft-block-title">
              Quick Links
            </h3>

            <ul className="fzft-link-list">

              {quickLinks.map((link) => (
                <li key={link.path}>

                  <Link
                    to={link.path}
                    className="fzft-nav-link"
                    onClick={scrollTop}
                  >
                    <FiArrowRight />
                    <span>{link.title}</span>
                  </Link>

                </li>
              ))}

            </ul>

          </div>

          {/* =====================================
              OUR CLASSES
          ===================================== */}

          <div className="fzft-classes-block">

            <h3 className="fzft-block-title">
              Our Classes
            </h3>

            <ul className="fzft-link-list">

              {classLinks.map((item) => (
                <li key={item.category}>

                  <Link
                    to={`/classes?category=${item.category}`}
                    className="fzft-nav-link"
                    onClick={scrollTop}
                  >
                    <FiArrowRight />

                    <span>
                      {item.title}
                    </span>
                  </Link>

                </li>
              ))}

            </ul>

          </div>

          {/* =====================================
              MEMBERSHIP
          ===================================== */}

          <div className="fzft-membership-block">

            <h3 className="fzft-block-title">
              Membership
            </h3>

            <ul className="fzft-link-list">

              {membershipLinks.map((item) => (
                <li key={item.title}>

                  <Link
                    to={item.path}
                    className="fzft-nav-link"
                    onClick={scrollTop}
                  >
                    <FiArrowRight />

                    <span>
                      {item.title}
                    </span>
                  </Link>

                </li>
              ))}

            </ul>

          </div>

          {/* =====================================
              GET IN TOUCH
          ===================================== */}

          <div className="fzft-contact-block">

            <h3 className="fzft-block-title">
              Get In Touch
            </h3>

            <div className="fzft-contact-list">

              {/* ADDRESS */}

              <Link
                to="/contact"
                className="fzft-contact-row"
                onClick={scrollTop}
              >
                <span className="fzft-contact-icon">
                  <FiMapPin />
                </span>

                <span className="fzft-contact-copy">
                  <strong>
                    Fitness Street, Your City
                  </strong>

                  <small>
                    Visit Us
                  </small>
                </span>
              </Link>

              {/* PHONE */}

              <a
                href="tel:+919876543210"
                className="fzft-contact-row"
              >
                <span className="fzft-contact-icon">
                  <FiPhone />
                </span>

                <span className="fzft-contact-copy">
                  <strong>
                    +91 98765 43210
                  </strong>

                  <small>
                    Call Us
                  </small>
                </span>
              </a>

              {/* EMAIL */}

              <a
                href="mailto:hello@fitzone.com"
                className="fzft-contact-row"
              >
                <span className="fzft-contact-icon">
                  <FiMail />
                </span>

                <span className="fzft-contact-copy">
                  <strong>
                    hello@fitzone.com
                  </strong>

                  <small>
                    Email Us
                  </small>
                </span>
              </a>

              {/* OPENING HOURS */}

              <div className="fzft-contact-row">

                <span className="fzft-contact-icon">
                  <FiClock />
                </span>

                <span className="fzft-contact-copy">
                  <strong>
                    Mon - Sun • 5 AM - 11 PM
                  </strong>

                  <small>
                    Opening Hours
                  </small>
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* =====================================
            COPYRIGHT
        ===================================== */}

        <div className="fzft-bottom">

          <div className="fzft-bottom-inner">

            <p className="fzft-copyright">
              © {new Date().getFullYear()} FIT ZONE.
              All Rights Reserved.
            </p>

            {/* POLICIES */}

            <div className="fzft-policy">

              <Link
                to="/privacy-policy"
                onClick={scrollTop}
              >
                Privacy Policy
              </Link>

              <span className="fzft-policy-divider" />

              <Link
                to="/terms-conditions"
                onClick={scrollTop}
              >
                Terms & Conditions
              </Link>

            </div>

            {/* BACK TO TOP */}

            <button
              type="button"
              className="fzft-back-top"
              onClick={scrollTop}
            >
              Back To Top

              <span>
                <FiArrowUp />
              </span>
            </button>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;
