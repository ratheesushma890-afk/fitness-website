import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import {
  FiArrowLeft,
  FiAward,
  FiBarChart2,
  FiCheck,
  FiInstagram,
  FiLinkedin,
  FiShare2,
  FiStar,
  FiTarget,
  FiUser,
  FiUsers,
} from "react-icons/fi";

import {
  FaFacebookF,
  FaYoutube,
} from "react-icons/fa";

import "./TrainerDetail.css";


/* =========================================================
   TRAINER DATA
========================================================= */

const trainersData = [
  {
    id: 1,

    name: "Arjun Mehta",

    role: "Strength & Conditioning Specialist",

    rating: "4.9",

    reviews: "120 reviews",

    clients: "500+",

    experience: "8+ Years",

    transformations: "1,200+",

    image:
      "https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=1200&q=90",

    about:
      "I am a certified strength and conditioning specialist with a passion for helping people become stronger, healthier, and more confident. My training approach focuses on personalized workout plans, proper technique, and sustainable lifestyle changes to deliver real and lasting results.",

    specialties: [
      "Strength Training",
      "Muscle Building",
      "Weight Loss",
      "Functional Training",
      "Personalized Workout Plans",
    ],

    achievements: [
      "8+ Years of Professional Experience",
      "Certified Personal Trainer (CPT)",
      "Specialist in Strength & Conditioning",
      "Helped 1,200+ Clients Transform",
      "Featured in Fitness & Wellness Programs",
    ],

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
      {
        type: "linkedin",
        url: "https://www.linkedin.com/",
      },
    ],
  },

  {
    id: 2,

    name: "Riya Sharma",

    role: "Yoga & Flexibility Specialist",

    rating: "4.9",

    reviews: "98 reviews",

    clients: "400+",

    experience: "6+ Years",

    transformations: "800+",

    image:
      "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=1200&q=90",

    about:
      "I am a certified yoga and flexibility trainer focused on helping people improve mobility, balance, posture, and overall wellness. My sessions combine yoga, breathing techniques, flexibility work, and functional movement to create a healthier body and calmer mind.",

    specialties: [
      "Yoga Training",
      "Flexibility Training",
      "Mobility Training",
      "Posture Improvement",
      "Mind & Body Wellness",
    ],

    achievements: [
      "6+ Years of Professional Experience",
      "Certified Yoga Trainer",
      "Mobility & Flexibility Specialist",
      "Helped 800+ Members",
      "Wellness & Lifestyle Coach",
    ],

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
      {
        type: "linkedin",
        url: "https://www.linkedin.com/",
      },
    ],
  },

  {
    id: 3,

    name: "Kabir Singh",

    role: "Nutrition & Fitness Specialist",

    rating: "4.8",

    reviews: "110 reviews",

    clients: "650+",

    experience: "10+ Years",

    transformations: "1,500+",

    image:
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1200&q=90",

    about:
      "I am a fitness and nutrition coach focused on helping people build healthier and more sustainable lifestyles. My approach combines structured workouts, practical nutrition guidance, and goal-based coaching to help members lose fat, gain muscle, and improve overall fitness.",

    specialties: [
      "Nutrition Coaching",
      "Weight Management",
      "Muscle Gain",
      "Body Transformation",
      "Personal Fitness Planning",
    ],

    achievements: [
      "10+ Years of Professional Experience",
      "Certified Fitness & Nutrition Coach",
      "Weight Management Specialist",
      "Helped 1,500+ Clients Transform",
      "Personalized Nutrition Programs",
    ],

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
      {
        type: "linkedin",
        url: "https://www.linkedin.com/",
      },
    ],
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
   TRAINER DETAIL
========================================================= */

