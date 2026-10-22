
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import {
  FiArrowRight,
  FiPlay,
  FiUsers,
  FiStar,
  FiX,
} from "react-icons/fi";

import { FaDumbbell, FaTrophy } from "react-icons/fa";

import fitness from "../assets/fitness image.png";
import fitnessvideo from "../assets/fitnessvideo.mp4";

import "./Hero.css";

/* ============================================
   ANIMATED COUNTER
============================================ */

const AnimatedNumber = ({ end, suffix = "", decimal = 0 }) => {
  const [count, setCount] = useState(0);
  const numberRef = useRef(null);

  useEffect(() => {
    const element = numberRef.current;
    if (!element) return;

    let frameId;
    let started = false;

    const animateNumber = () => {
      if (started) return;
      started = true;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setCount(end);
        return;
      }

      const duration = 1400;
      let startTime = null;

      const animate = (time) => {
        if (startTime === null) startTime = time;

        const progress = Math.min((time - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);

        setCount(end * eased);

        if (progress < 1) {
          frameId = requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };

      frameId = requestAnimationFrame(animate);
    };

    let observer;

    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            animateNumber();
            observer.disconnect();
          }
        },
        { threshold: 0.25 }
      );

      observer.observe(element);
    } else {
      animateNumber();
    }

    return () => {
      observer?.disconnect();
      cancelAnimationFrame(frameId);
    };
  }, [end]);

  return (
    <strong ref={numberRef}>
      {count.toFixed(decimal)}
      {suffix}
    </strong>
  );
};

/* ============================================
   HERO COMPONENT
============================================ */

const Hero = () => {
  const [videoOpen, setVideoOpen] = useState(false);

  useEffect(() => {
    if (!videoOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setVideoOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => window.removeEventListener("keydown", handleEscape);
  }, [videoOpen]);

  return (
    <>
      <section className="hero">

        {/* BACKGROUND IMAGE */}
        <img
          src={fitness}
          alt="Fitness gym training"
          className="hero-bg"
        />

        {/* DARK OVERLAY */}
        <div className="hero-overlay"></div>

        <div className="hero-container">

          {/* MAIN CONTENT */}
          <div className="hero-content">

            <div className="hero-tag">
              <FaDumbbell />
              <span>WORKING OUT</span>
            </div>

            {/* TWO LINE HEADING */}
            <h1 className="hero-title">
              <span className="hero-title-first">
                STRONGER <em>HEALTHIER</em>
              </span>

              <span className="hero-title-second">
                HAPPIER YOU
              </span>
            </h1>

            <div className="hero-line"></div>

            <p className="hero-description">
              Join our fitness community and take the first step
              towards a stronger, healthier and more confident you.
            </p>

            {/* BUTTONS */}
            <div className="hero-actions">

              <Link to="/join" className="hero-main-btn">
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
          </div>

          {/* STATS WITHOUT BOXES */}
          <div className="hero-stats">

            <div className="hero-stat">
              <span className="hero-stat-icon">
                <FiUsers />
              </span>
              <div className="hero-stat-info">
                <AnimatedNumber end={500} suffix="+" />
                <span>Happy Members</span>
              </div>
            </div>

            <div className="hero-stat">
              <span className="hero-stat-icon">
                <FaDumbbell />
              </span>
              <div className="hero-stat-info">
                <AnimatedNumber end={50} suffix="+" />
                <span>Fitness Classes</span>
              </div>
            </div>

            <div className="hero-stat">
              <span className="hero-stat-icon">
                <FaTrophy />
              </span>
              <div className="hero-stat-info">
                <AnimatedNumber end={20} suffix="+" />
                <span>Expert Trainers</span>
              </div>
            </div>

            <div className="hero-stat">
              <span className="hero-stat-icon">
                <FiStar />
              </span>
              <div className="hero-stat-info">
                <AnimatedNumber end={4.9} decimal={1} />
                <span>Member Rating</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* VIDEO POPUP */}
      {videoOpen && (
        <div
          className="video-modal"
          onClick={() => setVideoOpen(false)}
        >
          <div
            className="video-modal-box"
            role="dialog"
            aria-modal="true"
            aria-label="Fitness gym video"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="video-close"
              onClick={() => setVideoOpen(false)}
              aria-label="Close video"
            >
              <FiX />
            </button>

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
