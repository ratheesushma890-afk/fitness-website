import React from "react";
import { useNavigate } from "react-router-dom";

import {
  FiArrowRight,
  FiAward,
  FiCheck,
  FiClock,
  FiHeart,
  FiStar,
  FiTrendingUp,
  FiUsers,
  FiWifi,
} from "react-icons/fi";

import {
  FaCrown,
  FaDumbbell,
  FaLock,
  FaShower,
  FaUserTie,
} from "react-icons/fa";

import "./Membership.css";


/* =========================================================
   MEMBERSHIP PLANS
========================================================= */

const plans = [
  {
    id: "basic",
    name: "Basic Plan",
    subtitle: "Perfect to Get Started",
    price: "999",
    image:
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=900&q=90",

    features: [
      "Access to Gym Floor",
      "Basic Equipment",
      "Locker Facility",
      "Free WiFi",
      "Community Access",
    ],
  },

  {
    id: "standard",
    name: "Standard Plan",
    subtitle: "Great for Regular Fitness",
    price: "1,499",
    popular: true,
    image:
      "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=900&q=90",

    features: [
      "Access to Gym Floor",
      "Group Classes (Yoga, HIIT)",
      "Locker Facility",
      "Shower Facility",
      "Nutrition Guidance",
      "Community Access",
    ],
  },

  {
    id: "premium",
    name: "Premium Plan",
    subtitle: "For a Complete Transformation",
    price: "2,499",
    image:
      "https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=900&q=90",

    features: [
      "Access to Gym Floor",
      "All Group Classes",
      "Personal Trainer Support",
      "Locker & Shower Facility",
      "Nutrition Plan",
      "Priority Access",
      "Community & Events",
    ],
  },
];


/* =========================================================
   MEMBERSHIP PAGE
========================================================= */

