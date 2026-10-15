import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiArrowLeft,
  FiEdit2,
  FiMail,
  FiPhone,
  FiSave,
  FiUser,
} from "react-icons/fi";

import "./UserProfile.css";

const UserProfile = () => {
  const navigate = useNavigate();

  const [editing, setEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    goal: "",
  });

  useEffect(() => {
    try {
      const membership = JSON.parse(
        localStorage.getItem("fitzoneMembership") || "null"
      );

      const savedProfile = JSON.parse(
        localStorage.getItem("fitzoneUserProfile") || "null"
      );

      if (savedProfile) {
        setProfile(savedProfile);
        return;
      }

      setProfile({
        name:
          membership?.name ||
          membership?.fullName ||
          "FITZONE Member",

        email:
          membership?.email ||
          "member@fitzone.com",

        phone:
          membership?.phone ||
          "Not added",

        goal:
          membership?.goal ||
          membership?.fitnessGoal ||
          "General Fitness",
      });
    } catch {
      // fallback remains
    }
  }, []);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const saveProfile = () => {
    localStorage.setItem(
      "fitzoneUserProfile",
      JSON.stringify(profile)
    );

    setEditing(false);
  };

  const initials = profile.name
    .split(" ")
    .map((item) => item.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <main className="profile-page">
      <header className="profile-header">
        <div>
          <button
            onClick={() =>
              navigate("/user/dashboard")
            }
          >
            <FiArrowLeft />
          </button>

          <div>
            <span>MEMBER ACCOUNT</span>
            <h1>
              My <strong>Profile</strong>
            </h1>
          </div>
        </div>

        {!editing ? (
          <button
            className="profile-edit-btn"
            onClick={() => setEditing(true)}
          >
            <FiEdit2 />
            Edit Profile
          </button>
        ) : (
          <button
            className="profile-edit-btn"
            onClick={saveProfile}
          >
            <FiSave />
            Save Changes
          </button>
        )}
      </header>

      <section className="profile-layout">
        <aside className="profile-card">
          <div className="profile-large-avatar">
            {initials}
          </div>

          <h2>{profile.name}</h2>
          <p>FITZONE Gym Member</p>

          <span className="profile-active">
            Active Member
          </span>
        </aside>

        <article className="profile-details">
          <div className="profile-title">
            <span>PERSONAL INFORMATION</span>
            <h2>Account Details</h2>
            <p>
              View and update your personal
              information.
            </p>
          </div>

          <div className="profile-form">
            <label>
              <span>
                <FiUser />
                Full Name
              </span>

              <input
                name="name"
                value={profile.name}
                disabled={!editing}
                onChange={handleChange}
              />
            </label>

            <label>
              <span>
                <FiMail />
                Email Address
              </span>

              <input
                name="email"
                value={profile.email}
                disabled={!editing}
                onChange={handleChange}
              />
            </label>

            <label>
              <span>
                <FiPhone />
                Phone Number
              </span>

              <input
                name="phone"
                value={profile.phone}
                disabled={!editing}
                onChange={handleChange}
              />
            </label>

            <label>
              <span>
                <FiUser />
                Fitness Goal
              </span>

              <select
                name="goal"
                value={profile.goal}
                disabled={!editing}
                onChange={handleChange}
              >
                <option>Weight Loss</option>
                <option>Muscle Gain</option>
                <option>Strength Training</option>
                <option>General Fitness</option>
                <option>Body Transformation</option>
                <option>Improve Stamina</option>
                <option>Flexibility</option>
                <option>Sports Performance</option>
              </select>
            </label>
          </div>
        </article>
      </section>
    </main>
  );
};

export default UserProfile;