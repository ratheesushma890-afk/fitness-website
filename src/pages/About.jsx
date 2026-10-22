import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import {
  FiArrowRight,
  FiArrowUpRight,
  FiAward,
  FiCheck,
  FiHeart,
  FiTarget,
  FiTrendingUp,
  FiUsers,
  FiZap,
} from "react-icons/fi";

import { FaDumbbell } from "react-icons/fa";

import "./About.css";


/* =========================================================
   STATS
========================================================= */

const stats = [
  {
    id: 1,
    value: 500,
    suffix: "+",
    label: "Active Members",
  },
  {
    id: 2,
    value: 20,
    suffix: "+",
    label: "Expert Trainers",
  },
  {
    id: 3,
    value: 50,
    suffix: "+",
    label: "Fitness Classes",
  },
  {
    id: 4,
    value: 4.9,
    suffix: "",
    label: "Member Rating",
    decimal: true,
  },
];


/* =========================================================
   VALUES
========================================================= */

const values = [
  {
    number: "01",
    icon: <FiTarget />,
    title: "Goal Focused",
    text:
      "Your training starts with a clear goal. We help you build the right plan and stay focused on progress.",
  },

  {
    number: "02",
    icon: <FiUsers />,
    title: "Strong Community",
    text:
      "Train with people who motivate you, support you and make every workout feel more powerful.",
  },

  {
    number: "03",
    icon: <FiAward />,
    title: "Expert Coaching",
    text:
      "Experienced trainers help you improve technique, train safely and get more from every session.",
  },

  {
    number: "04",
    icon: <FiTrendingUp />,
    title: "Real Progress",
    text:
      "We focus on consistency, strength and measurable results that help you become better every day.",
  },
];


/* =========================================================
   FACILITIES
========================================================= */

const facilities = [
  "Modern Strength Equipment",
  "Dedicated Cardio Zone",
  "Personal Training Area",
  "Group Fitness Studio",
  "Locker & Changing Facility",
  "Fitness Assessment",
];


/* =========================================================
   COUNT UP COMPONENT
========================================================= */

const CountUp = ({
  value,
  suffix = "",
  decimal = false,
  start,
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let animationFrame;

    const duration = 1700;

    const startTime = performance.now();

    const animate = (currentTime) => {
      const progress = Math.min(
        (currentTime - startTime) / duration,
        1
      );

      /* smooth animation */
      const easeOut =
        1 - Math.pow(1 - progress, 3);

      const currentValue =
        value * easeOut;

      if (decimal) {
        setCount(
          Number(currentValue.toFixed(1))
        );
      } else {
        setCount(
          Math.floor(currentValue)
        );
      }

      if (progress < 1) {
        animationFrame =
          requestAnimationFrame(
            animate
          );
      } else {
        setCount(value);
      }
    };

    animationFrame =
      requestAnimationFrame(
        animate
      );

    return () =>
      cancelAnimationFrame(
        animationFrame
      );
  }, [
    value,
    decimal,
    start,
  ]);

  return (
    <>
      {decimal
        ? Number(count).toFixed(1)
        : count}
      {suffix}
    </>
  );
};


/* =========================================================
   ABOUT PAGE
========================================================= */

