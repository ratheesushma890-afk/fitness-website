import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiArrowLeft,
  FiCalendar,
  FiClock,
  FiMapPin,
  FiUsers,
} from "react-icons/fi";

import { FaDumbbell } from "react-icons/fa";

import "./MyClasses.css";

const MyClasses = () => {
  const navigate = useNavigate();

  const [selectedClass, setSelectedClass] =
    useState(null);

  useEffect(() => {
    try {
      const savedClass = JSON.parse(
        localStorage.getItem(
          "fitzoneSelectedClass"
        ) || "null"
      );

      setSelectedClass(savedClass);
    } catch {
      setSelectedClass(null);
    }
  }, []);

  const demoClasses = [
    {
      id: 1,
      name: "Strength Training",
      trainer: "Arjun Sharma",
      day: "Monday",
      time: "07:00 AM",
      duration: "60 Min",
      level: "Intermediate",
    },
    {
      id: 2,
      name: "Yoga & Flexibility",
      trainer: "Riya Mehta",
      day: "Wednesday",
      time: "08:00 AM",
      duration: "50 Min",
      level: "Beginner",
    },
    {
      id: 3,
      name: "HIIT Workout",
      trainer: "Kabir Singh",
      day: "Saturday",
      time: "06:00 PM",
      duration: "45 Min",
      level: "Advanced",
    },
  ];

  const classes = selectedClass
    ? [
        {
          id:
            selectedClass.id ||
            selectedClass._id ||
            "selected",

          name:
            selectedClass.title ||
            selectedClass.name ||
            "Selected Fitness Class",

          trainer:
            selectedClass.trainer ||
            "FITZONE Trainer",

          day:
            selectedClass.day ||
            selectedClass.schedule ||
            "Scheduled",

          time:
            selectedClass.time ||
            "Check Schedule",

          duration:
            selectedClass.duration ||
            "60 Min",

          level:
            selectedClass.level ||
            "All Levels",
        },
      ]
    : demoClasses;

  return (
    <main className="myclasses-page">
      <header className="myclasses-header">
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
              My <strong>Classes</strong>
            </h1>
          </div>
        </div>

        <button
          className="myclasses-explore"
          onClick={() => navigate("/classes")}
        >
          <FaDumbbell />
          Explore Classes
        </button>
      </header>

      <section className="myclasses-banner">
        <div>
          <span>YOUR WORKOUTS</span>

          <h2>
            Keep Moving.{" "}
            <strong>Stay Consistent.</strong>
          </h2>

          <p>
            View your fitness classes and stay
            prepared for your next workout.
          </p>
        </div>

        <FiCalendar />
      </section>

      <section className="myclasses-grid">
        {classes.map((item) => (
          <article
            className="myclass-card"
            key={item.id}
          >
            <div className="myclass-card-top">
              <span>{item.level}</span>

              <FaDumbbell />
            </div>

            <h3>{item.name}</h3>

            <p className="myclass-trainer">
              <FiUsers />
              {item.trainer}
            </p>

            <div className="myclass-details">
              <div>
                <FiCalendar />
                <span>{item.day}</span>
              </div>

              <div>
                <FiClock />
                <span>{item.time}</span>
              </div>

              <div>
                <FiMapPin />
                <span>FITZONE Gym</span>
              </div>
            </div>

            <div className="myclass-footer">
              <span>Duration</span>
              <strong>{item.duration}</strong>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
};

export default MyClasses;