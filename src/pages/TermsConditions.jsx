import React from "react";
import { useNavigate } from "react-router-dom";

import {
  FiAlertCircle,
  FiArrowLeft,
  FiCheckCircle,
  FiClock,
  FiCreditCard,
  FiFileText,
  FiLock,
  FiMail,
  FiRefreshCw,
  FiShield,
  FiUserCheck,
  FiUsers,
} from "react-icons/fi";

import { FaDumbbell } from "react-icons/fa";

import "./TermsConditions.css";

const TermsConditions = () => {
  const navigate = useNavigate();

  return (
    <main className="terms-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="terms-hero">

        <div className="terms-glow terms-glow-one" />
        <div className="terms-glow terms-glow-two" />

        <div className="terms-container terms-hero-inner">

          <button
            type="button"
            className="terms-back-btn"
            onClick={() => navigate(-1)}
          >
            <FiArrowLeft />
            Back
          </button>

          <div className="terms-hero-icon">
            <FiFileText />
          </div>

          <span className="terms-eyebrow">
            FITZONE LEGAL
          </span>

          <h1>
            Terms & <span>Conditions</span>
          </h1>

          <p>
            Please read these Terms & Conditions carefully
            before using the FitZone website, membership
            services, fitness classes, or other services.
          </p>

          <div className="terms-updated">
            <FiClock />
            Last Updated: October 2026
          </div>

        </div>

      </section>


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <section className="terms-content-section">

        <div className="terms-container terms-layout">

          {/* =================================================
              SIDEBAR
          ================================================= */}

          <aside className="terms-sidebar">

            <div className="terms-sidebar-card">

              <span className="terms-sidebar-title">
                ON THIS PAGE
              </span>

              <a href="#acceptance">
                <small>01</small>
                <span>Acceptance of Terms</span>
              </a>

              <a href="#membership">
                <small>02</small>
                <span>Membership</span>
              </a>

              <a href="#payments">
                <small>03</small>
                <span>Payments & Fees</span>
              </a>

              <a href="#rules">
                <small>04</small>
                <span>Gym Rules</span>
              </a>

              <a href="#cancellation">
                <small>05</small>
                <span>Cancellation</span>
              </a>

              <a href="#health">
                <small>06</small>
                <span>Health & Safety</span>
              </a>

              <a href="#account">
                <small>07</small>
                <span>User Accounts</span>
              </a>

              <a href="#liability">
                <small>08</small>
                <span>Liability</span>
              </a>

              <a href="#changes">
                <small>09</small>
                <span>Changes to Terms</span>
              </a>

              <a href="#contact">
                <small>10</small>
                <span>Contact Us</span>
              </a>

            </div>

          </aside>


          {/* =================================================
              RIGHT CONTENT
          ================================================= */}

          <div className="terms-content">


            {/* 01 */}

            <article
              className="terms-card"
              id="acceptance"
            >

              <div className="terms-card-heading">

                <span>
                  <FiCheckCircle />
                </span>

                <div>
                  <small>01</small>
                  <h2>Acceptance of Terms</h2>
                </div>

              </div>

              <p>
                By accessing or using the FitZone website
                and services, you agree to follow these
                Terms & Conditions.
              </p>

              <p>
                If you do not agree with these terms,
                please do not use the website or related
                services.
              </p>

            </article>


            {/* 02 MEMBERSHIP */}

            <article
              className="terms-card"
              id="membership"
            >

              <div className="terms-card-heading">

                <span>
                  <FiUsers />
                </span>

                <div>
                  <small>02</small>
                  <h2>Membership</h2>
                </div>

              </div>

              <p>
                FitZone may provide different membership
                plans with different prices, facilities,
                classes and benefits.
              </p>

              <div className="terms-grid">

                <div className="terms-mini-card">

                  <FiUserCheck />

                  <h3>Member Information</h3>

                  <p>
                    Members should provide accurate
                    information while registering for
                    FitZone services.
                  </p>

                </div>


                <div className="terms-mini-card">

                  <FaDumbbell />

                  <h3>Membership Access</h3>

                  <p>
                    Access to facilities and services
                    depends on the membership plan
                    selected by the member.
                  </p>

                </div>

              </div>


              <ul className="terms-list">

                <li>
                  <FiCheckCircle />
                  Memberships are intended for the
                  registered member.
                </li>

                <li>
                  <FiCheckCircle />
                  Members must follow gym rules and staff
                  instructions.
                </li>

                <li>
                  <FiCheckCircle />
                  Plan features may vary according to the
                  selected membership.
                </li>

                <li>
                  <FiCheckCircle />
                  Membership details should be kept
                  accurate and up to date.
                </li>

              </ul>

            </article>


            {/* 03 PAYMENTS */}

            <article
              className="terms-card"
              id="payments"
            >

              <div className="terms-card-heading">

                <span>
                  <FiCreditCard />
                </span>

                <div>
                  <small>03</small>
                  <h2>Payments & Fees</h2>
                </div>

              </div>

              <p>
                Membership fees and other charges will be
                displayed before a purchase or registration
                is completed.
              </p>


              <div className="terms-payment-box">

                <div>
                  <FiCreditCard />

                  <span>
                    <strong>Membership Fees</strong>
                    Pay according to your selected plan.
                  </span>
                </div>


                <div>
                  <FiShield />

                  <span>
                    <strong>Payment Information</strong>
                    Use valid payment information when
                    payment services are available.
                  </span>
                </div>

              </div>


              <div className="terms-notice">

                <FiAlertCircle />

                <p>
                  Prices, membership benefits and offers
                  may change. Current details should be
                  reviewed before purchasing a plan.
                </p>

              </div>

            </article>


            {/* 04 GYM RULES */}

            <article
              className="terms-card"
              id="rules"
            >

              <div className="terms-card-heading">

                <span>
                  <FaDumbbell />
                </span>

                <div>
                  <small>04</small>
                  <h2>Gym Rules & Conduct</h2>
                </div>

              </div>

              <p>
                Members are expected to maintain a safe,
                respectful and positive environment while
                using FitZone facilities.
              </p>


              <div className="terms-rule-grid">

                <div>
                  <span>01</span>
                  <p>
                    Use gym equipment carefully and for
                    its intended purpose.
                  </p>
                </div>

                <div>
                  <span>02</span>
                  <p>
                    Respect trainers, staff and other
                    members.
                  </p>
                </div>

                <div>
                  <span>03</span>
                  <p>
                    Follow safety instructions while
                    exercising.
                  </p>
                </div>

                <div>
                  <span>04</span>
                  <p>
                    Do not intentionally damage gym
                    property or equipment.
                  </p>
                </div>

                <div>
                  <span>05</span>
                  <p>
                    Maintain appropriate and respectful
                    behaviour.
                  </p>
                </div>

                <div>
                  <span>06</span>
                  <p>
                    Follow facility-specific rules where
                    applicable.
                  </p>
                </div>

              </div>

            </article>


            {/* 05 CANCELLATION */}

            <article
              className="terms-card"
              id="cancellation"
            >

              <div className="terms-card-heading">

                <span>
                  <FiRefreshCw />
                </span>

                <div>
                  <small>05</small>
                  <h2>Cancellation & Refunds</h2>
                </div>

              </div>

              <p>
                Cancellation and refund eligibility may
                depend on the membership plan, service,
                offer, and applicable FitZone policy.
              </p>

              <ul className="terms-list">

                <li>
                  <FiCheckCircle />
                  Cancellation requests should be made
                  through the available FitZone support
                  channel.
                </li>

                <li>
                  <FiCheckCircle />
                  Any applicable refund terms should be
                  reviewed before purchasing a membership.
                </li>

                <li>
                  <FiCheckCircle />
                  Promotional or special plans may have
                  different cancellation conditions.
                </li>

              </ul>

            </article>


            {/* 06 HEALTH */}

            <article
              className="terms-card terms-highlight"
              id="health"
            >

              <div className="terms-card-heading">

                <span>
                  <FiShield />
                </span>

                <div>
                  <small>06</small>
                  <h2>Health & Safety</h2>
                </div>

              </div>

              <p>
                Exercise involves physical activity and
                may involve risks. Members are responsible
                for exercising within their personal
                abilities and following appropriate safety
                guidance.
              </p>


              <div className="terms-safety-grid">

                <div>
                  <FiShield />
                  <strong>Train Safely</strong>
                  <p>
                    Follow correct exercise techniques.
                  </p>
                </div>

                <div>
                  <FaDumbbell />
                  <strong>Use Equipment Properly</strong>
                  <p>
                    Follow equipment instructions.
                  </p>
                </div>

                <div>
                  <FiUserCheck />
                  <strong>Ask for Guidance</strong>
                  <p>
                    Speak with a qualified professional
                    when appropriate.
                  </p>
                </div>

              </div>


              <div className="terms-warning">

                <FiAlertCircle />

                <p>
                  Fitness information on the website is
                  general information and is not a
                  substitute for individualized medical
                  advice.
                </p>

              </div>

            </article>


            {/* 07 ACCOUNT */}

            <article
              className="terms-card"
              id="account"
            >

              <div className="terms-card-heading">

                <span>
                  <FiLock />
                </span>

                <div>
                  <small>07</small>
                  <h2>User Accounts</h2>
                </div>

              </div>

              <p>
                If FitZone provides account features, users
                are responsible for maintaining accurate
                account information and protecting their
                login credentials.
              </p>

              <ul className="terms-list">

                <li>
                  <FiCheckCircle />
                  Keep your password and login information
                  confidential.
                </li>

                <li>
                  <FiCheckCircle />
                  Provide accurate registration details.
                </li>

                <li>
                  <FiCheckCircle />
                  Do not intentionally misuse website
                  features.
                </li>

              </ul>

            </article>


            {/* 08 LIABILITY */}

            <article
              className="terms-card"
              id="liability"
            >

              <div className="terms-card-heading">

                <span>
                  <FiAlertCircle />
                </span>

                <div>
                  <small>08</small>
                  <h2>Limitation of Liability</h2>
                </div>

              </div>

              <p>
                To the extent permitted by applicable law,
                FitZone is not responsible for losses or
                damages resulting from misuse of the
                website, failure to follow safety
                instructions, or activities outside
                FitZone's reasonable control.
              </p>

              <p>
                Nothing in these terms is intended to
                exclude rights or responsibilities that
                cannot legally be excluded.
              </p>

            </article>


            {/* 09 CHANGES */}

            <article
              className="terms-card"
              id="changes"
            >

              <div className="terms-card-heading">

                <span>
                  <FiRefreshCw />
                </span>

                <div>
                  <small>09</small>
                  <h2>Changes to These Terms</h2>
                </div>

              </div>

              <p>
                We may update these Terms & Conditions when
                our website, services, membership options,
                or legal requirements change.
              </p>

              <p>
                When the terms are updated, the latest
                version can be displayed on this page with
                an updated revision date.
              </p>

            </article>


            {/* 10 CONTACT */}

            <article
              className="terms-contact-card"
              id="contact"
            >

              <div className="terms-contact-icon">
                <FiMail />
              </div>

              <div>

                <span>
                  NEED MORE INFORMATION?
                </span>

                <h2>
                  Questions About Our Terms?
                </h2>

                <p>
                  Contact the FitZone team if you have
                  questions about these Terms & Conditions.
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

export default TermsConditions;