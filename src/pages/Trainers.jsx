
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiArrowRight,
  FiBarChart2,
  FiCheck,
  FiHeart,
  FiInstagram,
  FiLinkedin,
  FiStar,
  FiUsers,
  FiArrowUpRight,
  FiShield,
  FiTarget,
} from "react-icons/fi";

import { FaFacebookF, FaYoutube } from "react-icons/fa";

import AOS from "aos";
import "aos/dist/aos.css";
import "./Trainers.css";
import Testimonials from "../components/Testimonials";

/* =========================================
   TRAINERS DATA
========================================= */

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

/* =========================================
   BENEFITS DATA
========================================= */

const benefits = [
  {
    icon: FiUsers,
    title: "Certified Experts",
    text: "Experienced professionals who know how to guide your progress.",
  },
  {
    icon: FiTarget,
    title: "Personalized Plans",
    text: "Training tailored to your goals, ability, and schedule.",
  },
  {
    icon: FiBarChart2,
    title: "Proven Results",
    text: "Trackable progress and steady improvements that last.",
  },
  {
    icon: FiHeart,
    title: "Ongoing Support",
    text: "Encouragement and guidance at every stage of your journey.",
  },
];

/* =========================================
   SOCIAL ICON COMPONENT
========================================= */

const SocialIcon = ({ type }) => {
  if (type === "instagram") return <FiInstagram />;
  if (type === "facebook") return <FaFacebookF />;
  if (type === "linkedin") return <FiLinkedin />;
  if (type === "youtube") return <FaYoutube />;

  return null;
};

/* =========================================
   TRAINERS PAGE
========================================= */

const Trainers = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 750,
      easing: "ease-out-cubic",
      once: true,
      offset: 75,
    });

    AOS.refresh();
  }, []);

  const scrollToTrainers = () => {
    document.getElementById("our-trainers")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const viewProfile = (trainer) => {
    navigate(`/trainer/${trainer.id}`, {
      state: { trainer },
    });
  };

  return (
    <main className="ft-trainers-page">
      {/* =====================================
          HERO SECTION
      ===================================== */}

      <section
        className="ft-trainers-hero"
        aria-labelledby="ft-hero-title"
      >
        <div className="ft-trainers-hero-overlay" />

        <div
          className="ft-hero-orb ft-hero-orb-one"
          aria-hidden="true"
        />

        <div
          className="ft-hero-orb ft-hero-orb-two"
          aria-hidden="true"
        />

        <div className="ft-trainers-container ft-trainers-hero-inner">
          <div className="ft-trainers-hero-content">
            <span className="ft-small-title">
              <span className="ft-title-line" />
              OUR TRAINERS
            </span>

            <h1 id="ft-hero-title">
              Meet Our <span>Expert</span>
              <br />
              Trainers
              <span className="ft-hero-dot">.</span>
            </h1>

            <p>
              Meet the people who turn your fitness goals
              into real progress. Expert coaching, personal
              attention, and motivation that lasts.
            </p>

            <div className="ft-hero-actions">
              <button
                type="button"
                className="ft-main-btn"
                onClick={scrollToTrainers}
              >
                Find Your Trainer
                <FiArrowRight />
              </button>

              <span className="ft-hero-hint">
                <FiCheck />
                Expert guidance, every step
              </span>
            </div>
          </div>

          <div
            className="ft-hero-quote"
            aria-label="Stronger every day"
          >
            <span>TRAIN WITH PURPOSE</span>

            <strong>
              Stronger
              <br />
              Every Day.
            </strong>

            <div className="ft-quote-rule" />
          </div>
        </div>

        <div className="ft-hero-bottom">
          <span>01 / MEET THE TEAM</span>
          <span>SCROLL TO EXPLORE ↓</span>
        </div>
      </section>

      {/* =====================================
          TRAINERS SECTION
      ===================================== */}

      <section
        className="ft-trainers-section"
        id="our-trainers"
        aria-labelledby="ft-trainers-title"
      >
        <div className="ft-trainers-container">
          <div
            className="ft-section-heading"
            data-aos="fade-up"
          >
            <span className="ft-section-eyebrow">
              THE PEOPLE BEHIND YOUR PROGRESS
            </span>

            <h2 id="ft-trainers-title">
              Meet Our <em>Trainers</em>
            </h2>

            <p>
              Dedicated professionals with the experience
              and passion to help you become your strongest
              self.
            </p>
          </div>

          <div className="ft-trainer-grid">
            {trainers.map((trainer, index) => (
              <article
                className="ft-trainer-card"
                key={trainer.id}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="ft-trainer-image">
                  <img
                    src={trainer.image}
                    alt={`${trainer.name}, ${trainer.role} trainer`}
                    loading="lazy"
                  />

                  <div className="ft-trainer-image-shade" />

                  <span className="ft-trainer-image-tag">
                    <FiShield />
                    Certified Trainer
                  </span>

                  <span className="ft-trainer-index">
                    0{index + 1}
                  </span>
                </div>

                <div className="ft-trainer-content">
                  <span className="ft-trainer-role">
                    {trainer.role}
                  </span>

                  <h3>{trainer.name}</h3>

                  <div className="ft-trainer-rating">
                    <div
                      className="ft-rating-stars"
                      aria-label={`${trainer.rating} out of 5 stars`}
                    >
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FiStar key={star} />
                      ))}
                    </div>

                    <strong>{trainer.rating}</strong>

                    <span>({trainer.reviews})</span>
                  </div>

                  <p className="ft-trainer-description">
                    {trainer.description}
                  </p>

                  <div className="ft-trainer-bottom">
                    <div className="ft-trainer-socials">
                      {trainer.socials.map((social) => (
                        <a
                          key={social.type}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${trainer.name} on ${social.type}`}
                          title={social.type}
                        >
                          <SocialIcon type={social.type} />
                        </a>
                      ))}
                    </div>

                    <button
                      type="button"
                      className="ft-profile-btn"
                      onClick={() => viewProfile(trainer)}
                    >
                      View Profile
                      <FiArrowUpRight />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================
          BENEFITS SECTION
      ===================================== */}

      <section
        className="ft-benefits-section"
        aria-label="Why train with FitZone"
      >
        <div className="ft-trainers-container">
          <div className="ft-benefits-box">
            {benefits.map(
              ({ icon: Icon, title, text }, index) => (
                <div
                  className="ft-benefit"
                  key={title}
                  data-aos="fade-up"
                  data-aos-delay={index * 70}
                >
                  <div className="ft-benefit-icon">
                    <Icon />
                  </div>

                  <h3>{title}</h3>

                  <p>{text}</p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

     <Testimonials />
    </main>
  );
};

export default Trainers;
