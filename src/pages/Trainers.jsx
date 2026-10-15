import React from "react";

import { useNavigate } from "react-router-dom";

import {
  FiArrowRight,
  FiAward,
  FiBarChart2,
  FiCheck,
  FiHeart,
  FiInstagram,
  FiLinkedin,
  FiStar,
  FiUsers,
} from "react-icons/fi";

import {
  FaFacebookF,
  FaYoutube,
} from "react-icons/fa";

import "./Trainers.css";


/* =========================================================
   TRAINER DATA
========================================================= */

const trainers = [
  {
    id: 1,

    name: "Arjun Mehta",

    role: "Strength & Conditioning",

    rating: "4.9",

    reviews: "120 reviews",

    image:
      "https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=900&q=90",

    description:
      "Specializes in strength training, muscle building, and overall fitness improvement.",

    socials: [
      {
        type: "instagram",
        url: "https://www.instagram.com/",
      },
      {
        type: "facebook",
        url: "https://www.facebook.com/",
      },
      {
        type: "linkedin",
        url: "https://www.linkedin.com/",
      },
    ],
  },

  {
    id: 2,

    name: "Riya Sharma",

    role: "Yoga & Flexibility",

    rating: "4.9",

    reviews: "98 reviews",

    image:
      "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=900&q=90",

    description:
      "Helps you build strength, improve flexibility, and find balance through personalized sessions.",

    socials: [
      {
        type: "instagram",
        url: "https://www.instagram.com/",
      },
      {
        type: "facebook",
        url: "https://www.facebook.com/",
      },
      {
        type: "youtube",
        url: "https://www.youtube.com/",
      },
    ],
  },

  {
    id: 3,

    name: "Kabir Singh",

    role: "Nutrition & Fitness",

    rating: "4.8",

    reviews: "110 reviews",

    image:
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=900&q=90",

    description:
      "Expert in nutrition planning, weight management, and personalized fitness guidance.",

    socials: [
      {
        type: "instagram",
        url: "https://www.instagram.com/",
      },
      {
        type: "facebook",
        url: "https://www.facebook.com/",
      },
      {
        type: "linkedin",
        url: "https://www.linkedin.com/",
      },
    ],
  },
];


/* =========================================================
   TESTIMONIAL DATA
========================================================= */

const testimonials = [
  {
    id: 1,

    name: "Aarav Sharma",

    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",

    text:
      "Arjun helped me transform my body in just 3 months. His training style is professional and motivating!",
  },

  {
    id: 2,

    name: "Priya Malik",

    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",

    text:
      "Riya's sessions have improved my flexibility and reduced my stress. Amazing training experience!",
  },

  {
    id: 3,

    name: "Rahul Verma",

    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",

    text:
      "The fitness and nutrition guidance completely changed my lifestyle. I feel healthier and more energetic.",
  },
];


/* =========================================================
   SOCIAL ICON
========================================================= */

const SocialIcon = ({ type }) => {
  if (type === "instagram") {
    return <FiInstagram />;
  }

  if (type === "facebook") {
    return <FaFacebookF />;
  }

  if (type === "youtube") {
    return <FaYoutube />;
  }

  if (type === "linkedin") {
    return <FiLinkedin />;
  }

  return null;
};


/* =========================================================
   TRAINERS PAGE
========================================================= */