const Membership = () => {
  const navigate = useNavigate();


  /* =======================================================
     JOIN PLAN
  ======================================================= */

  const handleJoinPlan = (plan) => {
    navigate("/join", {
      state: {
        plan: plan.name,
        price: `₹${plan.price}`,
        selectedPlan: plan,
      },
    });
  };


  /* =======================================================
     JOIN NOW
  ======================================================= */

  const handleJoinNow = () => {
    navigate("/join");
  };


  /* =======================================================
     SCROLL TO PLANS
  ======================================================= */

  const scrollToPlans = () => {
    document
      .getElementById("membership-plans")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };


  return (
    <main className="membership-page">


      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="membership-hero">

        <div className="membership-hero-overlay" />

        <div className="membership-hero-glow hero-glow-one" />
        <div className="membership-hero-glow hero-glow-two" />


        <div className="membership-container membership-hero-inner">


          {/* HERO CONTENT */}

          <div className="membership-hero-content">

            <span className="membership-eyebrow">
              FITNESS MEMBERSHIP
            </span>


            <h1>
              Invest in a
              <span>
                Healthier You
              </span>
            </h1>


            <p>
              Choose a membership plan that fits your goals
              and start your fitness journey today. Premium
              facilities, expert trainers and a supportive
              fitness community.
            </p>


            <div className="membership-hero-actions">

              <button
                type="button"
                className="membership-primary-btn"
                onClick={handleJoinNow}
              >
                Join Now

                <FiArrowRight />
              </button>


              <button
                type="button"
                className="membership-outline-btn"
                onClick={scrollToPlans}
              >
                View Plans
              </button>

            </div>

          </div>


          {/* HERO QUOTE */}

          <div className="membership-hero-quote">

            <span>
              Stronger
            </span>

            <span>
              Fitter
            </span>

            <span>
              Happier
            </span>

            <strong>
              You
            </strong>

            <div className="quote-line" />

          </div>

        </div>

      </section>


      {/* =====================================================
          BENEFITS STRIP
      ===================================================== */}

      <section className="membership-benefits">

        <div className="membership-container benefits-grid">


          <div className="benefit-item">

            <div className="benefit-icon">
              <FaDumbbell />
            </div>

            <div>
              <h3>
                Modern Equipment
              </h3>

              <p>
                World-class gym equipment
              </p>
            </div>

          </div>


          <div className="benefit-item">

            <div className="benefit-icon">
              <FiUsers />
            </div>

            <div>
              <h3>
                Expert Trainers
              </h3>

              <p>
                Certified professionals
              </p>
            </div>

          </div>


          <div className="benefit-item">

            <div className="benefit-icon">
              <FaCrown />
            </div>

            <div>
              <h3>
                Flexible Plans
              </h3>

              <p>
                Choose what fits you
              </p>
            </div>

          </div>


          <div className="benefit-item">

            <div className="benefit-icon">
              <FiClock />
            </div>

            <div>
              <h3>
                24/7 Access
              </h3>

              <p>
                Work out on your schedule
              </p>
            </div>

          </div>


          <div className="benefit-item">

            <div className="benefit-icon">
              <FiHeart />
            </div>

            <div>
              <h3>
                Supportive Community
              </h3>

              <p>
                Be part of a fitness family
              </p>
            </div>

          </div>


        </div>

      </section>


      {/* =====================================================
          MEMBERSHIP PLANS
      ===================================================== */}

      <section
        className="membership-plans-section"
        id="membership-plans"
      >

        <div className="membership-container">


          {/* SECTION HEADING */}

          <div className="membership-section-heading">

            <span>
              OUR PLANS
            </span>

            <h2>
              Choose Your Membership Plan
            </h2>

            <p>
              Simple, flexible and transparent pricing.
              No hidden fees.
            </p>

          </div>


          {/* PLAN GRID */}

          <div className="membership-plan-grid">

            {plans.map((plan) => (

              <article
                key={plan.id}
                className={`membership-plan-card ${
                  plan.popular
                    ? "popular-plan"
                    : ""
                }`}
              >




                {/* IMAGE */}

                <div className="plan-image">

                  <img
                    src={plan.image}
                    alt={plan.name}
                  />

                  <div className="plan-image-overlay" />

                </div>


                {/* CONTENT */}

                <div className="plan-content">


                  <div className="plan-title">

                    <h3>
                      {plan.name}
                    </h3>

                    <p>
                      {plan.subtitle}
                    </p>

                  </div>


                  {/* FEATURES */}

                  <ul className="plan-features">

                    {plan.features.map(
                      (feature) => (

                        <li key={feature}>

                          <span>
                            <FiCheck />
                          </span>

                          {feature}

                        </li>

                      )
                    )}

                  </ul>


                  {/* PRICE */}

                  <div className="plan-price">

                    <strong>
                      ₹{plan.price}
                    </strong>

                    <span>
                      / month
                    </span>

                  </div>


                  {/* BUTTON */}

                  <button
                    type="button"
                    className="plan-join-btn"
                    onClick={() =>
                      handleJoinPlan(plan)
                    }
                  >
                    Join {plan.name}

                    <FiArrowRight />
                  </button>


                </div>

              </article>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          BOTTOM INFORMATION
      ===================================================== */}

      <section className="membership-bottom">

        <div className="membership-container membership-bottom-grid">


          {/* WHY CHOOSE */}

          <article className="membership-why-card">

            <h2>
              Why Choose FitZone?
            </h2>


            <div className="why-grid">


              <div className="why-item">

                <span>
                  <FiAward />
                </span>

                <p>
                  Certified
                  <br />
                  Trainers
                </p>

              </div>


              <div className="why-item">

                <span>
                  <FiHeart />
                </span>

                <p>
                  Modern
                  <br />
                  Facilities
                </p>

              </div>


              <div className="why-item">

                <span>
                  <FiUsers />
                </span>

                <p>
                  Flexible
                  <br />
                  Membership
                </p>

              </div>


              <div className="why-item">

                <span>
                  <FiTrendingUp />
                </span>

                <p>
                  Real
                  <br />
                  Results
                </p>

              </div>


            </div>

          </article>


          {/* TESTIMONIAL */}

          <article className="membership-review-card">

            <div className="review-top">

              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=90"
                alt="Priya Sharma"
              />


              <div>

                <p className="review-text">
                  “Joining FitZone was the best decision
                  for my fitness journey. Great trainers,
                  amazing environment and flexible plans.”
                </p>


                <div className="review-stars">

                  {[1, 2, 3, 4, 5].map(
                    (star) => (
                      <FiStar key={star} />
                    )
                  )}

                </div>


                <strong>
                  Priya Sharma
                </strong>

                <span>
                  Premium Member
                </span>

              </div>

            </div>


            <div className="review-dots">
              <span className="active" />
              <span />
              <span />
            </div>

          </article>


          {/* FINAL CTA */}

          <article className="membership-final-cta">

            <div className="final-cta-overlay" />


            <div className="final-cta-content">

              <span>
                READY TO START?
              </span>


              <h2>
                Join Our
                <br />
                Fitness Family
              </h2>


              <p>
                Transform your lifestyle with the right
                membership plan.
              </p>


              <button
                type="button"
                onClick={handleJoinNow}
              >
                Join Now

                <FiArrowRight />
              </button>

            </div>

          </article>


        </div>

      </section>


    </main>
  );
};


export default Membership;