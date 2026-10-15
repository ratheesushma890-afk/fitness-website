import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  FiArrowRight,
  FiPlay,
  FiUsers,
  FiStar,
  FiX,
} from "react-icons/fi";

import {
  FaDumbbell,
  FaTrophy,
} from "react-icons/fa";

import fitness from "../assets/fitness image.png";
import fitnessvideo from "../assets/fitnessvideo.mp4";

import "./Hero.css";

const Hero = () => {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <>
      <section className="hero">

        {/* ================= BACKGROUND IMAGE ================= */}
        <img
          src={fitness}
          alt="Fitness Gym"
          className="hero-bg"
        />

        {/* ================= OVERLAY ================= */}
        <div className="hero-overlay"></div>

        {/* ================= HERO CONTENT ================= */}
        <div className="hero-container">

          <div className="hero-content">

            {/* SMALL TAG */}
            <div className="hero-tag">
              <FaDumbbell />
              <span>TRANSFORM YOUR LIFE</span>
            </div>

            {/* HEADING */}
            <h1 className="hero-title">
              STRONGER
              <span>HEALTHIER</span>
              HAPPIER YOU
            </h1>

            {/* BLUE LINE */}
            <div className="hero-line"></div>

            {/* DESCRIPTION */}
            <p className="hero-description">
              Join our fitness community and take the first step
              towards a stronger, healthier and more confident you.
            </p>

            {/* ================= BUTTONS ================= */}
            <div className="hero-actions">

              <Link
                to="/join"
                className="hero-main-btn"
              >
                Get Started
                <FiArrowRight />
              </Link>

              <button
                type="button"
                className="hero-video-btn"
                onClick={() => setVideoOpen(true)}
              >
                <span className="hero-play">
                  <FiPlay />
                </span>

                <span className="hero-video-text">
                  <strong>Watch Video</strong>
                  <small>See our gym in action</small>
                </span>
              </button>

            </div>

            {/* ================= STATS ================= */}
            <div className="hero-stats">

              <div className="hero-stat">
                <span className="hero-stat-icon">
                  <FiUsers />
                </span>

                <div className="hero-stat-info">
                  <strong>500+</strong>
                  <span>Happy Members</span>
                </div>
              </div>

              <div className="hero-stat">
                <span className="hero-stat-icon">
                  <FaDumbbell />
                </span>

                <div className="hero-stat-info">
                  <strong>50+</strong>
                  <span>Fitness Classes</span>
                </div>
              </div>

              <div className="hero-stat">
                <span className="hero-stat-icon">
                  <FaTrophy />
                </span>

                <div className="hero-stat-info">
                  <strong>20+</strong>
                  <span>Expert Trainers</span>
                </div>
              </div>

              <div className="hero-stat">
                <span className="hero-stat-icon">
                  <FiStar />
                </span>

                <div className="hero-stat-info">
                  <strong>4.9</strong>
                  <span>Member Rating</span>
                </div>
              </div>

            </div>

          </div>
        </div>

      </section>

      {/* =====================================================
          VIDEO POPUP
      ===================================================== */}
      {videoOpen && (
        <div
          className="video-modal"
          onClick={() => setVideoOpen(false)}
        >
          <div
            className="video-modal-box"
            onClick={(e) => e.stopPropagation()}
          >

            {/* CLOSE BUTTON */}
            <button
              type="button"
              className="video-close"
              onClick={() => setVideoOpen(false)}
              aria-label="Close video"
            >
              <FiX />
            </button>

            {/* VIDEO */}
            <video
              className="gym-video"
              src={fitnessvideo}
              controls
              autoPlay
              playsInline
            >
              Your browser does not support the video.
            </video>

          </div>
        </div>
      )}
    </>
  );
};

export default Hero;