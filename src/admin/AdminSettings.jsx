import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiArrowLeft,
  FiBell,
  FiCheck,
  FiGlobe,
  FiMail,
  FiMapPin,
  FiPhone,
  FiSave,
  FiSettings,
  FiShield,
  FiUser,
} from "react-icons/fi";

import { FaDumbbell } from "react-icons/fa";

import "./AdminSettings.css";

const defaultSettings = {
  adminName: "Super Admin",
  adminEmail: "abcd@gmail.com",

  gymName: "FITZONE",
  gymEmail: "hello@fitzone.com",
  gymPhone: "+91 98765 43210",
  gymAddress: "India",
  website: "www.fitzone.com",

  membershipNotifications: true,
  paymentNotifications: true,
  messageNotifications: true,
};

const AdminSettings = () => {
  const navigate = useNavigate();

  const [settings, setSettings] = useState(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("fitzoneAdminSettings") ||
          "null"
      );

      if (saved) {
        return {
          ...defaultSettings,
          ...saved,
        };
      }
    } catch {
      // ignore
    }

    return defaultSettings;
  });

  const [saved, setSaved] = useState(false);

  /* AUTH */

  useEffect(() => {
    try {
      const admin = JSON.parse(
        localStorage.getItem("fitzoneAdmin")
      );

      if (!admin?.loggedIn) {
        navigate("/admin", {
          replace: true,
        });
      }
    } catch {
      navigate("/admin", {
        replace: true,
      });
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSettings((previous) => ({
      ...previous,
      [name]: value,
    }));

    setSaved(false);
  };

  const toggleSetting = (name) => {
    setSettings((previous) => ({
      ...previous,
      [name]: !previous[name],
    }));

    setSaved(false);
  };

  const handleSave = (e) => {
    e.preventDefault();

    localStorage.setItem(
      "fitzoneAdminSettings",
      JSON.stringify(settings)
    );

    /* UPDATE ADMIN NAME + EMAIL */

    try {
      const admin = JSON.parse(
        localStorage.getItem("fitzoneAdmin")
      );

      if (admin) {
        localStorage.setItem(
          "fitzoneAdmin",
          JSON.stringify({
            ...admin,
            name: settings.adminName,
            email: settings.adminEmail,
          })
        );
      }
    } catch {
      // ignore
    }

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  return (
    <main className="admin-settings-page">

      {/* HEADER */}

      <header className="admin-settings-header">

        <div className="admin-settings-title">

          <button
            type="button"
            onClick={() =>
              navigate("/admin/dashboard")
            }
          >
            <FiArrowLeft />
          </button>

          <div>
            <span>FITZONE ADMIN</span>

            <h1>
              Admin <strong>Settings</strong>
            </h1>

            <p>
              Manage administrator, gym and notification settings.
            </p>
          </div>

        </div>

      </header>


      <form
        className="admin-settings-content"
        onSubmit={handleSave}
      >

        {/* ADMIN PROFILE */}

        <section className="admin-settings-card">

          <div className="admin-settings-card-head">

            <div>
              <FiShield />
            </div>

            <span>
              <small>ADMIN ACCOUNT</small>
              <strong>
                Super Admin Profile
              </strong>
            </span>

          </div>


          <div className="admin-settings-grid">

            <label>
              <span>
                <FiUser />
                Admin Name
              </span>

              <input
                type="text"
                name="adminName"
                value={settings.adminName}
                onChange={handleChange}
              />
            </label>


            <label>
              <span>
                <FiMail />
                Admin Email
              </span>

              <input
                type="email"
                name="adminEmail"
                value={settings.adminEmail}
                onChange={handleChange}
              />
            </label>

          </div>

        </section>


        {/* GYM DETAILS */}

        <section className="admin-settings-card">

          <div className="admin-settings-card-head">

            <div>
              <FaDumbbell />
            </div>

            <span>
              <small>GYM INFORMATION</small>
              <strong>
                FITZONE Details
              </strong>
            </span>

          </div>


          <div className="admin-settings-grid">

            <label>
              <span>
                <FaDumbbell />
                Gym Name
              </span>

              <input
                type="text"
                name="gymName"
                value={settings.gymName}
                onChange={handleChange}
              />
            </label>


            <label>
              <span>
                <FiMail />
                Gym Email
              </span>

              <input
                type="email"
                name="gymEmail"
                value={settings.gymEmail}
                onChange={handleChange}
              />
            </label>


            <label>
              <span>
                <FiPhone />
                Phone Number
              </span>

              <input
                type="text"
                name="gymPhone"
                value={settings.gymPhone}
                onChange={handleChange}
              />
            </label>


            <label>
              <span>
                <FiGlobe />
                Website
              </span>

              <input
                type="text"
                name="website"
                value={settings.website}
                onChange={handleChange}
              />
            </label>


            <label className="admin-settings-full">
              <span>
                <FiMapPin />
                Gym Address
              </span>

              <input
                type="text"
                name="gymAddress"
                value={settings.gymAddress}
                onChange={handleChange}
              />
            </label>

          </div>

        </section>


        {/* NOTIFICATIONS */}

        <section className="admin-settings-card">

          <div className="admin-settings-card-head">

            <div>
              <FiBell />
            </div>

            <span>
              <small>NOTIFICATIONS</small>
              <strong>
                Admin Notifications
              </strong>
            </span>

          </div>


          <div className="admin-settings-switch-list">

            <div>
              <span>
                <strong>
                  New Membership
                </strong>

                <small>
                  Alert when a new member joins FITZONE.
                </small>
              </span>

              <button
                type="button"
                className={`admin-setting-switch ${
                  settings.membershipNotifications
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  toggleSetting(
                    "membershipNotifications"
                  )
                }
              >
                <i />
              </button>
            </div>


            <div>
              <span>
                <strong>
                  Payment Notifications
                </strong>

                <small>
                  Alert when a membership payment is completed.
                </small>
              </span>

              <button
                type="button"
                className={`admin-setting-switch ${
                  settings.paymentNotifications
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  toggleSetting(
                    "paymentNotifications"
                  )
                }
              >
                <i />
              </button>
            </div>


            <div>
              <span>
                <strong>
                  Customer Messages
                </strong>

                <small>
                  Alert when a customer sends a new enquiry.
                </small>
              </span>

              <button
                type="button"
                className={`admin-setting-switch ${
                  settings.messageNotifications
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  toggleSetting(
                    "messageNotifications"
                  )
                }
              >
                <i />
              </button>
            </div>

          </div>

        </section>


        {/* SAVE */}

        <div className="admin-settings-bottom">

          {saved && (
            <div className="admin-settings-success">
              <FiCheck />
              Settings saved successfully.
            </div>
          )}


          <button
            type="submit"
            className="admin-settings-save"
          >
            <FiSave />
            Save Settings
          </button>

        </div>

      </form>

    </main>
  );
};

export default AdminSettings;