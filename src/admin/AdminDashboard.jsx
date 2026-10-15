import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  FiActivity,
  FiCalendar,
  FiCreditCard,
  FiDollarSign,
  FiGrid,
  FiImage,
  FiLogOut,
  FiMail,
  FiMenu,
  FiSettings,
  FiTrendingUp,
  FiUsers,
  FiX,
  FiArrowRight,
} from "react-icons/fi";

import { FaDumbbell } from "react-icons/fa";

import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  /* =========================================================
     ADMIN LOGIN DATA
  ========================================================= */

  const admin = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("fitzoneAdmin"));
    } catch {
      return null;
    }
  }, []);

  /* =========================================================
     PROTECT ADMIN PAGE
  ========================================================= */

  useEffect(() => {
    if (!admin?.loggedIn) {
      navigate("/admin", {
        replace: true,
      });
    }
  }, [admin, navigate]);

  /* =========================================================
     CLOSE MOBILE SIDEBAR AFTER ROUTE CHANGE
  ========================================================= */

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  /* =========================================================
     SIDEBAR MENU
  ========================================================= */

  const menu = [
    {
      name: "Dashboard",
      icon: <FiGrid />,
      path: "/admin/dashboard",
    },

    {
      name: "Members",
      icon: <FiUsers />,
      path: "/admin/members",
    },

    {
      name: "Memberships",
      icon: <FiActivity />,
      path: "/admin/memberships",
    },

    {
      name: "Classes",
      icon: <FiCalendar />,
      path: "/admin/classes",
    },

    {
      name: "Trainers",
      icon: <FaDumbbell />,
      path: "/admin/trainers",
    },

    {
      name: "Payments",
      icon: <FiCreditCard />,
      path: "/admin/payments",
    },

    {
      name: "Gallery",
      icon: <FiImage />,
      path: "/admin/gallery",
    },

    {
      name: "Messages",
      icon: <FiMail />,
      path: "/admin/messages",
    },

    {
      name: "Settings",
      icon: <FiSettings />,
      path: "/admin/settings",
    },
  ];

  /* =========================================================
     DASHBOARD STATS
  ========================================================= */

  const stats = [
    {
      title: "Total Members",
      value: "248",
      text: "Registered gym members",
      icon: <FiUsers />,
      path: "/admin/members",
    },

    {
      title: "Active Memberships",
      value: "186",
      text: "Currently active plans",
      icon: <FiActivity />,
      path: "/admin/memberships",
    },

    {
      title: "Total Revenue",
      value: "₹2.84L",
      text: "Membership revenue",
      icon: <FiDollarSign />,
      path: "/admin/payments",
    },

    {
      title: "Fitness Classes",
      value: "12",
      text: "Active fitness classes",
      icon: <FiCalendar />,
      path: "/admin/classes",
    },
  ];

  /* =========================================================
     NAVIGATION
  ========================================================= */

  const goToPage = (path) => {
    navigate(path);
    setSidebarOpen(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =========================================================
     LOGOUT
  ========================================================= */

  const handleLogout = () => {
    localStorage.removeItem("fitzoneAdmin");

    navigate("/admin", {
      replace: true,
    });
  };

  /* =========================================================
     ACTIVE MENU
  ========================================================= */

  const isActive = (path) => {
    return location.pathname === path;
  };

  /* =========================================================
     ADMIN INITIALS
  ========================================================= */

  const adminInitials = admin?.name
    ? admin.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "SA";

  if (!admin?.loggedIn) {
    return null;
  }

  return (
    <div className="fit-admin">

      {/* =====================================================
          MOBILE BACKDROP
      ===================================================== */}

      {sidebarOpen && (
        <button
          type="button"
          className="fit-admin-backdrop"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close admin menu"
        />
      )}


      {/* =====================================================
          LEFT SIDEBAR
      ===================================================== */}

      <aside
        className={`fit-admin-sidebar ${
          sidebarOpen ? "open" : ""
        }`}
      >

        {/* LOGO */}

        <div className="fit-admin-logo">

          <span>
            <FaDumbbell />
          </span>

          <div>
            <strong>
              FIT<span>ZONE</span>
            </strong>

            <small>SUPER ADMIN</small>
          </div>

          <button
            type="button"
            className="fit-admin-sidebar-close"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <FiX />
          </button>

        </div>


        {/* LABEL */}

        <div className="fit-admin-menu-label">
          MANAGEMENT
        </div>


        {/* NAVIGATION */}

        <nav>

          {menu.map((item) => (
            <button
              key={item.name}
              type="button"
              className={
                isActive(item.path)
                  ? "active"
                  : ""
              }
              onClick={() =>
                goToPage(item.path)
              }
            >
              {item.icon}

              <span>
                {item.name}
              </span>
            </button>
          ))}

        </nav>


        {/* LOGOUT */}

        <button
          type="button"
          className="fit-admin-logout"
          onClick={handleLogout}
        >
          <FiLogOut />

          <span>
            Logout
          </span>
        </button>

      </aside>


      {/* =====================================================
          RIGHT SIDE
      ===================================================== */}

      <main className="fit-admin-content">

        <div className="fit-admin-scroll">

          {/* =================================================
              HEADER
          ================================================= */}

          <header className="fit-admin-header">

            <button
              type="button"
              className="fit-admin-menu-btn"
              onClick={() =>
                setSidebarOpen(true)
              }
              aria-label="Open admin menu"
            >
              <FiMenu />
            </button>


            <div className="fit-admin-heading">

              <span>
                FITZONE CONTROL CENTER
              </span>

              <h1>
                Welcome back,{" "}
                <strong>
                  {admin?.name || "Super Admin"}
                </strong>
              </h1>

            </div>


            <div className="fit-admin-profile">

              <span>
                {adminInitials}
              </span>

              <div>
                <strong>
                  {admin?.name || "Super Admin"}
                </strong>

                <small>
                  Super Administrator
                </small>
              </div>

            </div>

          </header>


          {/* =================================================
              WELCOME
          ================================================= */}

          <section className="fit-admin-welcome">

            <div>

              <span>
                OVERVIEW
              </span>

              <h2>
                Your Gym At A{" "}
                <strong>
                  Glance.
                </strong>
              </h2>

              <p>
                Manage members, memberships, classes,
                trainers and payments from your FITZONE
                Super Admin dashboard.
              </p>

            </div>

            <FaDumbbell />

          </section>


          {/* =================================================
              STATS
          ================================================= */}

          <section className="fit-admin-stats">

            {stats.map((stat) => (
              <button
                type="button"
                className="fit-admin-stat-card"
                key={stat.title}
                onClick={() =>
                  goToPage(stat.path)
                }
              >

                <div className="fit-admin-stat-top">

                  <div className="fit-admin-stat-icon">
                    {stat.icon}
                  </div>

                  <FiArrowRight className="fit-admin-stat-arrow" />

                </div>


                <span className="fit-admin-stat-title">
                  {stat.title}
                </span>

                <strong>
                  {stat.value}
                </strong>

                <p>
                  {stat.text}
                </p>


                <div className="fit-admin-stat-open">
                  View Details
                  <FiArrowRight />
                </div>

              </button>
            ))}

          </section>


          {/* =================================================
              BOTTOM
          ================================================= */}

          <section className="fit-admin-bottom">

            {/* RECENT ACTIVITY */}

            <article className="fit-admin-panel">

              <span>
                RECENT ACTIVITY
              </span>

              <h3>
                Membership Activity
              </h3>


              <div className="fit-admin-empty">

                <FiTrendingUp />

                <strong>
                  Your activity will appear here
                </strong>

                <p>
                  New memberships, payments and member
                  activity will be shown in this section.
                </p>

              </div>

            </article>


            {/* QUICK ACCESS */}

            <article className="fit-admin-panel">

              <span>
                QUICK ACCESS
              </span>

              <h3>
                Management
              </h3>


              <div className="fit-admin-quick">

                <button
                  type="button"
                  onClick={() =>
                    goToPage("/admin/members")
                  }
                >
                  <FiUsers />

                  <span>
                    Manage Members
                  </span>

                  <FiArrowRight />
                </button>


                <button
                  type="button"
                  onClick={() =>
                    goToPage("/admin/classes")
                  }
                >
                  <FiCalendar />

                  <span>
                    Manage Classes
                  </span>

                  <FiArrowRight />
                </button>


                <button
                  type="button"
                  onClick={() =>
                    goToPage("/admin/trainers")
                  }
                >
                  <FaDumbbell />

                  <span>
                    Manage Trainers
                  </span>

                  <FiArrowRight />
                </button>


                <button
                  type="button"
                  onClick={() =>
                    goToPage("/admin/payments")
                  }
                >
                  <FiCreditCard />

                  <span>
                    View Payments
                  </span>

                  <FiArrowRight />
                </button>

              </div>

            </article>

          </section>

        </div>

      </main>

    </div>
  );
};

export default AdminDashboard;