const About = () => {
  const statsRef = useRef(null);

  const [
    startCounter,
    setStartCounter,
  ] = useState(false);


  /* =======================================================
     START COUNTER WHEN STATS ENTER SCREEN
  ======================================================= */

  useEffect(() => {
    const element =
      statsRef.current;

    if (!element) return;


    const observer =
      new IntersectionObserver(
        ([entry]) => {
          if (
            entry.isIntersecting
          ) {
            setStartCounter(true);

            observer.disconnect();
          }
        },
        {
          threshold: 0.3,
        }
      );


    observer.observe(element);


    return () =>
      observer.disconnect();
  }, []);


  return (
    <main className="about-page">


      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="about-hero">

        <div className="about-hero-overlay" />

        <div className="about-hero-lines" />


        <div className="about-hero-container">


          <div className="about-hero-content">

            <div className="about-eyebrow">

              <span />

              ABOUT FITZONE

            </div>


            <h1>
              BUILT FOR
              <br />

              <strong>
                STRONGER
              </strong>{" "}

              YOU.
            </h1>


            <p>
              More than a gym — a place
              where expert coaching,
              modern training and a
              powerful community help you
              become better every day.
            </p>


            <div className="about-hero-actions">

              <Link
                to="/join"
                className="about-primary-btn"
              >
                JOIN FITZONE

                <FiArrowRight />
              </Link>


              <Link
                to="/classes"
                className="about-secondary-btn"
              >
                EXPLORE CLASSES

                <FiArrowUpRight />
              </Link>

            </div>

          </div>


          <div className="about-hero-index">

            <span>
              01
            </span>

            <div />

            <p>
              EST.
              <strong>
                2020
              </strong>
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          ANIMATED STATS
      ===================================================== */}

      <section
        className="about-stats"
        ref={statsRef}
      >

        <div className="about-stats-container">

          {stats.map(
            (stat, index) => (
              <div
                className="about-stat"
                key={stat.id}
              >

                <span className="about-stat-index">
                  0{index + 1}
                </span>


                <div className="about-stat-number">

                  <CountUp
                    value={
                      stat.value
                    }
                    suffix={
                      stat.suffix
                    }
                    decimal={
                      stat.decimal
                    }
                    start={
                      startCounter
                    }
                  />

                </div>


                <p>
                  {stat.label}
                </p>


                <div className="about-stat-line" />

              </div>
            )
          )}

        </div>

      </section>


      {/* =====================================================
          STORY
      ===================================================== */}

      <section className="about-story">

        <div className="about-container about-story-grid">


          {/* IMAGES */}

          <div className="about-story-visual">


            <div className="about-story-main">

              <img
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1300&q=90"
                alt="FitZone gym"
              />


              <span className="about-image-number">
                01
              </span>

            </div>


            <div className="about-story-small">

              <img
                src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=900&q=90"
                alt="FitZone training"
              />

            </div>


            <div className="about-story-badge">

              <FaDumbbell />

              <div>

                <strong>
                  STRONGER
                </strong>

                <span>
                  EVERY DAY
                </span>

              </div>

            </div>

          </div>


          {/* CONTENT */}

          <div className="about-story-content">


            <div className="about-section-label">

              <span>
                01
              </span>

              OUR STORY

            </div>


            <h2>
              WE DON'T JUST
              <br />
              BUILD BODIES.

              <strong>
                {" "}
                WE BUILD
                CONFIDENCE.
              </strong>
            </h2>


            <p className="about-story-lead">
              FitZone was created with
              one simple belief — fitness
              should make your life
              stronger, not more
              complicated.
            </p>


            <p>
              We combine modern
              equipment, experienced
              coaches and a motivating
              environment to help every
              member train with purpose
              and achieve real progress.
            </p>


            <div className="about-story-features">


              <div className="about-story-feature">

                <span>
                  <FiCheck />
                </span>


                <div>

                  <strong>
                    Train With Purpose
                  </strong>

                  <p>
                    Every workout has a
                    reason and every
                    session moves you
                    forward.
                  </p>

                </div>

              </div>


              <div className="about-story-feature">

                <span>
                  <FiCheck />
                </span>


                <div>

                  <strong>
                    Progress Together
                  </strong>

                  <p>
                    A supportive fitness
                    community that keeps
                    you motivated.
                  </p>

                </div>

              </div>

            </div>


            <Link
              to="/membership"
              className="about-text-link"
            >
              VIEW MEMBERSHIP

              <FiArrowRight />
            </Link>

          </div>

        </div>

      </section>


      {/* =====================================================
          WHY FITZONE
      ===================================================== */}

      <section className="about-values">

        <div className="about-big-word">
          STRONG
        </div>


        <div className="about-container">


          <div className="about-values-header">


            <div>

              <div className="about-section-label">

                <span>
                  02
                </span>

                WHY FITZONE

              </div>


              <h2>
                EVERYTHING YOU NEED
                <br />

                TO BECOME

                <strong>
                  {" "}
                  STRONGER.
                </strong>
              </h2>

            </div>


            <p>
              Smart training, expert
              support and the right
              environment — all in one
              place.
            </p>

          </div>


          <div className="about-values-grid">

            {values.map(
              (item) => (
                <article
                  className="about-value-card"
                  key={
                    item.number
                  }
                >

                  <span className="about-value-number">
                    {item.number}
                  </span>


                  <div className="about-value-icon">
                    {item.icon}
                  </div>


                  <h3>
                    {item.title}
                  </h3>


                  <p>
                    {item.text}
                  </p>


                  <div className="about-value-bottom">

                    <span />

                    <FiArrowUpRight />

                  </div>

                </article>
              )
            )}

          </div>

        </div>

      </section>


      {/* =====================================================
          FACILITIES
      ===================================================== */}

      <section className="about-facilities">

        <div className="about-container about-facilities-grid">


          {/* CONTENT */}

          <div className="about-facilities-content">


            <div className="about-section-label">

              <span>
                03
              </span>

              OUR SPACE

            </div>


            <h2>
              DESIGNED TO
              <br />

              HELP YOU

              <strong>
                {" "}
                TRAIN BETTER.
              </strong>
            </h2>


            <p>
              From strength training to
              cardio and personal
              coaching, our space is
              designed to give you
              everything you need for a
              better workout.
            </p>


            <div className="about-facility-list">

              {facilities.map(
                (
                  facility,
                  index
                ) => (
                  <div
                    className="about-facility-item"
                    key={index}
                  >

                    <span>
                      <FiCheck />
                    </span>

                    <strong>
                      {facility}
                    </strong>

                  </div>
                )
              )}

            </div>


            <Link
              to="/classes"
              className="about-primary-btn"
            >
              EXPLORE CLASSES

              <FiArrowRight />
            </Link>

          </div>


          {/* IMAGE */}

          <div className="about-facility-visual">


            <div className="about-facility-main">

              <img
                src="https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&w=1300&q=90"
                alt="FitZone equipment"
              />


              <div className="about-equipment-tag">

                <FiZap />


                <div>

                  <span>
                    PREMIUM
                  </span>

                  <strong>
                    EQUIPMENT
                  </strong>

                </div>

              </div>

            </div>


            <div className="about-facility-small">

              <img
                src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=90"
                alt="FitZone workout"
              />

            </div>

          </div>

        </div>

      </section>


    </main>
  );
};

export default About;