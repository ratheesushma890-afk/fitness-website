
import React from "react";
import { Link } from "react-router-dom";

import {
  FiArrowRight,
  FiUsers,
  FiHeart,
  FiCheckCircle,
} from "react-icons/fi";

import { FaDumbbell } from "react-icons/fa";

import "./FitnessCTA.css";

const FitnessCTA = () => {
  const features = [
    {
      icon: <FiUsers />,
      title: "Expert Trainers",
      text: "Learn from certified professionals",
    },
    {
      icon: <FaDumbbell />,
      title: "Modern Equipment",
      text: "World-class gym facilities",
    },
    {
      icon: <FiCheckCircle />,
      title: "Personalized Plans",
      text: "Fitness plans for your goals",
    },
    {
      icon: <FiHeart />,
      title: "Supportive Community",
      text: "Train together, grow together",
    },
  ];

  return (
    <section className="fitness-cta-section">

      <div className="fitness-cta-container">

        {/* MAIN CTA BOX */}
        <div className="fitness-cta-box">

          {/* DECORATIVE SHAPES */}
          <div className="fitness-cta-square square-one"></div>
          <div className="fitness-cta-square square-two"></div>
          <div className="fitness-cta-square square-three"></div>

          {/* LEFT CONTENT */}
          <div className="fitness-cta-content">

            <div className="fitness-cta-label">
              <FaDumbbell />
              <span>FIT ZONE GYM</span>
              <i></i>
            </div>

            <h2>
              Ready to Start Your
              <span> Fitness Journey?</span>
            </h2>

            <p>
              Join our modern gym, train with expert trainers,
              and follow personalized workout plans to build
              a stronger, healthier you.
            </p>

            <div className="fitness-cta-buttons">

              <Link
                to="/join"
                className="fitness-cta-primary"
              >
                Join Now
                <FiArrowRight />
              </Link>

              <Link
                to="/classes"
                className="fitness-cta-secondary"
              >
                Explore Classes
                <FiArrowRight />
              </Link>

            </div>

          </div>

          {/* RIGHT IMAGE */}
          <div className="fitness-cta-visual">

            <div className="fitness-cta-circle"></div>

            <div className="fitness-cta-ring"></div>

            <img
              src="/fitness-cta-girl.png"
              alt="Fitness athlete ready to train"
              className="fitness-cta-girl"
            />

            <div className="fitness-cta-handwriting">
              Stronger
              <span>Every Day!</span>
            </div>

          </div>

        </div>

        {/* BOTTOM FEATURES */}
        <div className="fitness-cta-features">

          {features.map((feature, index) => (
            <div
              className="fitness-cta-feature"
              key={index}
            >
              <div className="fitness-cta-feature-icon">
                {feature.icon}
              </div>

              <div className="fitness-cta-feature-text">
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </div>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
};

export default FitnessCTA;