const Trainers = () => {
  const navigate = useNavigate();


  /* =======================================================
     VIEW PROFILE
  ======================================================= */

  const handleProfile = (trainer) => {
    navigate(`/trainer/${trainer.id}`, {
      state: {
        trainer,
      },
    });
  };


  /* =======================================================
     SOCIAL CLICK
  ======================================================= */

  const handleSocialClick = (url) => {
    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );
  };


  return (
    <main className="ft-trainers-page">


      {/* ===================================================
          HERO
      =================================================== */}

      <section className="ft-trainers-hero">

        <div className="ft-trainers-hero-overlay" />


        <div className="ft-trainers-container ft-trainers-hero-inner">


          <div className="ft-trainers-hero-content">

            <span className="ft-small-title">
              OUR TRAINERS
            </span>


            <h1>
              Meet Our
              <br />
              Expert Trainers
            </h1>


            <p>
              Our certified trainers are here to guide,
              motivate, and support you on your fitness
              journey. Get personalized training, expert
              advice, and real results.
            </p>


            <button
              type="button"
              onClick={() => {
                document
                  .getElementById("our-trainers")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  });
              }}
            >
              Find Your Trainer

              <FiArrowRight />
            </button>

          </div>


          <div className="ft-hero-quote">

            <span>
              Stronger
            </span>

            <strong>
              Every Day
            </strong>

          </div>


        </div>

      </section>


      {/* ===================================================
          TRAINERS
      =================================================== */}

      <section
        className="ft-trainers-section"
        id="our-trainers"
      >

        <div className="ft-trainers-container">


          <div className="ft-section-heading">

            <span>
              OUR EXPERTS
            </span>

            <h2>
              Meet Our Trainers
            </h2>

            <p>
              Certified professionals, real experience, and
              a passion for helping you achieve your fitness
              goals.
            </p>

          </div>


          {/* =================================================
              3 CARDS
          ================================================= */}

          <div className="ft-trainer-grid">


            {trainers.map((trainer) => (

              <article
                className="ft-trainer-card"
                key={trainer.id}
              >


                {/* IMAGE */}

                <div className="ft-trainer-image">

                  <img
                    src={trainer.image}
                    alt={trainer.name}
                  />

                  <div className="ft-trainer-image-shade" />

                </div>


                {/* CONTENT */}

                <div className="ft-trainer-content">


                  <h3>
                    {trainer.name}
                  </h3>


                  <span className="ft-trainer-role">
                    {trainer.role}
                  </span>


                  {/* RATING */}

                  <div className="ft-trainer-rating">

                    <div>

                      {[1, 2, 3, 4, 5].map(
                        (star) => (
                          <FiStar key={star} />
                        )
                      )}

                    </div>


                    <strong>
                      {trainer.rating}
                    </strong>


                    <span>
                      ({trainer.reviews})
                    </span>

                  </div>


                  <p className="ft-trainer-description">
                    {trainer.description}
                  </p>


                  {/* BOTTOM */}

                  <div className="ft-trainer-bottom">


                    {/* SOCIAL ICONS */}

                    <div className="ft-trainer-socials">


                      {trainer.socials.map(
                        (social) => (

                          <button
                            type="button"
                            key={social.type}
                            aria-label={social.type}
                            title={`Open ${social.type}`}
                            onClick={() =>
                              handleSocialClick(
                                social.url
                              )
                            }
                          >

                            <SocialIcon
                              type={social.type}
                            />

                          </button>

                        )
                      )}


                    </div>


                    {/* VIEW PROFILE */}

                    <button
                      type="button"
                      className="ft-profile-btn"
                      onClick={() =>
                        handleProfile(trainer)
                      }
                    >
                      View Profile

                      <FiArrowRight />
                    </button>


                  </div>

                </div>

              </article>

            ))}


          </div>

        </div>

      </section>


      {/* ===================================================
          BENEFITS
      =================================================== */}

      <section className="ft-benefits-section">

        <div className="ft-trainers-container">

          <div className="ft-benefits-box">


            {/* BENEFIT 1 */}

            <div className="ft-benefit">

              <FiUsers />

              <h3>
                Certified Experts
              </h3>

              <p>
                Trained and certified
                <br />
                professionals
              </p>

            </div>


            {/* BENEFIT 2 */}

            <div className="ft-benefit">

              <FiAward />

              <h3>
                Personalized Plans
              </h3>

              <p>
                Training plans tailored
                <br />
                to your goals
              </p>

            </div>


            {/* BENEFIT 3 */}

            <div className="ft-benefit">

              <FiBarChart2 />

              <h3>
                Proven Results
              </h3>

              <p>
                Real transformations
                <br />
                and success stories
              </p>

            </div>


            {/* BENEFIT 4 */}

            <div className="ft-benefit">

              <FiHeart />

              <h3>
                Ongoing Support
              </h3>

              <p>
                Guidance at every
                <br />
                step of your journey
              </p>

            </div>


          </div>

        </div>

      </section>


      {/* ===================================================
          CTA
      =================================================== */}

      <section className="ft-trainer-cta">

        <div className="ft-trainers-container">

          <div className="ft-trainer-cta-box">

            <div className="ft-trainer-cta-overlay" />


            <div className="ft-trainer-cta-content">

              <span>
                READY TO START?
              </span>

              <h2>
                Train with the Best
              </h2>

              <p>
                Get expert guidance and take the first step
                towards a stronger, healthier you.
              </p>

            </div>


            <button
              type="button"
              onClick={() => navigate("/join")}
            >
              Join Now

              <FiArrowRight />
            </button>

          </div>

        </div>

      </section>


      {/* ===================================================
          SUCCESS STORIES
      =================================================== */}

      <section className="ft-success-section">

        <div className="ft-trainers-container">


          <div className="ft-section-heading">

            <span>
              WHAT OUR MEMBERS SAY
            </span>

            <h2>
              Success Stories
            </h2>

            <p>
              Real people. Real results. Hear from our
              members who trained with our experts.
            </p>

          </div>


          <div className="ft-testimonial-grid">


            {testimonials.map((item) => (

              <article
                className="ft-testimonial-card"
                key={item.id}
              >

                <div className="ft-testimonial-top">


                  <img
                    src={item.image}
                    alt={item.name}
                  />


                  <div>

                    <h3>
                      {item.name}
                    </h3>


                    <div className="ft-testimonial-stars">

                      {[1, 2, 3, 4, 5].map(
                        (star) => (
                          <FiStar key={star} />
                        )
                      )}

                    </div>

                  </div>


                  <span className="ft-quote">
                    “
                  </span>


                </div>


                <p>
                  “{item.text}”
                </p>


              </article>

            ))}


          </div>

        </div>

      </section>


    

    </main>
  );
};


export default Trainers;