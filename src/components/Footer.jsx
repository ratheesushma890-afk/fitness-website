import React from "react";
import { Link, useNavigate } from "react-router-dom";

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

import "./Footer.css";

const Footer = () => {
  const navigate = useNavigate();

  /* =========================================================
     PAGE NAVIGATION
  ========================================================= */

  const goToPage = (path) => {
    navigate(path);

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 50);
  };

  /* =========================================================
     SOCIAL LINKS
  ========================================================= */

  const openSocial = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <footer className="fzft-root">

      {/* =====================================================
          TOP CTA
      ===================================================== */}

      <section className="fzft-cta">

        <div className="fzft-cta-overlay" />

        <div className="fzft-cta-inner">

          <div className="fzft-cta-copy">

            <div className="fzft-eyebrow">
              <span />
              START TODAY
              <span />
            </div>

            <h2 className="fzft-cta-title">
              READY TO BECOME
              <strong> STRONGER?</strong>
            </h2>

            <p className="fzft-cta-description">
              Your goals. Your pace. Your transformation starts here.
            </p>

          </div>

          <button
            type="button"
            className="fzft-join-button"
            onClick={() => goToPage("/join")}
          >
            JOIN NOW
            <FiArrowRight />
          </button>

        </div>

      </section>


      {/* =====================================================
          MAIN FOOTER
      ===================================================== */}

      <section className="fzft-main">

        <div className="fzft-main-grid">

          {/* =================================================
              BRAND
          ================================================= */}

          <div className="fzft-brand">

            <button
              type="button"
              className="fzft-brand-logo"
              onClick={() => goToPage("/")}
            >
              <span className="fzft-brand-icon">
                ✚
              </span>

              <div className="fzft-brand-name">
                FIT<span>ZONE</span>

                <small>
                  STRONGER EVERYDAY
                </small>
              </div>
            </button>

            <p className="fzft-brand-description">
              More than a gym. A place to become stronger,
              healthier and more confident every single day.
            </p>


            {/* SOCIALS */}

            <div className="fzft-social-list">

              <button
                type="button"
                className="fzft-social-button"
                aria-label="Open Instagram"
                title="Instagram"
                onClick={() =>
                  openSocial("https://www.instagram.com/")
                }
              >
                <FiInstagram />
              </button>

              <button
                type="button"
                className="fzft-social-button"
                aria-label="Open Facebook"
                title="Facebook"
                onClick={() =>
                  openSocial("https://www.facebook.com/")
                }
              >
                <FiFacebook />
              </button>

              <button
                type="button"
                className="fzft-social-button"
                aria-label="Open YouTube"
                title="YouTube"
                onClick={() =>
                  openSocial("https://www.youtube.com/")
                }
              >
                <FiYoutube />
              </button>

            </div>

          </div>


          {/* =================================================
              QUICK LINKS
          ================================================= */}

          <div className="fzft-links-block">

            <h3 className="fzft-block-title">
              QUICK LINKS
            </h3>

            <ul className="fzft-link-list">

              <li>
                <button
                  type="button"
                  className="fzft-nav-link"
                  onClick={() => goToPage("/")}
                >
                  <FiArrowRight />
                  Home
                </button>
              </li>

              <li>
                <button
                  type="button"
                  className="fzft-nav-link"
                  onClick={() => goToPage("/classes")}
                >
                  <FiArrowRight />
                  Classes
                </button>
              </li>

              <li>
                <button
                  type="button"
                  className="fzft-nav-link"
                  onClick={() => goToPage("/trainers")}
                >
                  <FiArrowRight />
                  Trainers
                </button>
              </li>

              <li>
                <button
                  type="button"
                  className="fzft-nav-link"
                  onClick={() => goToPage("/about")}
                >
                  <FiArrowRight />
                  About Us
                </button>
              </li>

              <li>
                <button
                  type="button"
                  className="fzft-nav-link"
                  onClick={() => goToPage("/contact")}
                >
                  <FiArrowRight />
                  Contact
                </button>
              </li>

            </ul>

          </div>


          {/* =================================================
              MEMBERSHIP
          ================================================= */}

          <div className="fzft-membership-block">

            <h3 className="fzft-block-title">
              MEMBERSHIP
            </h3>

            <ul className="fzft-link-list">

              <li>
                <button
                  type="button"
                  className="fzft-nav-link"
                  onClick={() => goToPage("/membership")}
                >
                  <FiArrowRight />
                  Basic Plan
                </button>
              </li>

              <li>
                <button
                  type="button"
                  className="fzft-nav-link"
                  onClick={() => goToPage("/membership")}
                >
                  <FiArrowRight />
                  Pro Plan
                </button>
              </li>

              <li>
                <button
                  type="button"
                  className="fzft-nav-link"
                  onClick={() => goToPage("/membership")}
                >
                  <FiArrowRight />
                  Elite Plan
                </button>
              </li>

              <li>
                <button
                  type="button"
                  className="fzft-nav-link"
                  onClick={() => goToPage("/membership-success")}
                >
                  <FiArrowRight />
                  MembershipSuccess
                </button>
              </li>

            </ul>

          </div>


          {/* =================================================
              CONTACT
          ================================================= */}

          <div className="fzft-contact-block">

            <h3 className="fzft-block-title">
              GET IN TOUCH
            </h3>


            {/* ADDRESS */}

            <button
              type="button"
              className="fzft-contact-row"
              onClick={() => goToPage("/contact")}
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
            </button>


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


            {/* HOURS */}

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

      </section>


      {/* =====================================================
          BOTTOM FOOTER
      ===================================================== */}

      <div className="fzft-bottom">

        <div className="fzft-bottom-inner">

          <p className="fzft-copyright">
            © {new Date().getFullYear()} FitZone.
            All Rights Reserved.
          </p>


          {/* POLICY */}

          <div className="fzft-policy">

            <Link
              to="/privacy-policy"
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                })
              }
            >
              Privacy Policy
            </Link>

            <span className="fzft-policy-divider" />

            <Link
              to="/terms-conditions"
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                })
              }
            >
              Terms & Conditions
            </Link>

          </div>


          {/* BACK TO TOP */}

          <button
            type="button"
            className="fzft-back-top"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
          >
            BACK TO TOP

            <span>
              <FiArrowUp />
            </span>
          </button>

        </div>

      </div>

    </footer>
  );
};

export default Footer;