const TrainerDetail = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const { id } = useParams();


  /* =======================================================
     FIND SELECTED TRAINER
  ======================================================= */

  const fallbackTrainer = trainersData.find(
    (item) => String(item.id) === String(id)
  );


  const trainer = fallbackTrainer
    ? {
        ...fallbackTrainer,
        ...(location.state?.trainer || {}),
      }
    : location.state?.trainer;


  /* =======================================================
     SOCIAL CLICK
  ======================================================= */

  const openSocial = (url) => {
    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );
  };


  /* =======================================================
     TRAINER NOT FOUND
  ======================================================= */

  if (!trainer) {
    return (
      <main className="td-page">

        <div className="td-not-found">

          <h1>
            Trainer Not Found
          </h1>

          <p>
            This trainer profile is currently unavailable.
          </p>

          <button
            type="button"
            onClick={() => navigate("/trainers")}
          >
            <FiArrowLeft />

            Back to Trainers
          </button>

        </div>

      </main>
    );
  }


  return (
    <main className="td-page">


      {/* BACKGROUND */}

      <div className="td-background-shape td-shape-one" />

      <div className="td-background-shape td-shape-two" />


      <div className="td-container">


        {/* =================================================
            BACK BUTTON
        ================================================= */}

        <button
          type="button"
          className="td-back-btn"
          onClick={() => navigate("/trainers")}
        >
          <FiArrowLeft />

          Back to Trainers
        </button>


        {/* =================================================
            PROFILE
        ================================================= */}

        <section className="td-profile-layout">


          {/* =================================================
              LEFT — ONLY ONE IMAGE
          ================================================= */}

          <div className="td-image-column">

            <div className="td-main-image">

              <img
                src={trainer.image}
                alt={trainer.name}
              />

              <div className="td-image-overlay" />


              <div className="td-image-label">

                <span>
                  CERTIFIED
                </span>

                <strong>
                  PERSONAL TRAINER
                </strong>

              </div>

            </div>

          </div>


          {/* =================================================
              RIGHT DETAILS
          ================================================= */}

          <div className="td-details-column">


            {/* NAME */}

            <div className="td-profile-heading">

              <span className="td-eyebrow">
                CERTIFIED TRAINER
              </span>


              <h1>
                {trainer.name}
              </h1>


              <h2>
                {trainer.role}
              </h2>


              {/* RATING */}

              <div className="td-rating">

                <div className="td-stars">

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

            </div>


            {/* =================================================
                STATS
            ================================================= */}

            <div className="td-stats">


              {/* CLIENTS */}

              <div className="td-stat-card">

                <div className="td-stat-icon">
                  <FiUsers />
                </div>


                <div>

                  <strong>
                    {trainer.clients}
                  </strong>

                  <span>
                    Happy Clients
                  </span>

                </div>

              </div>


              {/* EXPERIENCE */}

              <div className="td-stat-card">

                <div className="td-stat-icon">
                  <FiAward />
                </div>


                <div>

                  <strong>
                    {trainer.experience}
                  </strong>

                  <span>
                    Experience
                  </span>

                </div>

              </div>


              {/* TRANSFORMATIONS */}

              <div className="td-stat-card">

                <div className="td-stat-icon">
                  <FiBarChart2 />
                </div>


                <div>

                  <strong>
                    {trainer.transformations}
                  </strong>

                  <span>
                    Transformations
                  </span>

                </div>

              </div>


            </div>


            {/* =================================================
                ABOUT ME
            ================================================= */}

            <article className="td-card td-about-card">

              <div className="td-card-title">

                <div className="td-title-icon">
                  <FiUser />
                </div>


                <h3>
                  About Me
                </h3>

              </div>


              <p>
                {trainer.about}
              </p>

            </article>


            {/* =================================================
                TWO DETAIL CARDS
            ================================================= */}

            <div className="td-detail-grid">


              {/* SPECIALTIES */}

              <article className="td-card">

                <div className="td-card-title">

                  <div className="td-title-icon">
                    <FiTarget />
                  </div>


                  <h3>
                    Specialties
                  </h3>

                </div>


                <div className="td-title-line" />


                <ul className="td-list">

                  {trainer.specialties.map(
                    (specialty) => (

                      <li key={specialty}>

                        <span>
                          <FiCheck />
                        </span>

                        <p>
                          {specialty}
                        </p>

                      </li>

                    )
                  )}

                </ul>

              </article>


              {/* EXPERIENCE */}

              <article className="td-card">

                <div className="td-card-title">

                  <div className="td-title-icon">
                    <FiAward />
                  </div>


                  <h3>
                    Experience & Achievements
                  </h3>

                </div>


                <div className="td-title-line" />


                <ul className="td-list">

                  {trainer.achievements.map(
                    (achievement) => (

                      <li key={achievement}>

                        <span>
                          <FiCheck />
                        </span>

                        <p>
                          {achievement}
                        </p>

                      </li>

                    )
                  )}

                </ul>

              </article>


            </div>


            {/* =================================================
                CONNECT
            ================================================= */}

            <article className="td-connect-card">


              <div className="td-connect-info">

                <div className="td-share-icon">
                  <FiShare2 />
                </div>


                <div>

                  <h3>
                    Connect With Me
                  </h3>

                  <p>
                    Follow me on social media for fitness
                    tips, workout videos and more.
                  </p>

                </div>

              </div>


              {/* SOCIAL ICONS */}

              <div className="td-socials">

                {trainer.socials.map(
                  (social) => (

                    <button
                      type="button"
                      key={social.type}
                      className={`td-${social.type}`}
                      aria-label={social.type}
                      title={social.type}
                      onClick={() =>
                        openSocial(social.url)
                      }
                    >

                      <SocialIcon
                        type={social.type}
                      />

                    </button>

                  )
                )}

              </div>


            </article>


          </div>


        </section>


      </div>


    </main>
  );
};


export default TrainerDetail;