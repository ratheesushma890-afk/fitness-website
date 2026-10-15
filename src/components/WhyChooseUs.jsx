import React from "react";
import { useNavigate } from "react-router-dom";

import {
  FiCheck,
  FiArrowUpRight,
  FiUsers,
  FiAward,
  FiClock,
  FiTarget,
} from "react-icons/fi";

import "./WhyChooseUs.css";

const WhyChooseUs = () => {
  const navigate = useNavigate();

  const benefits = [
    {
      icon: <FiAward />,
      title: "Certified Trainers",
      text: "Train with experienced fitness professionals.",
    },
    {
      icon: <FiTarget />,
      title: "Personalized Plans",
      text: "Workout plans designed around your goals.",
    },
    {
      icon: <FiClock />,
      title: "Flexible Hours",
      text: "Train when it works best for your schedule.",
    },
    {
      icon: <FiUsers />,
      title: "Strong Community",
      text: "Stay motivated with people who support you.",
    },
  ];

  const handleStart = () => {
    navigate("/membership");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section className="why-section">

      {/* BACKGROUND TEXT */}

      <div className="why-bg-text">
        STRONGER
      </div>

      <div className="why-container">

        {/* =================================================
            LEFT IMAGE
        ================================================= */}

        <div className="why-image-side">

          <div className="why-circle"></div>

          <div className="why-image-box">

            <img
              src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1200&q=90"
              alt="Fitness training"
            />

            <div className="why-image-overlay"></div>

            {/* IMAGE NUMBER */}

            <span className="why-image-number">
              01
            </span>
          </div>

          {/* EXPERIENCE CARD */}

          <div className="why-experience-card">

            <div className="why-experience-icon">
              <FiUsers />
            </div>

            <div>
              <strong>500+</strong>
              <span>Active Members</span>
            </div>

          </div>

          {/* SMALL LABEL */}

          <div className="why-small-card">
            <FiCheck />

            <span>
              Results Driven
            </span>
          </div>

        </div>


        {/* =================================================
            RIGHT CONTENT
        ================================================= */}

        <div className="why-content">

          <div className="why-label">
            <span></span>

            WHY CHOOSE US
          </div>

          <h2>
            MORE THAN A GYM.
            <span>
              A PLACE TO BECOME STRONGER.
            </span>
          </h2>

          <p className="why-description">
            Train in a space designed to help you push your
            limits, stay consistent and achieve real results.
            Everything you need for your fitness journey is
            right here.
          </p>


          {/* =================================================
              BENEFITS
          ================================================= */}

          <div className="why-benefits">

            {benefits.map((item, index) => (
              <div
                className="why-benefit"
                key={index}
              >

                <div className="why-benefit-icon">
                  {item.icon}
                </div>

                <div>
                  <h3>
                    {item.title}
                  </h3>

                  <p>
                    {item.text}
                  </p>
                </div>

              </div>
            ))}

          </div>


          {/* =================================================
              BOTTOM
          ================================================= */}

          <div className="why-bottom">

            <button
              type="button"
              className="why-btn"
              onClick={handleStart}
            >
              Start Your Journey

              <FiArrowUpRight />
            </button>

            <div className="why-bottom-text">

              <div className="why-check">
                <FiCheck />
              </div>

              <div>
                <strong>
                  No pressure. Just progress.
                </strong>

                <span>
                  Start at your own pace
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;