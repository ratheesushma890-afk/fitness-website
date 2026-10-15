import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FiArrowLeft,
  FiArrowRight,
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
} from "react-icons/fi";

import { FaDumbbell } from "react-icons/fa";

import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  /* =========================================================
     LOGIN
  ========================================================= */

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (!cleanEmail || !cleanPassword) {
      setError("Please enter email and password.");
      return;
    }

    setError("");

    /* =======================================================
       DEMO USER LOGIN
    ======================================================= */

    const membership = JSON.parse(
      localStorage.getItem("fitzoneMembership") || "null"
    );

    const userData = {
      name:
        membership?.name ||
        membership?.fullName ||
        membership?.user?.name ||
        "FITZONE Member",

      email: cleanEmail,

      role: "user",

      loggedIn: true,

      loginTime: new Date().toISOString(),
    };

    localStorage.setItem(
      "fitzoneUser",
      JSON.stringify(userData)
    );

    /* =======================================================
       OPEN USER DASHBOARD
    ======================================================= */

    navigate("/user/dashboard", {
      replace: true,
    });
  };

  return (
    <main className="login-page">

      {/* =====================================================
          LEFT IMAGE
      ====================================================== */}

      <section className="login-visual">

        <div className="login-image-overlay" />

        <Link to="/" className="login-back">
          <FiArrowLeft />
          Back to Home
        </Link>

        <div className="login-visual-content">

          <div className="login-mini-label">
            <span />
            FITZONE COMMUNITY
          </div>

          <h1>
            YOUR NEXT
            <span> WORKOUT</span>
            <br />
            STARTS HERE.
          </h1>

          <p>
            Stay consistent. Track your journey.
            Keep becoming stronger every day.
          </p>

          <div className="login-image-stats">

            <div>
              <strong>500+</strong>
              <span>Members</span>
            </div>

            <div>
              <strong>50+</strong>
              <span>Classes</span>
            </div>

            <div>
              <strong>20+</strong>
              <span>Trainers</span>
            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          RIGHT FORM
      ====================================================== */}

      <section className="login-form-side">

        <div className="login-form-wrapper">

          {/* LOGO */}

          <Link to="/" className="login-logo">

            <div className="login-logo-icon">
              <FaDumbbell />
            </div>

            <div>
              <span>FIT</span>
              <strong>ZONE</strong>
            </div>

          </Link>


          {/* HEADING */}

          <div className="login-heading">

            <span>WELCOME BACK</span>

            <h2>
              Login To Your
              <strong> Account.</strong>
            </h2>

            <p>
              Enter your details to continue your fitness journey.
            </p>

          </div>


          {/* =================================================
              LOGIN FORM
          ================================================== */}

          <form
            className="login-form"
            onSubmit={handleSubmit}
          >

            {/* EMAIL */}

            <div className="login-field">

              <label>Email Address</label>

              <div className="login-input">

                <FiMail />

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  autoComplete="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                />

              </div>

            </div>


            {/* PASSWORD */}

            <div className="login-field">

              <div className="login-label-row">

                <label>Password</label>

                <button
                  type="button"
                  className="forgot-btn"
                >
                  Forgot Password?
                </button>

              </div>

              <div className="login-input">

                <FiLock />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  value={password}
                  autoComplete="current-password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <FiEyeOff />
                  ) : (
                    <FiEye />
                  )}
                </button>

              </div>

            </div>


            {/* ERROR */}

            {error && (
              <p className="login-error">
                {error}
              </p>
            )}


            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="login-submit"
            >
              LOGIN NOW
              <FiArrowRight />
            </button>

          </form>


          {/* =================================================
              REGISTER
          ================================================== */}

          <div className="login-register">

            <span>
              New to FitZone?
            </span>

            <Link to="/join">
              Become a Member
              <FiArrowRight />
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
};

export default Login;