import React, { useEffect } from "react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  FiActivity,
  FiArrowLeft,
  FiArrowRight,
  FiCalendar,
  FiCheck,
  FiClock,
  FiTarget,
  FiUsers,
} from "react-icons/fi";

import { FaDumbbell } from "react-icons/fa";

import classesData from "../Data/classData";

import "./ClassDetail.css";


const ClassDetail = () => {
  const { id } = useParams();

  const navigate = useNavigate();


  /* =========================================================
     FIND CLASS
  ========================================================= */

  const selectedClass = classesData.find(
    (item) =>
      String(item.id) === String(id)
  );


  /* =========================================================
     SCROLL TOP
  ========================================================= */

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [id]);


  /* =========================================================
     NOT FOUND
  ========================================================= */

  if (!selectedClass) {
    return (
      <main className="cd-not-found">

        <span>404</span>

        <h1>CLASS NOT FOUND</h1>

        <p>
          This fitness class is not available.
        </p>

        <Link to="/classes">
          <FiArrowLeft />
          BACK TO CLASSES
        </Link>

      </main>
    );
  }


  return (
    <main className="class-detail-page">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="cd-hero">

        <img
          src={selectedClass.image}
          alt={selectedClass.title}
          className="cd-hero-image"
        />

        <div className="cd-hero-overlay" />

        <div className="cd-hero-glow" />


        <div className="cd-hero-container">

          <button
            type="button"
            className="cd-back"
            onClick={() => navigate(-1)}
          >
            <FiArrowLeft />
            BACK TO CLASSES
          </button>


          <div className="cd-hero-content">

            <div className="cd-class-label">

              <span>
                {selectedClass.number}
              </span>

              {selectedClass.category}

            </div>


            <h1>
              {selectedClass.title}
            </h1>


            <p>
              {selectedClass.description}
            </p>


            <Link
              to="/join"
              state={{
                classBooking: selectedClass,
              }}
              className="cd-hero-button"
            >
              JOIN THIS CLASS

              <FiArrowRight />
            </Link>

          </div>


          <div className="cd-big-number">
            {selectedClass.number}
          </div>

        </div>

      </section>


      {/* =====================================================
          QUICK DETAILS
      ====================================================== */}

      <section className="cd-details-bar">

        <div className="cd-container cd-details-grid">

          {/* DURATION */}

          <div className="cd-detail-item">

            <div className="cd-detail-icon">
              <FiClock />
            </div>

            <div>

              <span>
                DURATION
              </span>

              <strong>
                {selectedClass.duration}
              </strong>

            </div>

          </div>


          {/* LEVEL */}

          <div className="cd-detail-item">

            <div className="cd-detail-icon">
              <FiActivity />
            </div>

            <div>

              <span>
                FITNESS LEVEL
              </span>

              <strong>
                {selectedClass.level}
              </strong>

            </div>

          </div>


          {/* TRAINER */}

          <div className="cd-detail-item">

            <div className="cd-detail-icon">
              <FiUsers />
            </div>

            <div>

              <span>
                TRAINER
              </span>

              <strong>
                {selectedClass.trainer}
              </strong>

            </div>

          </div>


          {/* DAYS */}

          <div className="cd-detail-item">

            <div className="cd-detail-icon">
              <FiCalendar />
            </div>

            <div>

              <span>
                TRAINING DAYS
              </span>

              <strong>
                {selectedClass.schedule}
              </strong>

            </div>

          </div>


          {/* TIME */}

          <div className="cd-detail-item">

            <div className="cd-detail-icon">
              <FiClock />
            </div>

            <div>

              <span>
                CLASS TIME
              </span>

              <strong>
                {selectedClass.time}
              </strong>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          ABOUT CLASS
      ====================================================== */}

      <section className="cd-about">

        <div className="cd-bg-text">
          TRAIN
        </div>


        <div className="cd-container cd-about-grid">

          {/* =================================================
              LEFT IMAGE
          ================================================= */}

          <div className="cd-about-visual">

            <div className="cd-about-shape" />


            <div className="cd-about-image">

              <img
                src={selectedClass.image}
                alt={`${selectedClass.title} workout`}
              />

              <div className="cd-image-overlay" />


              <div className="cd-image-text">

                <span>
                  TRAIN HARD
                </span>

                <strong>
                  FEEL STRONG.
                </strong>

              </div>

            </div>

          </div>


          {/* =================================================
              RIGHT CONTENT
          ================================================= */}

          <div className="cd-about-content">

            <div className="cd-section-label">

              <span>
                01
              </span>

              ABOUT THIS CLASS

            </div>


            <h2>
              {selectedClass.title}
            </h2>


            <p className="cd-about-text">
              {selectedClass.about}
            </p>


            {/* ===============================================
                BENEFITS
            =============================================== */}

            <div className="cd-benefit-heading">

              <span>
                02
              </span>

              KEY BENEFITS

            </div>


            <div className="cd-benefit-grid">

              {selectedClass.benefits.map(
                (benefit, index) => (

                  <div
                    className="cd-benefit-card"
                    key={index}
                  >

                    <div className="cd-check">
                      <FiCheck />
                    </div>


                    <div>

                      <strong>
                        {benefit}
                      </strong>

                      <p>
                        Build better fitness
                        with guided and
                        structured training.
                      </p>

                    </div>

                  </div>

                )
              )}

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          TRAINING INFORMATION
      ====================================================== */}

      <section className="cd-training">

        <div className="cd-container cd-training-grid">

          {/* LEFT */}

          <div className="cd-training-content">

            <div className="cd-section-label">

              <span>
                03
              </span>

              YOUR TRAINING

            </div>


            <h2>
              EXPERT COACHING.
              <br />

              <strong>
                REAL PROGRESS.
              </strong>
            </h2>


            <p>
              Your FitZone coach will guide you
              through every movement, help you
              maintain proper technique and keep
              your workout focused on your
              fitness goals.
            </p>


            <div className="cd-training-points">

              <div>
                <FiCheck />
                Structured workout
              </div>

              <div>
                <FiCheck />
                Professional coaching
              </div>

              <div>
                <FiCheck />
                Technique guidance
              </div>

              <div>
                <FiCheck />
                Goal-focused training
              </div>

            </div>

          </div>


          {/* RIGHT CARD */}

          <div className="cd-schedule-card">

            <div className="cd-schedule-head">

              <FaDumbbell />

              <div>

                <span>
                  FITZONE CLASS
                </span>

                <strong>
                  {selectedClass.category}
                </strong>

              </div>

            </div>


            <h3>
              TRAINING SCHEDULE
            </h3>


            <div className="cd-schedule-row">

              <FiCalendar />

              <div>

                <span>
                  DAYS
                </span>

                <strong>
                  {selectedClass.schedule}
                </strong>

              </div>

            </div>


            <div className="cd-schedule-row">

              <FiClock />

              <div>

                <span>
                  TIME
                </span>

                <strong>
                  {selectedClass.time}
                </strong>

              </div>

            </div>


            <div className="cd-schedule-row">

              <FiTarget />

              <div>

                <span>
                  LEVEL
                </span>

                <strong>
                  {selectedClass.level}
                </strong>

              </div>

            </div>


            <div className="cd-schedule-row">

              <FiUsers />

              <div>

                <span>
                  TRAINER
                </span>

                <strong>
                  {selectedClass.trainer}
                </strong>

              </div>

            </div>


            <Link
              to="/join"
              state={{
                classBooking: selectedClass,
              }}
              className="cd-schedule-button"
            >
              JOIN THIS CLASS

              <FiArrowRight />
            </Link>

          </div>

        </div>

      </section>


    </main>
  );
};

export default ClassDetail;