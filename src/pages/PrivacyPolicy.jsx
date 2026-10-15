import React from "react";

import {
  FiActivity,
  FiBarChart2,
  FiCheck,
  FiDatabase,
  FiFileText,
  FiLock,
  FiMail,
  FiMessageSquare,
  FiRefreshCw,
  FiShield,
  FiUser,
  FiUsers,
} from "react-icons/fi";

import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  return (
    <main className="pp-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="pp-hero">

        <div className="pp-hero-overlay" />

        <div className="pp-hero-content">

          <div className="pp-breadcrumb">
            <span>Home</span>
            <b>›</b>
            <span>Privacy Policy</span>
          </div>

          <h1>
            Privacy <span>Policy</span>
          </h1>

          <p>
            Your privacy matters. We are committed to protecting
            your personal information and your trust.
          </p>

          <div className="pp-update">
            <FiShield />

            <span>
              Last Updated:
              <strong> October 2026</strong>
            </span>
          </div>

        </div>

      </section>


      {/* =====================================================
          PRIVACY POLICY BODY
      ===================================================== */}

      <section className="pp-main">

        <div className="pp-layout">

          {/* =================================================
              LEFT MENU
          ================================================= */}

          <aside className="pp-sidebar">

            <div className="pp-sidebar-title">
              ON THIS PAGE
            </div>

            <nav>

              <a href="#introduction">
                <span>01</span>
                Introduction
              </a>

              <a href="#information">
                <span>02</span>
                Information We Collect
              </a>

              <a href="#use">
                <span>03</span>
                How We Use Information
              </a>

              <a href="#protection">
                <span>04</span>
                Data Protection
              </a>

              <a href="#sharing">
                <span>05</span>
                Information Sharing
              </a>

              <a href="#cookies">
                <span>06</span>
                Cookies
              </a>

              <a href="#rights">
                <span>07</span>
                Your Rights
              </a>

              <a href="#third-party">
                <span>08</span>
                Third-Party Services
              </a>

              <a href="#children">
                <span>09</span>
                Children's Privacy
              </a>

              <a href="#changes">
                <span>10</span>
                Changes to Policy
              </a>

              <a href="#contact">
                <span>11</span>
                Contact Us
              </a>

            </nav>

          </aside>


          {/* =================================================
              RIGHT SCROLLABLE CONTENT
          ================================================= */}

          <div className="pp-scroll-area">

            {/* ===============================================
                01 INTRODUCTION
            =============================================== */}

            <article
              className="pp-card pp-intro-card"
              id="introduction"
            >

              <div className="pp-section-heading">

                <div className="pp-section-icon">
                  <FiFileText />
                </div>

                <div>

                  <span className="pp-number">
                    01
                  </span>

                  <h2>
                    Introduction
                  </h2>

                </div>

              </div>

              <p>
                Welcome to FitZone. This Privacy Policy explains
                how we collect, use, protect and manage your
                personal information when you use our website,
                contact our team, create an account, select a
                membership plan or interact with our fitness
                services.
              </p>

              <p>
                By using our website, you acknowledge the
                practices described in this Privacy Policy.
              </p>

            </article>


            {/* ===============================================
                02 INFORMATION WE COLLECT
            =============================================== */}

            <article
              className="pp-card"
              id="information"
            >

              <div className="pp-section-heading">

                <div className="pp-section-icon">
                  <FiDatabase />
                </div>

                <div>

                  <span className="pp-number">
                    02
                  </span>

                  <h2>
                    Information We Collect
                  </h2>

                </div>

              </div>

              <p>
                We may collect information that you provide
                directly to us and information generated while
                you interact with our website and services.
              </p>


              <div className="pp-info-grid">

                {/* PERSONAL */}

                <div className="pp-info-box">

                  <FiUser />

                  <h3>
                    Personal Information
                  </h3>

                  <ul>

                    <li>
                      <FiCheck />
                      Full name
                    </li>

                    <li>
                      <FiCheck />
                      Email address
                    </li>

                    <li>
                      <FiCheck />
                      Phone number
                    </li>

                    <li>
                      <FiCheck />
                      Account details
                    </li>

                  </ul>

                </div>


                {/* USAGE */}

                <div className="pp-info-box">

                  <FiBarChart2 />

                  <h3>
                    Usage Information
                  </h3>

                  <ul>

                    <li>
                      <FiCheck />
                      Pages visited
                    </li>

                    <li>
                      <FiCheck />
                      Website activity
                    </li>

                    <li>
                      <FiCheck />
                      Device information
                    </li>

                    <li>
                      <FiCheck />
                      Browser type
                    </li>

                  </ul>

                </div>


                {/* FITNESS */}

                <div className="pp-info-box">

                  <FiActivity />

                  <h3>
                    Fitness Information
                  </h3>

                  <ul>

                    <li>
                      <FiCheck />
                      Membership plans
                    </li>

                    <li>
                      <FiCheck />
                      Class preferences
                    </li>

                    <li>
                      <FiCheck />
                      Fitness goals
                    </li>

                    <li>
                      <FiCheck />
                      Details you choose to provide
                    </li>

                  </ul>

                </div>


                {/* COMMUNICATION */}

                <div className="pp-info-box">

                  <FiMail />

                  <h3>
                    Communication
                  </h3>

                  <ul>

                    <li>
                      <FiCheck />
                      Contact enquiries
                    </li>

                    <li>
                      <FiCheck />
                      Support messages
                    </li>

                    <li>
                      <FiCheck />
                      Feedback
                    </li>

                    <li>
                      <FiCheck />
                      Email correspondence
                    </li>

                  </ul>

                </div>

              </div>

            </article>


            {/* ===============================================
                03 HOW WE USE
            =============================================== */}

            <article
              className="pp-card"
              id="use"
            >

              <div className="pp-section-heading">

                <div className="pp-section-icon">
                  <FiActivity />
                </div>

                <div>

                  <span className="pp-number">
                    03
                  </span>

                  <h2>
                    How We Use Your Information
                  </h2>

                </div>

              </div>

              <p>
                We use information for purposes related to
                providing, supporting and improving FitZone
                services.
              </p>


              <div className="pp-use-grid">

                <div className="pp-use-box">

                  <FiUsers />

                  <div>
                    <h3>
                      Provide Services
                    </h3>

                    <p>
                      To support memberships, classes,
                      trainers and website features.
                    </p>
                  </div>

                </div>


                <div className="pp-use-box">

                  <FiMessageSquare />

                  <div>
                    <h3>
                      Respond to Enquiries
                    </h3>

                    <p>
                      To answer questions and provide
                      customer support.
                    </p>
                  </div>

                </div>


                <div className="pp-use-box">

                  <FiBarChart2 />

                  <div>
                    <h3>
                      Improve Our Services
                    </h3>

                    <p>
                      To understand website usage and improve
                      your experience.
                    </p>
                  </div>

                </div>


                <div className="pp-use-box">

                  <FiShield />

                  <div>
                    <h3>
                      Security
                    </h3>

                    <p>
                      To help protect our website and
                      services from misuse.
                    </p>
                  </div>

                </div>

              </div>

            </article>


            {/* ===============================================
                04 DATA PROTECTION
            =============================================== */}

            <article
              className="pp-card"
              id="protection"
            >

              <div className="pp-section-heading">

                <div className="pp-section-icon">
                  <FiLock />
                </div>

                <div>

                  <span className="pp-number">
                    04
                  </span>

                  <h2>
                    Data Protection
                  </h2>

                </div>

              </div>

              <p>
                We use reasonable technical and administrative
                safeguards designed to protect personal
                information from unauthorized access, misuse,
                alteration or disclosure.
              </p>


              <div className="pp-security-grid">

                <div>
                  <FiLock />

                  <h3>
                    Secure Handling
                  </h3>

                  <p>
                    We take reasonable measures to handle
                    personal information securely.
                  </p>
                </div>


                <div>
                  <FiShield />

                  <h3>
                    Data Protection
                  </h3>

                  <p>
                    We use safeguards designed to reduce
                    unauthorized access.
                  </p>
                </div>


                <div>
                  <FiUsers />

                  <h3>
                    Controlled Access
                  </h3>

                  <p>
                    Access to information should be limited
                    where appropriate.
                  </p>
                </div>

              </div>

            </article>


            {/* ===============================================
                05 SHARING
            =============================================== */}

            <article
              className="pp-card"
              id="sharing"
            >

              <div className="pp-section-heading">

                <div className="pp-section-icon">
                  <FiUsers />
                </div>

                <div>

                  <span className="pp-number">
                    05
                  </span>

                  <h2>
                    Information Sharing
                  </h2>

                </div>

              </div>

              <p>
                FitZone does not sell your personal information.
                Information may be shared when reasonably
                necessary to provide services, comply with
                applicable legal requirements, protect our
                rights or work with service providers that
                support website functionality.
              </p>

            </article>


            {/* ===============================================
                06 COOKIES
            =============================================== */}

            <article
              className="pp-card"
              id="cookies"
            >

              <div className="pp-section-heading">

                <div className="pp-section-icon">
                  <FiDatabase />
                </div>

                <div>

                  <span className="pp-number">
                    06
                  </span>

                  <h2>
                    Cookies
                  </h2>

                </div>

              </div>

              <p>
                Our website may use cookies or similar
                technologies where applicable to remember
                preferences, support website functionality
                and understand how the website is used.
              </p>

              <p>
                You can control cookies through your browser
                settings. Disabling certain cookies may affect
                some website functionality.
              </p>

            </article>


            {/* ===============================================
                07 RIGHTS
            =============================================== */}

            <article
              className="pp-card"
              id="rights"
            >

              <div className="pp-section-heading">

                <div className="pp-section-icon">
                  <FiShield />
                </div>

                <div>

                  <span className="pp-number">
                    07
                  </span>

                  <h2>
                    Your Rights
                  </h2>

                </div>

              </div>

              <p>
                Depending on applicable law and the services
                you use, you may have choices concerning
                certain personal information.
              </p>


              <div className="pp-rights">

                <div>
                  <FiCheck />
                  Request access to your information
                </div>

                <div>
                  <FiCheck />
                  Request correction of inaccurate data
                </div>

                <div>
                  <FiCheck />
                  Request deletion where applicable
                </div>

                <div>
                  <FiCheck />
                  Contact us with privacy questions
                </div>

              </div>

            </article>


            {/* ===============================================
                08 THIRD PARTY
            =============================================== */}

            <article
              className="pp-card"
              id="third-party"
            >

              <div className="pp-section-heading">

                <div className="pp-section-icon">
                  <FiUsers />
                </div>

                <div>

                  <span className="pp-number">
                    08
                  </span>

                  <h2>
                    Third-Party Services
                  </h2>

                </div>

              </div>

              <p>
                Our website may use or link to third-party
                services. Their privacy practices are governed
                by their own policies. We encourage you to
                review the relevant privacy information before
                providing personal information to those
                services.
              </p>

            </article>


            {/* ===============================================
                09 CHILDREN
            =============================================== */}

            <article
              className="pp-card"
              id="children"
            >

              <div className="pp-section-heading">

                <div className="pp-section-icon">
                  <FiShield />
                </div>

                <div>

                  <span className="pp-number">
                    09
                  </span>

                  <h2>
                    Children's Privacy
                  </h2>

                </div>

              </div>

              <p>
                Our services should be used in accordance with
                applicable age requirements. Where parental or
                guardian involvement is required, appropriate
                consent should be obtained.
              </p>

            </article>


            {/* ===============================================
                10 CHANGES
            =============================================== */}

            <article
              className="pp-card"
              id="changes"
            >

              <div className="pp-section-heading">

                <div className="pp-section-icon">
                  <FiRefreshCw />
                </div>

                <div>

                  <span className="pp-number">
                    10
                  </span>

                  <h2>
                    Changes to This Policy
                  </h2>

                </div>

              </div>

              <p>
                We may update this Privacy Policy when our
                website, services or privacy practices change.
                The latest version can be displayed on this
                page with an updated revision date.
              </p>

            </article>


            {/* ===============================================
                11 CONTACT
            =============================================== */}

            <article
              className="pp-card pp-contact"
              id="contact"
            >

              <div className="pp-contact-icon">
                <FiMail />
              </div>

              <div>

                <span>
                  PRIVACY QUESTIONS?
                </span>

                <h2>
                  We're Here to Help
                </h2>

                <p>
                  If you have questions about this Privacy
                  Policy or how your information is handled,
                  contact the FitZone team.
                </p>

                <a href="mailto:support@fitzone.com">
                  <FiMail />
                  support@fitzone.com
                </a>

              </div>

            </article>

          </div>

        </div>

      </section>

    </main>
  );
};

export default PrivacyPolicy;