import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FiCheck,
  FiArrowUpRight,
  FiZap,
  FiStar,
  FiAward,
} from "react-icons/fi";

import "./MembershipPlans.css";

const MembershipPlans = () => {
  const navigate = useNavigate();

  const plans = [
    {
      id: 1,
      name: "Basic",
      subtitle: "Start Your Journey",
      price: "999",
      period: "/ month",
      icon: <FiZap />,
      popular: false,
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
      features: [
        "Everything in Pro",
        "Personal Trainer Sessions",
        "Custom Diet Plan",
        "Advanced Body Analysis",
        "Priority Support",
      ],
    },
  ];

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

        {/* ================================================
            HEADING
        ================================================= */}

        <div className="membership-heading">

          <div className="membership-small-title">
            <span></span>
            MEMBERSHIP PLANS
            <span></span>
          </div>

          <h2>
            Find The Plan
            <span> That Fits You</span>
          </h2>

          <p>
            Simple membership plans designed for every
            fitness goal. Choose your plan and start
            becoming stronger today.
          </p>

        </div>


        {/* ================================================
            PLANS
        ================================================= */}

        <div className="membership-grid">

          {plans.map((plan) => (
            <article
              key={plan.id}
              className={`membership-card ${
                plan.popular ? "membership-popular" : ""
              }`}
            >

              {/* POPULAR BADGE */}

              {plan.popular && (
                <div className="popular-badge">
                  <FiStar />
                  MOST POPULAR
                </div>
              )}


              {/* TOP */}

              <div className="membership-card-top">

                <div className="membership-icon">
                  {plan.icon}
                </div>

                <div className="membership-plan-number">
                  0{plan.id}
                </div>

              </div>


              {/* PLAN NAME */}

              <div className="membership-name">

                <span>
                  {plan.subtitle}
                </span>

                <h3>
                  {plan.name}
                </h3>

              </div>


              {/* PRICE */}

              <div className="membership-price">

                <span className="membership-currency">
                  ₹
                </span>

                <strong>
                  {plan.price}
                </strong>

                <span className="membership-period">
                  {plan.period}
                </span>

              </div>


              {/* LINE */}

              <div className="membership-line"></div>


              {/* FEATURES */}

              <div className="membership-features">

                {plan.features.map((feature, index) => (
                  <div
                    className="membership-feature"
                    key={index}
                  >
                    <span className="membership-check">
                      <FiCheck />
                    </span>

                    <p>
                      {feature}
                    </p>
                  </div>
                ))}

              </div>


              {/* BUTTON */}

              <button
                type="button"
                className="membership-btn"
                onClick={() => handlePlan(plan)}
              >
                {plan.popular
                  ? "Join Pro"
                  : "Get Started"}

                <FiArrowUpRight />
              </button>

            </article>
          ))}

        </div>


        {/* ================================================
            BOTTOM NOTE
        ================================================= */}

        <div className="membership-bottom">

          <div className="membership-bottom-line"></div>

          <p>
            No complicated contracts
            <span> • </span>
            Flexible membership
            <span> • </span>
            Cancel anytime
          </p>

          <div className="membership-bottom-line"></div>

        </div>

      </div>
    </section>
  );
};

export default MembershipPlans;