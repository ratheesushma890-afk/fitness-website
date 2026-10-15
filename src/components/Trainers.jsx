import React from "react";
import { useNavigate } from "react-router-dom";

import {
  FiArrowUpRight,
  FiInstagram,
  FiFacebook,
  FiAward,
} from "react-icons/fi";

import "./Trainers.css";

const Trainers = () => {
  const navigate = useNavigate();

  /* =========================================================
     TRAINERS DATA
  ========================================================= */

  const trainers = [
    {
      id: 1,
      number: "01",
      name: "Arjun Sharma",
      role: "Strength Coach",
      experience: "7+ Years Experience",

      image:
        "https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=1000&q=90",

      instagram: "#",
      facebook: "#",
    },

    {
      id: 2,
      number: "02",
      name: "Riya Mehta",
      role: "Yoga & Mobility Coach",
      experience: "5+ Years Experience",

      image:
        "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1000&q=90",

      instagram: "#",
      facebook: "#",
    },

    {
      id: 3,
      number: "03",
      name: "Kabir Singh",
      role: "Cardio & HIIT Coach",
      experience: "6+ Years Experience",

      image:
        "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1000&q=90",

      instagram: "#",
      facebook: "#",
    },
  ];

  /* =========================================================
     OPEN TRAINER DETAIL
  ========================================================= */

  const openTrainer = (trainer) => {
    navigate(`/trainer/${trainer.id}`, {
      state: {
        trainer: trainer,
      },
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =========================================================
     OPEN ALL TRAINERS
  ========================================================= */

  const openAllTrainers = () => {
    navigate("/trainers");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section
      className="trainers-section"
      id="trainers"
    >
      {/* =====================================================
          BACKGROUND TEXT
      ====================================================== */}

      <div
        className="trainers-bg-text"
        aria-hidden="true"
      >
        TRAINERS
      </div>

      <div className="trainers-container">

        {/* ===================================================
            HEADING
        ==================================================== */}

        <div className="trainers-heading">

          <div className="trainers-small-title">
            <span></span>

            OUR EXPERTS

            <span></span>
          </div>

          <h2>
            Meet The Trainers

            <span>
              Who Push You Further.
            </span>
          </h2>

          <p>
            Expert guidance, real motivation and personalized
            support to help you become stronger every day.
          </p>

        </div>


        {/* ===================================================
            TRAINERS GRID
        ==================================================== */}

        <div className="trainers-grid">

          {trainers.map((trainer) => (
            <article
              className="trainer-card"
              key={trainer.id}

              /* CARD CLICK / TOUCH */
              onClick={() => openTrainer(trainer)}

              /* KEYBOARD */
              onKeyDown={(e) => {
                if (
                  e.key === "Enter" ||
                  e.key === " "
                ) {
                  e.preventDefault();

                  openTrainer(trainer);
                }
              }}

              role="button"
              tabIndex={0}
              aria-label={`View ${trainer.name} details`}
            >

              {/* =============================================
                  TRAINER IMAGE
              ============================================== */}

              <div className="trainer-image">

                <img
                  src={trainer.image}
                  alt={`${trainer.name} - ${trainer.role}`}
                  loading="lazy"
                />

                {/* DARK IMAGE OVERLAY */}

                <div className="trainer-overlay"></div>


                {/* ===========================================
                    NUMBER
                ============================================ */}

                <span className="trainer-number">
                  {trainer.number}
                </span>


                {/* ===========================================
                    SOCIAL ICONS
                ============================================ */}

                <div
                  className="trainer-socials"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >

                  {/* INSTAGRAM */}

                  <a
                    href={trainer.instagram}
                    aria-label={`${trainer.name} Instagram`}
                    onClick={(e) => {
                      e.stopPropagation();

                      if (
                        trainer.instagram === "#"
                      ) {
                        e.preventDefault();
                      }
                    }}
                  >
                    <FiInstagram />
                  </a>


                  {/* FACEBOOK */}

                  <a
                    href={trainer.facebook}
                    aria-label={`${trainer.name} Facebook`}
                    onClick={(e) => {
                      e.stopPropagation();

                      if (
                        trainer.facebook === "#"
                      ) {
                        e.preventDefault();
                      }
                    }}
                  >
                    <FiFacebook />
                  </a>

                </div>


                {/* ===========================================
                    NAME + ROLE
                ============================================ */}

                <div className="trainer-image-content">

                  <span className="trainer-role">
                    {trainer.role}
                  </span>

                  <h3>
                    {trainer.name}
                  </h3>

                </div>

              </div>


              {/* =============================================
                  BOTTOM CONTENT
              ============================================== */}

              <div className="trainer-bottom">

                {/* EXPERIENCE */}

                <div className="trainer-experience">

                  <div className="trainer-award">
                    <FiAward />
                  </div>

                  <div>

                    <span>
                      Experience
                    </span>

                    <strong>
                      {trainer.experience}
                    </strong>

                  </div>

                </div>


                {/* ===========================================
                    VIEW TRAINER BUTTON
                ============================================ */}

                <button
                  type="button"
                  className="trainer-arrow"
                  aria-label={`View ${trainer.name}`}

                  onClick={(e) => {
                    /* Prevent card double click */

                    e.stopPropagation();

                    openTrainer(trainer);
                  }}
                >
                  <FiArrowUpRight />
                </button>

              </div>

            </article>
          ))}

        </div>


        {/* ===================================================
            BOTTOM CTA
        ==================================================== */}

        <div className="trainers-footer">

          <p>
            Train smarter with coaches who understand your goals.
          </p>

          <button
            type="button"
            className="all-trainers-btn"
            onClick={openAllTrainers}
          >
            Meet All Trainers

            <FiArrowUpRight />
          </button>

        </div>

      </div>
    </section>
  );
};

export default Trainers;