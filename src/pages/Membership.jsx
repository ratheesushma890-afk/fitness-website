
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowRight,
  FiCheck,
  FiClock,
  FiUsers,
  FiPlay,
  FiShield,
  FiStar,
  FiAward,
  FiHeart,
  FiLock,
  FiDroplet,
  FiTrendingUp,
} from "react-icons/fi";
import { FaDumbbell, FaCrown } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Membership.css";
import Testimonials from "../components/Testimonials";

const plans = [
  {
    id: "basic",
    name: "Basic Plan",
    subtitle: "Perfect to Get Started",
    price: "999",
    image:
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=700&q=85",
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
      "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=700&q=85",
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
    subtitle: "Complete Transformation",
    price: "2,499",
    image:
      "https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=700&q=85",
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

const benefits = [
  {
    icon: FaDumbbell,
    title: "Modern Equipment",
    text: "Latest fitness machines",
  },
  {
    icon: FiUsers,
    title: "Expert Trainers",
    text: "Certified professionals",
  },
  {
    icon: FiClock,
    title: "Flexible Timings",
    text: "Work out on your schedule",
  },
  {
    icon: FiHeart,
    title: "Supportive Community",
    text: "Be part of the FitZone family",
  },
];

const facilities = [
  { icon: FaDumbbell, title: "Spacious Workout Area" },
  { icon: FiUsers, title: "Group Fitness Classes" },
  { icon: FiAward, title: "Personal Training" },
  { icon: FiLock, title: "Locker Rooms" },
  { icon: FiDroplet, title: "Shower Facilities" },
  { icon: FiHeart, title: "Nutrition Support" },
];

const stats = [
  { value: "3000+", title: "Happy Members", icon: FiUsers },
  { value: "10+", title: "Expert Trainers", icon: FiAward },
  { value: "5+", title: "Years of Excellence", icon: FaDumbbell },
  { value: "95%", title: "Member Satisfaction", icon: FiTrendingUp },
];

const reviews = [
  {
    name: "Priya Sharma",
    since: "Member since 2023",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=85",
    text: "FitZone has completely changed my lifestyle. The trainers are amazing and the environment is so motivating!",
  },
  {
    name: "Rohit Verma",
    since: "Member since 2022",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=85",
    text: "Best gym in the city! Great facilities, supportive community and flexible plans.",
  },
  {
    name: "Ananya Singh",
    since: "Member since 2023",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=85",
    text: "I've never felt stronger and more confident. FitZone is not just a gym, it's a family.",
  },
];

const Membership = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 65,
      easing: "ease-out-cubic",
    });
    AOS.refresh();
  }, []);

  const joinPlan = (plan) => {
    navigate("/join", {
      state: {
        plan: plan.name,
        price: `₹${plan.price}`,
        selectedPlan: plan,
      },
    });
  };

  const scrollToPlans = () => {
    document.getElementById("membership-plans")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const scrollToFacilities = () => {
    document.getElementById("membership-facilities")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <main className="fz-membership">

      {/* ================= HERO ================= */}

      <section className="fz-member-hero">
        <div className="fz-member-hero-shade" />

        <div className="fz-member-container fz-member-hero-layout">

          <div className="fz-member-hero-copy" data-aos="fade-right">
            <span className="fz-member-kicker">
              <FaDumbbell /> MEMBERSHIP
            </span>

            <h1>
              More Than a Gym
              <span>A Healthier You</span>
            </h1>

            <p>
              Unlock a stronger, fitter and happier you with
              FitZone membership. World-class facilities,
              expert trainers and a supportive community,
              all in one place.
            </p>

            <div className="fz-member-hero-actions">
              <button
                className="fz-member-btn-primary"
                type="button"
                onClick={scrollToPlans}
              >
                Join Membership <FiArrowRight />
              </button>

              <button
                className="fz-member-btn-outline"
                type="button"
                onClick={scrollToFacilities}
              >
                <FiPlay /> Explore Facilities
              </button>
            </div>
          </div>

          <div className="fz-member-hero-right" data-aos="fade-left">
            <div className="fz-member-script">
              Stronger
              <span>Fitter</span>
              <span>Happier</span>
              <strong>You</strong>
            </div>

            <div className="fz-member-count">
              <div className="fz-member-count-avatars">
                <img
                  src={reviews[0].image}
                  alt="Member"
                />
                <img
                  src={reviews[1].image}
                  alt="Member"
                />
                <img
                  src={reviews[2].image}
                  alt="Member"
                />
              </div>
              <div>
                <strong>3000+</strong>
                <span>Happy Members</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ================= BENEFITS ================= */}

      <section className="fz-member-benefits">
        <div className="fz-member-container fz-member-benefits-grid">
          {benefits.map(({ icon: Icon, title, text }) => (
            <div className="fz-member-benefit" key={title}>
              <span className="fz-member-benefit-icon">
                <Icon />
              </span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= PRICING ================= */}

      <section
        className="fz-member-pricing"
        id="membership-plans"
      >
        <div className="fz-member-container fz-member-pricing-layout">

          {/* LEFT INTRO */}

          <div className="fz-member-pricing-intro" data-aos="fade-right">
            <span className="fz-member-section-label">
              <FaDumbbell /> CHOOSE YOUR PLAN
            </span>

            <h2>
              Membership Plans
              <span>For Every Goal</span>
            </h2>

            <p>
              Flexible plans designed to fit your
              lifestyle and help you achieve your
              fitness goals.
            </p>

            <ul className="fz-member-intro-list">
              {[
                "Flexible Payment Options",
                "Professional Fitness Support",
                "Modern Training Environment",
                "A Motivating Community",
              ].map((item) => (
                <li key={item}>
                  <FiCheck /> {item}
                </li>
              ))}
            </ul>

            <div className="fz-member-start-note">
              <FiArrowRight />
              <span>Start Today</span>
            </div>
          </div>

          {/* PRICING CARDS */}

          <div className="fz-member-plans-grid">
            {plans.map((plan, index) => (
              <article
                key={plan.id}
                className={`fz-member-plan ${
                  plan.popular ? "fz-member-plan-popular" : ""
                }`}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                {plan.popular && (
                  <div className="fz-member-popular-badge">
                    <FaCrown /> Most Popular
                  </div>
                )}

                <div className="fz-member-plan-top">
                  <h3>{plan.name}</h3>
                  <p>{plan.subtitle}</p>
                </div>

                <div className="fz-member-plan-image">
                  <img src={plan.image} alt={plan.name} loading="lazy" />
                </div>

                <div className="fz-member-plan-body">
                  <div className="fz-member-plan-price">
                    <strong>₹{plan.price}</strong>
                    <span>/ month</span>
                  </div>

                  <ul className="fz-member-plan-features">
                    {plan.features.map((feature) => (
                      <li key={feature}>
                        <FiCheck />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    className={`fz-member-plan-button ${
                      plan.popular ? "filled" : ""
                    }`}
                    onClick={() => joinPlan(plan)}
                  >
                    Join {plan.name.replace(" Plan", "")}
                    <FiArrowRight />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FACILITIES ================= */}

      <section
        className="fz-member-facilities"
        id="membership-facilities"
      >
        <div className="fz-member-container fz-member-facilities-layout">

          <div className="fz-member-facilities-intro" data-aos="fade-right">
            <span className="fz-member-section-label">
              OUR FACILITIES
            </span>

            <h2>
              Premium Facilities
              <span>For a Better You</span>
            </h2>

            <p>
              Experience modern fitness amenities
              designed to make every workout comfortable,
              effective and enjoyable.
            </p>

            <button
              type="button"
              className="fz-member-tour-button"
              onClick={() =>
                document.getElementById("membership-why")?.scrollIntoView({
                  behavior: "smooth",
                })
              }
            >
              Why Choose FitZone <FiArrowRight />
            </button>
          </div>

          <div className="fz-member-facilities-grid">
            {facilities.map(({ icon: Icon, title }, index) => (
              <div
                className="fz-member-facility-tile"
                key={title}
                data-aos="zoom-in"
                data-aos-delay={index * 60}
              >
                <span><Icon /></span>
                <h3>{title}</h3>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= WHY CHOOSE ================= */}

      <section className="fz-member-why" id="membership-why">
        <div className="fz-member-container fz-member-why-layout">

          <div className="fz-member-photo-collage" data-aos="fade-right">
            <img
              className="fz-member-photo-main"
              src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=850&q=85"
              alt="Strength training"
              loading="lazy"
            />

            <div className="fz-member-photo-small">
              <img
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=500&q=85"
                alt="Gym equipment"
                loading="lazy"
              />
              <img
                src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=500&q=85"
                alt="Fitness training"
                loading="lazy"
              />
            </div>
          </div>

          <div className="fz-member-why-content" data-aos="fade-up">
            <span className="fz-member-section-label">
              WHY CHOOSE US
            </span>

            <h2>
              Why Choose
              <span>FitZone?</span>
            </h2>

            <ul>
              {[
                "Certified & Professional Trainers",
                "Modern & Safe Environment",
                "Flexible Membership Plans",
                "Fun Group Classes",
                "Supportive Fitness Community",
              ].map((item) => (
                <li key={item}>
                  <FiCheck /> {item}
                </li>
              ))}
            </ul>

            <button
              type="button"
              className="fz-member-learn-btn"
              onClick={scrollToPlans}
            >
              Explore Plans <FiArrowRight />
            </button>
          </div>

          <div className="fz-member-stats" data-aos="fade-left">
            {stats.map(({ icon: Icon, value, title }) => (
              <div className="fz-member-stat" key={title}>
                <span><Icon /></span>
                <div>
                  <strong>{value}</strong>
                  <p>{title}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

     <Testimonials />
    </main>
  );
};

export default Membership;
