import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiActivity,
  FiCalendar,
  FiChevronRight,
  FiClock,
  FiGrid,
  FiLogOut,
  FiMenu,
  FiUser,
  FiUsers,
  FiX,
} from "react-icons/fi";

import { FaDumbbell } from "react-icons/fa";

import "./UserDashboard.css";

const UserDashboard = () => {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [membership, setMembership] = useState(null);

  useEffect(() => {
    try {
      const savedMembership = JSON.parse(
        localStorage.getItem("fitzoneMembership") || "null"
      );

      setMembership(savedMembership);
    } catch {
      setMembership(null);
    }
  }, []);

  const user = useMemo(() => {
    return {
      name:
        membership?.name ||
        membership?.fullName ||
        membership?.user?.name ||
        "FITZONE Member",

      email:
        membership?.email ||
        membership?.user?.email ||
        "member@fitzone.com",

      phone:
        membership?.phone ||
        membership?.user?.phone ||
        "Not added",
    };
  }, [membership]);

  const planName =
    membership?.plan?.name ||
    membership?.plan ||
    "No Active Plan";

  const duration =
    membership?.duration ||
    membership?.selectedDuration ||
    "Not selected";

  const status =
    membership?.status ||
    (membership ? "Active" : "Inactive");

  const menuItems = [
    {
      title: "Dashboard",
      icon: <FiGrid />,
      path: "/user/dashboard",
    },
    {
      title: "My Profile",
      icon: <FiUser />,
      path: "/user/profile",
    },
    {
      title: "My Membership",
      icon: <FiActivity />,
      path: "/user/membership",
    },
    {
      title: "My Classes",
      icon: <FiCalendar />,
      path: "/user/classes",
    },
    {
      title: "Trainers",
      icon: <FiUsers />,
      path: "/trainers",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("fitzoneUser");

    navigate("/", {
      replace: true,
    });
  };

  const initials = user.name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="user-dashboard">
      {sidebarOpen && (
        <button
          type="button"
          className="user-backdrop"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`user-sidebar ${
          sidebarOpen ? "open" : ""
        }`}
      >
        <div className="user-logo">
          <div className="user-logo-icon">
            <FaDumbbell />
          </div>

          <div>
            <strong>
              FIT<span>ZONE</span>
            </strong>
            <small>MEMBER PORTAL</small>
          </div>

          <button
            className="user-sidebar-close"
            onClick={() => setSidebarOpen(false)}
          >
            <FiX />
          </button>
        </div>

        <p className="user-menu-label">
          MY ACCOUNT
        </p>

        <nav className="user-nav">
          {menuItems.map((item) => (
            <button
              type="button"
              key={item.title}
              className={
                item.path === "/user/dashboard"
                  ? "active"
                  : ""
              }
              onClick={() => {
                navigate(item.path);
                setSidebarOpen(false);
              }}
            >
              <span>{item.icon}</span>
              {item.title}
            </button>
          ))}
        </nav>

        <div className="user-plan-small">
          <FiActivity />

          <div>
            <span>Current Plan</span>
            <strong>{planName}</strong>
          </div>
        </div>

        <button
          type="button"
          className="user-logout"
          onClick={handleLogout}
        >
          <FiLogOut />
          Logout
        </button>
      </aside>

      <main className="user-main">
        <header className="user-topbar">
          <div className="user-heading">
            <button
              className="user-menu-btn"
              onClick={() => setSidebarOpen(true)}
            >
              <FiMenu />
            </button>

            <div>
              <span>MEMBER DASHBOARD</span>
              <h1>
                Welcome, <strong>{user.name}</strong>
              </h1>
            </div>
          </div>

          <div className="user-profile-mini">
            <div className="user-avatar">
              {initials}
            </div>

            <div>
              <strong>{user.name}</strong>
              <span>Gym Member</span>
            </div>
          </div>
        </header>

        <section className="user-welcome">
          <div>
            <span>WELCOME BACK</span>

            <h2>
              Ready For Today's{" "}
              <strong>Workout?</strong>
            </h2>

            <p>
              Stay consistent, track your membership
              and keep moving towards your fitness
              goals.
            </p>

            <button
              onClick={() => navigate("/classes")}
            >
              EXPLORE CLASSES
              <FiChevronRight />
            </button>
          </div>

          <FaDumbbell className="user-welcome-icon" />
        </section>

        <section className="user-stat-grid">
          <article>
            <div>
              <FiActivity />
            </div>

            <span>Membership</span>
            <strong>{planName}</strong>
            <p>Your current gym plan</p>
          </article>

          <article>
            <div>
              <FiClock />
            </div>

            <span>Duration</span>
            <strong>{duration}</strong>
            <p>Membership duration</p>
          </article>

          <article>
            <div>
              <FiActivity />
            </div>

            <span>Status</span>
            <strong>{status}</strong>
            <p>Current membership status</p>
          </article>

          <article>
            <div>
              <FiCalendar />
            </div>

            <span>Classes</span>
            <strong>Explore</strong>
            <p>Find your next workout</p>
          </article>
        </section>

        <section className="user-bottom-grid">
          <article className="user-panel">
            <div className="user-panel-heading">
              <span>MY MEMBERSHIP</span>
              <h3>Your Fitness Plan</h3>
            </div>

            <div className="user-membership-card">
              <div className="user-membership-icon">
                <FaDumbbell />
              </div>

              <div>
                <span>CURRENT PLAN</span>
                <h4>{planName}</h4>

                <p>
                  {duration} • {status}
                </p>
              </div>

              <button
                onClick={() =>
                  navigate("/user/membership")
                }
              >
                View
                <FiChevronRight />
              </button>
            </div>
          </article>

          <article className="user-panel">
            <div className="user-panel-heading">
              <span>QUICK ACCESS</span>
              <h3>My Account</h3>
            </div>

            <div className="user-quick-links">
              <button
                onClick={() =>
                  navigate("/user/profile")
                }
              >
                <FiUser />
                <div>
                  <strong>My Profile</strong>
                  <span>View personal details</span>
                </div>
                <FiChevronRight />
              </button>

              <button
                onClick={() =>
                  navigate("/user/classes")
                }
              >
                <FiCalendar />
                <div>
                  <strong>My Classes</strong>
                  <span>View selected classes</span>
                </div>
                <FiChevronRight />
              </button>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
};

export default UserDashboard;