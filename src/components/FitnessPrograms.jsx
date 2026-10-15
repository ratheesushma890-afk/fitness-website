import React from "react";
import { useNavigate } from "react-router-dom";

import {
  FiUsers,
  FiHeart,
  FiAward,
  FiActivity,
  FiArrowUpRight,
  FiTarget,
} from "react-icons/fi";

import "./FitnessPrograms.css";

const FitnessPrograms = () => {
  const navigate = useNavigate();

  /* =========================================================
     TOP FEATURES
  ========================================================= */

  const features = [
    {
      icon: <FiActivity />,
      title: "Modern Equipment",
      text: "World-class gym facilities",
    },
    {
      icon: <FiAward />,
      title: "Expert Trainers",
      text: "Certified & experienced",
    },
    {
      icon: <FiTarget />,
      title: "Personalized Plans",
      text: "Plans for every fitness level",
    },
    {
      icon: <FiUsers />,
      title: "Supportive Community",
      text: "Stay motivated together",
    },
  ];

  /* =========================================================
     FITNESS PROGRAMS
  ========================================================= */

  const programs = [
    {
      id: 1,
      title: "Strength Training",
      text: "Build strength and muscle",
      image:
        "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1200&q=85",
      icon: <FiActivity />,
      category: "Strength",
    },

    {
      id: 2,
      title: "Cardio Fitness",
      text: "Improve endurance & stamina",
      image:
        "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=1200&q=85",
      icon: <FiHeart />,
      category: "Cardio",
    },

    {
      id: 3,
      title: "Yoga & Flexibility",
      text: "Stay flexible, balanced and focused",
      image:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=85",
      icon: <FiActivity />,
      category: "Yoga",
    },

    {
      id: 4,
      title: "Personal Training",
      text: "One-on-one expert guidance",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=85",
      icon: <FiUsers />,
      category: "Personal",
    },
  ];

  /* =========================================================
     OPEN SELECTED PROGRAM
  ========================================================= */

  const openProgram = (program) => {
    navigate("/classes", {
      state: {
        category: program.category,
        fromPrograms: true,
      },
    });
  };

  /* =========================================================
     OPEN ALL PROGRAMS
  ========================================================= */

  const openAllPrograms = () => {
    navigate("/classes", {
      state: {
        category: "All",
        fromPrograms: true,
      },
    });
  };

  return (
    <>
      {/* =====================================================
          FEATURES STRIP
      ====================================================== */}

      <section className="fitness-features">
        <div className="fitness-features-container">
          {features.map((item, index) => (
            <div
              className="fitness-feature-item"
              key={index}
            >
              <div className="fitness-feature-icon">
                {item.icon}
              </div>

              <div className="fitness-feature-text">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          FITNESS PROGRAMS
      ====================================================== */}

      <section className="fitness-programs">
        {/* BACKGROUND TEXT */}

        <div
          className="fitness-programs-bg-text"
          aria-hidden="true"
        >
          FITNESS
        </div>

        <div className="programs-container">

          {/* =================================================
              HEADING
          ================================================= */}

          <div className="programs-heading">
            <span className="program-small-title">
              OUR PROGRAMS
            </span>

            <h2>
              Popular Fitness <span>Programs</span>
            </h2>

            <p>
              Choose a program that fits your goals
              and start your fitness journey today.
            </p>
          </div>

          {/* =================================================
              PROGRAM CARDS
          ================================================= */}

          <div className="programs-grid">
            {programs.map((program, index) => (
              <article
                className="program-card"
                key={program.id}
                role="button"
                tabIndex={0}
                onClick={() => openProgram(program)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openProgram(program);
                  }
                }}
              >
                {/* IMAGE */}

                <div className="program-image">
                  <img
                    src={program.image}
                    alt={program.title}
                  />

                  <div className="program-image-overlay" />

                  {/* NUMBER */}

                  <div className="program-number">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  {/* ICON */}

                  <div className="program-icon">
                    {program.icon}
                  </div>
                </div>

                {/* CONTENT */}

                <div className="program-content">
                  <div className="program-text">
                    <h3>{program.title}</h3>
                    <p>{program.text}</p>
                  </div>

                  <button
                    type="button"
                    className="program-arrow"
                    aria-label={`View ${program.title}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      openProgram(program);
                    }}
                  >
                    <FiArrowUpRight />
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* =================================================
              BOTTOM CTA
          ================================================= */}

          <div className="programs-bottom">
            <p>
              Not sure which program is right for you?
            </p>

            <button
              type="button"
              onClick={openAllPrograms}
            >
              Explore All Programs
              <FiArrowUpRight />
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default FitnessPrograms;