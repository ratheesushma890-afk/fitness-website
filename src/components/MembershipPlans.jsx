
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiCheck,
  FiArrowUpRight,
  FiZap,
  FiStar,
  FiAward,
} from "react-icons/fi";

import AOS from "aos";
import "aos/dist/aos.css";

import "./MembershipPlans.css";

/* =====================================================
   MEMBERSHIP DATA
===================================================== */

const plans = [
  {
    id: 1,
    name: "Basic",
    subtitle: "Start Your Journey",
    price: "999",
    period: "/ month",
    icon: <FiZap />,
    popular: false,
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1000&q=85",
    features: [
      "Full Gym Access",
      "Modern Equipment",
      "Locker Facility",
      "Fitness Assessment",
      "General Workout Plan",
    ],
  },
  {
    id: 2,
    name: "Pro",
    subtitle: "Train Without Limits",
    price: "1,499",
    period: "/ month",
    icon: <FiStar />,
    popular: true,
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=85",
    features: [
      "Everything in Basic",
      "All Fitness Classes",
      "Personalized Workout Plan",
      "Basic Diet Guidance",
      "Progress Tracking",
    ],
  },
  {
    id: 3,
    name: "Elite",
    subtitle: "Maximum Results",
    price: "2,499",
    period: "/ month",
    icon: <FiAward />,
    popular: false,
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1000&q=85",
    features: [
      "Everything in Pro",
      "Personal Trainer Sessions",
      "Custom Diet Plan",
      "Advanced Body Analysis",
      "Priority Support",
    ],
  },
];

/* =====================================================
   MEMBERSHIP COMPONENT
===================================================== */

const MembershipPlans = () => {
  const navigate = useNavigate();

  /* AOS SCROLL ANIMATION */

  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-out-cubic",
      once: true,
      offset: 80,
      delay: 0,
      mirror: false,
    });

    AOS.refresh();
  }, []);

  const handlePlan = (plan) => {
    navigate("/join", {
      state: {
        plan: plan.name,
        price: plan.price,
      },
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section className="membership-section">

      {/* BACKGROUND TEXT */}

      <div
        className="membership-bg-text"
        aria-hidden="true"
      >
        MEMBERSHIP
      </div>

      <div className="membership-container">

        {/* HEADING */}

        <div className="membership-heading">

          <div
            className="membership-small-title"
            data-aos="fade-up"
            data-aos-duration="700"
          >
            <span></span>
            MEMBERSHIP PLANS
            <span></span>
          </div>

          <h2
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Find The Plan <span>That Fits You</span>
          </h2>

          <p
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Simple membership plans designed for every fitness goal.
            <br />
            Choose your plan and start becoming stronger today.
          </p>

        </div>

        {/* MEMBERSHIP CARDS */}

        <div className="membership-grid">

          {plans.map((plan, index) => (
            <article
              key={plan.id}
              className={`membership-card ${
                plan.popular ? "membership-popular" : ""
              }`}
              data-aos="fade-up"
              data-aos-delay={index * 150}
              data-aos-duration="850"
            >

              {/* MOST POPULAR BADGE */}

              {plan.popular && (
                <div className="popular-badge">
                  <FiStar />
                  MOST POPULAR
                </div>
              )}

              {/* CARD IMAGE */}

              <div className="membership-image">

                <img
                  src={plan.image}
                  alt={`${plan.name} gym membership`}
                  loading="lazy"
                />

                <div className="membership-image-overlay"></div>

                <div className="membership-card-top">

                  <div className="membership-icon">
                    {plan.icon}
                  </div>

                  <div className="membership-plan-number">
                    {String(plan.id).padStart(2, "0")}
                  </div>

                </div>

              </div>

              {/* CARD BODY */}

              <div className="membership-card-body">

                <div className="membership-name">
                  <span>{plan.subtitle}</span>
                  <h3>{plan.name}</h3>
                </div>

                {/* PRICE */}

                <div className="membership-price">

                  <span className="membership-currency">
                    ₹
                  </span>

                  <strong>{plan.price}</strong>

                  <span className="membership-period">
                    {plan.period}
                  </span>

                </div>

                <div className="membership-line"></div>

                {/* FEATURES */}

                <div className="membership-features">

                  {plan.features.map((feature, featureIndex) => (
                    <div
                      className="membership-feature"
                      key={featureIndex}
                    >
                      <span className="membership-check">
                        <FiCheck />
                      </span>

                      <p>{feature}</p>
                    </div>
                  ))}

                </div>

                {/* BUTTON */}

                <button
                  type="button"
                  className="membership-btn"
                  onClick={() => handlePlan(plan)}
                >
                  {plan.popular ? "Join Pro" : "Get Started"}
                  <FiArrowUpRight />
                </button>

              </div>

            </article>
          ))}

        </div>

      </div>
    </section>
  );
};

export default MembershipPlans;
