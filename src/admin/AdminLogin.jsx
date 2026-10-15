import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiArrowRight,
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiShield,
} from "react-icons/fi";

import { FaDumbbell } from "react-icons/fa";

import "./AdminLogin.css";

const AdminLogin = () => {
  const navigate = useNavigate();

  /* =========================================================
     STATES
  ========================================================= */

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");

  /* =========================================================
     INPUT CHANGE
  ========================================================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  /* =========================================================
     LOGIN
  ========================================================= */

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = form.email
      .trim()
      .toLowerCase();

    const password = form.password.trim();

    /* EMPTY VALIDATION */

    if (!email || !password) {
      setError(
        "Please enter email and password."
      );

      return;
    }

    /* =======================================================
       SUPER ADMIN LOGIN
    ======================================================= */

    if (
      email === "abcd@gmail.com" &&
      password === "abcd123"
    ) {
      const superAdminData = {
        name: "Super Admin",

        email: email,

        role: "super-admin",

        loggedIn: true,

        loginTime: new Date().toISOString(),
      };

      localStorage.setItem(
        "fitzoneAdmin",
        JSON.stringify(superAdminData)
      );

      navigate(
        "/admin/dashboard",
        {
          replace: true,
        }
      );

      return;
    }

    /* =======================================================
       MANAGER ADMIN LOGIN
    ======================================================= */

    if (
      email === "tannu@gmail.com" &&
      password === "tannu123"
    ) {
      const managerData = {
        name: "Gym Manager",

        email: email,

        role: "manager",

        loggedIn: true,

        loginTime: new Date().toISOString(),
      };

      localStorage.setItem(
        "fitzoneAdmin",
        JSON.stringify(managerData)
      );

      navigate(
        "/admin/manager-dashboard",
        {
          replace: true,
        }
      );

      return;
    }

    /* =======================================================
       INVALID LOGIN
    ======================================================= */

    setError(
      "Invalid Admin email or password."
    );
  };

  /* =========================================================
     JSX
  ========================================================= */

  return (
    <main className="admin-login-page">

      {/* BACKGROUND GLOW */}

      <div className="admin-login-glow admin-login-glow-one" />

      <div className="admin-login-glow admin-login-glow-two" />


      {/* =====================================================
          LOGIN CARD
      ===================================================== */}

      <section className="admin-login-card">

        {/* ===================================================
            LEFT SIDE
        =================================================== */}

        <div className="admin-login-brand">

          {/* LOGO */}

          <div className="admin-login-logo">

            <span>
              <FaDumbbell />
            </span>

            <div>

              <strong>
                FIT<span>ZONE</span>
              </strong>

              <small>
                ADMIN CONTROL
              </small>

            </div>

          </div>


          {/* LEFT CONTENT */}

          <div className="admin-brand-content">

            <div className="admin-secure-badge">

              <FiShield />

              SECURE ADMIN PORTAL

            </div>


            <h1>
              Manage Your
              <br />

              <span>
                Fitness Empire.
              </span>
            </h1>


            <p>
              Super Admin and Gym Manager can
              securely manage members, memberships,
              classes, trainers and daily gym
              operations.
            </p>


            {/* FEATURES */}

            <div className="admin-brand-points">

              <div>

                <FiShield />

                <span>

                  <strong>
                    Secure Access
                  </strong>

                  Role based admin access

                </span>

              </div>


              <div>

                <FaDumbbell />

                <span>

                  <strong>
                    Smart Management
                  </strong>

                  Manage your entire FITZONE

                </span>

              </div>

            </div>

          </div>


          {/* WATERMARK */}

          <span className="admin-login-watermark">
            FITZONE
          </span>

        </div>


        {/* ===================================================
            RIGHT SIDE
        =================================================== */}

        <div className="admin-login-form-side">

          {/* FORM HEADING */}

          <div className="admin-login-form-head">

            <span>
              ADMIN PORTAL
            </span>

            <h2>
              Welcome Back.
            </h2>

            <p>
              Sign in with your Super Admin
              or Gym Manager account.
            </p>

          </div>


          {/* =================================================
              FORM
          ================================================= */}

          <form
            className="admin-login-form"
            onSubmit={handleSubmit}
          >

            {/* EMAIL */}

            <div className="admin-login-field">

              <label>
                Email Address
              </label>


              <div className="admin-login-input">

                <FiMail />


                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter admin email"
                  autoComplete="email"
                />

              </div>

            </div>


            {/* PASSWORD */}

            <div className="admin-login-field">

              <label>
                Password
              </label>


              <div className="admin-login-input">

                <FiLock />


                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  autoComplete="current-password"
                />


                {/* SHOW PASSWORD */}

                <button
                  type="button"
                  className="admin-password-toggle"
                  onClick={() =>
                    setShowPassword(
                      (prev) => !prev
                    )
                  }
                  aria-label="Show or hide password"
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

              <div className="admin-login-error">

                {error}

              </div>

            )}


            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="admin-login-submit"
            >

              LOGIN TO DASHBOARD

              <FiArrowRight />

            </button>

          </form>

        </div>

      </section>

    </main>
  );
};

export default AdminLogin;