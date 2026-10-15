import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  FiActivity,
  FiArrowRight,
  FiCalendar,
  FiGrid,
  FiLogOut,
  FiMail,
  FiMenu,
  FiShield,
  FiUsers,
  FiX,
} from "react-icons/fi";

import { FaDumbbell } from "react-icons/fa";

import "./ManagerDashboard.css";

const ManagerDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  /* =========================================================
     GET LOGGED IN ADMIN
  ========================================================= */

  const admin = useMemo(() => {
    try {
      return JSON.parse(
        localStorage.getItem("fitzoneAdmin") || "null"
      );
    } catch {
      return null;
    }
  }, []);

  /* =========================================================
     MANAGER AUTH CHECK
  ========================================================= */

  useEffect(() => {
    if (!admin?.loggedIn) {
      navigate("/admin", {
        replace: true,
      });

      return;
    }

    /* SUPER ADMIN APNE DASHBOARD PAR JAYEGA */

    if (admin.role === "super-admin") {
      navigate("/admin/dashboard", {
        replace: true,
      });

      return;
    }

    /* SIRF MANAGER IS PAGE KO OPEN KAR SAKTA HAI */

    if (admin.role !== "manager") {
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
     MANAGER SIDEBAR MENU
  ========================================================= */

  const menuItems = [
    {
      title: "Dashboard",
      icon: <FiGrid />,
      path: "/admin/manager-dashboard",
    },

    {
      title: "Members",
      icon: <FiUsers />,
      path: "/admin/members",
    },

    {
      title: "Memberships",
      icon: <FiActivity />,
      path: "/admin/memberships",
    },

    {
      title: "Classes",
      icon: <FiCalendar />,
      path: "/admin/classes",
    },

    {
      title: "Trainers",
      icon: <FaDumbbell />,
      path: "/admin/trainers",
    },

    {
      title: "Messages",
      icon: <FiMail />,
      path: "/admin/messages",
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
      title: "Fitness Classes",
      value: "12",
      text: "Available gym classes",
      icon: <FiCalendar />,
      path: "/admin/classes",
    },

    {
      title: "Active Trainers",
      value: "3",
      text: "FITZONE trainers",
      icon: <FaDumbbell />,
      path: "/admin/trainers",
    },
  ];

  /* =========================================================
     PAGE NAVIGATION
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
     PROFILE INITIALS
  ========================================================= */

  const initials = admin?.name
    ? admin.name
        .split(" ")
        .map((word) => word.charAt(0))
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "GM";

  /* =========================================================
     WAIT UNTIL AUTH CHECK
  ========================================================= */

  if (
    !admin?.loggedIn ||
    admin?.role !== "manager"
  ) {
    return null;
  }

  return (
    <div className="manager-dashboard">

      {/* =====================================================
          MOBILE BACKDROP
      ===================================================== */}

      {sidebarOpen && (
        <button
          type="button"
          className="manager-backdrop"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
        />
      )}

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside
        className={`manager-sidebar ${
          sidebarOpen ? "open" : ""
        }`}
      >

        {/* LOGO */}

        <div className="manager-logo">

          <div className="manager-logo-icon">
            <FaDumbbell />
          </div>

          <div className="manager-logo-content">

            <strong>
              FIT<span>ZONE</span>
            </strong>

            <small>
              GYM MANAGER
            </small>

          </div>

          <button
            type="button"
            className="manager-sidebar-close"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
          >
            <FiX />
          </button>

        </div>

        {/* MENU LABEL */}

        <p className="manager-menu-title">
          MANAGEMENT
        </p>

        {/* NAVIGATION */}

        <nav className="manager-navigation">

          {menuItems.map((item) => (

            <button
              type="button"
              key={item.title}
              className={
                location.pathname === item.path
                  ? "active"
                  : ""
              }
              onClick={() => goToPage(item.path)}
            >

              <span className="manager-nav-icon">
                {item.icon}
              </span>

              <span className="manager-nav-text">
                {item.title}
              </span>

            </button>

          ))}

        </nav>

        {/* MANAGER ACCESS */}

        <div className="manager-access-card">

          <div className="manager-access-icon">
            <FiActivity />
          </div>

          <div>
            <strong>
              Manager Access
            </strong>

            <p>
              Daily gym operations
            </p>
          </div>

        </div>

        {/* LOGOUT */}

        <button
          type="button"
          className="manager-logout"
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

      <main className="manager-main">

        <div className="manager-main-inner">

          {/* =================================================
              HEADER
          ================================================= */}

          <header className="manager-header">

            <div className="manager-header-left">

              <button
                type="button"
                className="manager-mobile-menu"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open menu"
              >
                <FiMenu />
              </button>

              <div className="manager-page-title">

                <span>
                  FITZONE MANAGEMENT
                </span>

                <h1>
                  Manager{" "}
                  <strong>
                    Dashboard
                  </strong>
                </h1>

              </div>

            </div>

            {/* PROFILE */}

            <div className="manager-profile">

              <div className="manager-profile-avatar">
                {initials}
              </div>

              <div className="manager-profile-info">

                <strong>
                  {admin?.name || "Gym Manager"}
                </strong>

                <small>
                  Gym Manager
                </small>

              </div>

            </div>

          </header>

          {/* =================================================
              WELCOME HERO
          ================================================= */}

          <section className="manager-welcome">

            <div className="manager-welcome-content">

              <span>
                MANAGER OVERVIEW
              </span>

              <h2>
                Welcome Back,{" "}
                <strong>
                  Gym Manager.
                </strong>
              </h2>

              <p>
                Manage your FITZONE members,
                memberships, fitness classes,
                trainers and customer messages
                from one simple dashboard.
              </p>

              <button
                type="button"
                onClick={() =>
                  goToPage("/admin/members")
                }
              >
                MANAGE MEMBERS

                <FiArrowRight />
              </button>

            </div>

            <div className="manager-welcome-art">
              <FaDumbbell />
            </div>

          </section>

          {/* =================================================
              STATS
          ================================================= */}

          <section className="manager-stats">

            {stats.map((stat) => (

              <button
                type="button"
                className="manager-stat-card"
                key={stat.title}
                onClick={() => goToPage(stat.path)}
              >

                <div className="manager-stat-head">

                  <div className="manager-stat-icon">
                    {stat.icon}
                  </div>

                  <FiArrowRight />

                </div>

                <span className="manager-stat-title">
                  {stat.title}
                </span>

                <strong className="manager-stat-number">
                  {stat.value}
                </strong>

                <p>
                  {stat.text}
                </p>

                <div className="manager-stat-action">
                  Manage

                  <FiArrowRight />
                </div>

              </button>

            ))}

          </section>

          {/* =================================================
              LOWER CONTENT
          ================================================= */}

          <section className="manager-lower-grid">

            {/* QUICK ACCESS */}

            <article className="manager-panel">

              <div className="manager-panel-heading">

                <span>
                  QUICK ACCESS
                </span>

                <h3>
                  Daily Management
                </h3>

                <p>
                  Quickly access common gym
                  management sections.
                </p>

              </div>

              <div className="manager-quick-list">

                {/* MEMBERS */}

                <button
                  type="button"
                  onClick={() =>
                    goToPage("/admin/members")
                  }
                >

                  <div>
                    <span>
                      <FiUsers />
                    </span>

                    <div>
                      <strong>
                        Members
                      </strong>

                      <small>
                        Manage gym members
                      </small>
                    </div>
                  </div>

                  <FiArrowRight />

                </button>

                {/* MEMBERSHIPS */}

                <button
                  type="button"
                  onClick={() =>
                    goToPage(
                      "/admin/memberships"
                    )
                  }
                >

                  <div>
                    <span>
                      <FiActivity />
                    </span>

                    <div>
                      <strong>
                        Memberships
                      </strong>

                      <small>
                        Manage membership plans
                      </small>
                    </div>
                  </div>

                  <FiArrowRight />

                </button>

                {/* CLASSES */}

                <button
                  type="button"
                  onClick={() =>
                    goToPage("/admin/classes")
                  }
                >

                  <div>
                    <span>
                      <FiCalendar />
                    </span>

                    <div>
                      <strong>
                        Classes
                      </strong>

                      <small>
                        Manage class schedules
                      </small>
                    </div>
                  </div>

                  <FiArrowRight />

                </button>

                {/* TRAINERS */}

                <button
                  type="button"
                  onClick={() =>
                    goToPage("/admin/trainers")
                  }
                >

                  <div>
                    <span>
                      <FaDumbbell />
                    </span>

                    <div>
                      <strong>
                        Trainers
                      </strong>

                      <small>
                        Manage gym trainers
                      </small>
                    </div>
                  </div>

                  <FiArrowRight />

                </button>

                {/* MESSAGES */}

                <button
                  type="button"
                  onClick={() =>
                    goToPage("/admin/messages")
                  }
                >

                  <div>
                    <span>
                      <FiMail />
                    </span>

                    <div>
                      <strong>
                        Messages
                      </strong>

                      <small>
                        Customer enquiries
                      </small>
                    </div>
                  </div>

                  <FiArrowRight />

                </button>

              </div>

            </article>

            {/* PERMISSIONS */}

            <article className="manager-panel">

              <div className="manager-panel-heading">

                <span>
                  YOUR ACCESS
                </span>

                <h3>
                  Manager Permissions
                </h3>

                <p>
                  Your FITZONE manager account has
                  access to daily gym operations.
                </p>

              </div>

              <div className="manager-permission-list">

                <div>

                  <span>
                    <FiUsers />
                  </span>

                  <div>
                    <strong>
                      Member Management
                    </strong>

                    <p>
                      View and manage registered
                      gym members.
                    </p>
                  </div>

                </div>

                <div>

                  <span>
                    <FiActivity />
                  </span>

                  <div>
                    <strong>
                      Membership Management
                    </strong>

                    <p>
                      View membership plans and
                      member status.
                    </p>
                  </div>

                </div>

                <div>

                  <span>
                    <FiCalendar />
                  </span>

                  <div>
                    <strong>
                      Class Management
                    </strong>

                    <p>
                      Manage fitness classes and
                      schedules.
                    </p>
                  </div>

                </div>

                <div>

                  <span>
                    <FaDumbbell />
                  </span>

                  <div>
                    <strong>
                      Trainer Management
                    </strong>

                    <p>
                      Manage trainer information
                      and availability.
                    </p>
                  </div>

                </div>

                <div>

                  <span>
                    <FiMail />
                  </span>

                  <div>
                    <strong>
                      Customer Messages
                    </strong>

                    <p>
                      Read and manage customer
                      enquiries.
                    </p>
                  </div>

                </div>

              </div>

              {/* RESTRICTED */}

              <div className="manager-restricted">

                <FiShield />

                <div>
                  <strong>
                    Limited Manager Access
                  </strong>

                  <p>
                    Payments, revenue, gallery and
                    system settings are controlled
                    by the Super Admin.
                  </p>
                </div>

              </div>

            </article>

          </section>

        </div>

      </main>

    </div>
  );
};

export default ManagerDashboard;