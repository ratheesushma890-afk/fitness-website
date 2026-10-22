
import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  FiActivity,
  FiArrowRight,
  FiArrowUpRight,
  FiCalendar,
  FiCheck,
  FiClock,
  FiHeart,
  FiTarget,
  FiTrendingUp,
  FiUsers,
  FiZap,
} from "react-icons/fi";

import { FaDumbbell } from "react-icons/fa";

import AOS from "aos";
import "aos/dist/aos.css";

import "./Classes.css";

/* =========================================================
   FITZONE CLASSES DATA
   18 CLASSES — 6 CATEGORIES
========================================================= */

const classesData = [
  /* ================= STRENGTH ================= */

  {
    id: 1,
    number: "01",
    title: "Strength Foundations",
    category: "Strength",
    level: "Beginner",
    duration: "60 Min",
    trainer: "Arjun Sharma",
    schedule: "Mon • Wed • Fri",
    time: "07:00 AM",
    image:
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1200&q=90",
    description:
      "Learn proper lifting technique, build full-body strength and create a strong foundation for long-term progress.",
  },
  {
    id: 2,
    number: "02",
    title: "Power Lifting",
    category: "Strength",
    level: "Intermediate",
    duration: "60 Min",
    trainer: "Arjun Sharma",
    schedule: "Tue • Thu • Sat",
    time: "06:30 PM",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=90",
    description:
      "Improve your squat, bench and deadlift with focused strength programming and expert coaching.",
  },
  {
    id: 3,
    number: "03",
    title: "Muscle Builder",
    category: "Strength",
    level: "All Levels",
    duration: "55 Min",
    trainer: "Vikram Singh",
    schedule: "Mon • Wed • Sat",
    time: "05:30 PM",
    image:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1200&q=90",
    description:
      "Structured resistance training designed to improve muscle strength, control and overall body composition.",
  },

  /* ================= CARDIO ================= */

  {
    id: 4,
    number: "04",
    title: "Cardio Burn",
    category: "Cardio",
    level: "Beginner",
    duration: "45 Min",
    trainer: "Kabir Singh",
    schedule: "Mon • Wed • Fri",
    time: "06:30 AM",
    image:
      "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=1200&q=90",
    description:
      "Boost stamina, burn calories and improve cardiovascular fitness with an energetic guided workout.",
  },
  {
    id: 5,
    number: "05",
    title: "Endurance Ride",
    category: "Cardio",
    level: "All Levels",
    duration: "50 Min",
    trainer: "Kabir Singh",
    schedule: "Tue • Thu • Sat",
    time: "07:30 AM",
    image:
      "https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=1200&q=90",
    description:
      "Build endurance and cardiovascular strength through challenging intervals and controlled intensity.",
  },
  {
    id: 6,
    number: "06",
    title: "Cardio Conditioning",
    category: "Cardio",
    level: "Intermediate",
    duration: "45 Min",
    trainer: "Neeraj Kumar",
    schedule: "Tue • Fri • Sun",
    time: "06:00 PM",
    image:
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=90",
    description:
      "Improve speed, stamina and total-body conditioning with fast-moving cardio exercises and circuits.",
  },

  /* ================= HIIT ================= */

  {
    id: 7,
    number: "07",
    title: "HIIT Blast",
    category: "HIIT",
    level: "Intermediate",
    duration: "40 Min",
    trainer: "Kabir Singh",
    schedule: "Mon • Wed • Sat",
    time: "06:00 PM",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=90",
    description:
      "High-intensity intervals combine strength and cardio for a powerful, efficient full-body workout.",
  },
  {
    id: 8,
    number: "08",
    title: "Power HIIT",
    category: "HIIT",
    level: "Advanced",
    duration: "35 Min",
    trainer: "Neeraj Kumar",
    schedule: "Tue • Thu • Sat",
    time: "07:00 PM",
    image:
      "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=1200&q=90",
    description:
      "Push your limits with explosive exercises, short recovery periods and high-energy conditioning.",
  },
  {
    id: 9,
    number: "09",
    title: "Full Body HIIT",
    category: "HIIT",
    level: "All Levels",
    duration: "40 Min",
    trainer: "Arjun Sharma",
    schedule: "Mon • Fri • Sun",
    time: "05:00 PM",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=90",
    description:
      "Train your entire body through dynamic intervals that build endurance, strength and athletic fitness.",
  },

  /* ================= YOGA ================= */

  {
    id: 10,
    number: "10",
    title: "Morning Yoga",
    category: "Yoga",
    level: "Beginner",
    duration: "50 Min",
    trainer: "Riya Mehta",
    schedule: "Mon • Wed • Fri",
    time: "06:30 AM",
    image:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1200&q=90",
    description:
      "Start your day with mindful movement, controlled breathing and gentle flexibility training.",
  },
  {
    id: 11,
    number: "11",
    title: "Flexibility Flow",
    category: "Yoga",
    level: "All Levels",
    duration: "45 Min",
    trainer: "Riya Mehta",
    schedule: "Tue • Thu • Sat",
    time: "08:00 AM",
    image:
      "https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&w=1200&q=90",
    description:
      "Improve mobility, posture and flexibility through controlled yoga flows and stretching exercises.",
  },
  {
    id: 12,
    number: "12",
    title: "Power Yoga",
    category: "Yoga",
    level: "Intermediate",
    duration: "55 Min",
    trainer: "Riya Mehta",
    schedule: "Mon • Thu • Sun",
    time: "06:00 PM",
    image:
      "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&w=1200&q=90",
    description:
      "A stronger yoga session combining balance, mobility, flexibility and controlled bodyweight strength.",
  },

  /* ================= PERSONAL ================= */

  {
    id: 13,
    number: "13",
    title: "Weight Loss Coaching",
    category: "Personal",
    level: "Personalized",
    duration: "60 Min",
    trainer: "Expert Coach",
    schedule: "Mon • Tue • Thu",
    time: "08:00 AM",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=90",
    description:
      "Personalized one-to-one workouts designed around your fitness level, lifestyle and weight-loss goal.",
  },
  {
    id: 14,
    number: "14",
    title: "Strength Coaching",
    category: "Personal",
    level: "Personalized",
    duration: "60 Min",
    trainer: "Arjun Sharma",
    schedule: "Wed • Fri • Sat",
    time: "09:00 AM",
    image:
      "https://images.unsplash.com/photo-1584466977773-e625c37cdd50?auto=format&fit=crop&w=1200&q=90",
    description:
      "Train one-to-one with focused strength programming, technique correction and progress tracking.",
  },
  {
    id: 15,
    number: "15",
    title: "Fitness Transformation",
    category: "Personal",
    level: "Personalized",
    duration: "60 Min",
    trainer: "Expert Coach",
    schedule: "Tue • Thu • Sat",
    time: "05:00 PM",
    image:
      "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1200&q=90",
    description:
      "A complete personal fitness approach built around your body, goals, schedule and training experience.",
  },

  /* ================= FUNCTIONAL ================= */

  {
    id: 16,
    number: "16",
    title: "Functional Basics",
    category: "Functional",
    level: "Beginner",
    duration: "50 Min",
    trainer: "Arjun Sharma",
    schedule: "Mon • Wed • Fri",
    time: "08:00 AM",
    image:
      "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?auto=format&fit=crop&w=1200&q=90",
    description:
      "Build better movement, balance and everyday strength through practical full-body exercises.",
  },
  {
    id: 17,
    number: "17",
    title: "Athletic Conditioning",
    category: "Functional",
    level: "Intermediate",
    duration: "50 Min",
    trainer: "Kabir Singh",
    schedule: "Tue • Thu • Sat",
    time: "05:30 PM",
    image:
      "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?auto=format&fit=crop&w=1200&q=90",
    description:
      "Develop speed, agility, coordination and strength through athletic movement-based training.",
  },
  {
    id: 18,
    number: "18",
    title: "Core & Mobility",
    category: "Functional",
    level: "All Levels",
    duration: "45 Min",
    trainer: "Riya Mehta",
    schedule: "Tue • Fri • Sun",
    time: "07:00 AM",
    image:
      "https://images.unsplash.com/photo-1571019613914-85f342c6a11e?auto=format&fit=crop&w=1200&q=90",
    description:
      "Strengthen your core and improve mobility with controlled movements designed for better performance.",
  },
];

/* =========================================================
   CATEGORIES
========================================================= */

const categories = [
  "All",
  "Strength",
  "Cardio",
  "HIIT",
  "Yoga",
  "Personal",
  "Functional",
];

/* =========================================================
   CATEGORY FROM FOOTER URL OR HOME STATE
========================================================= */

const getCategoryFromLocation = (location) => {
  const params = new URLSearchParams(location.search);

  const urlCategory = params.get("category");
  const stateCategory = location.state?.category;

  const requested = String(
    urlCategory || stateCategory || "All"
  )
    .trim()
    .toLowerCase();

  return (
    categories.find(
      (category) => category.toLowerCase() === requested
    ) || "All"
  );
};

/* =========================================================
   CLASSES COMPONENT
========================================================= */

const Classes = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState(() =>
    getCategoryFromLocation(location)
  );

  /* ================= AOS ================= */

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 80,
      mirror: false,
    });

    return () => {
      AOS.refresh();
    };
  }, []);

  /* ================= FOOTER CATEGORY ================= */

  useEffect(() => {
    const selected = getCategoryFromLocation(location);

    setActiveCategory(selected);

    if (selected === "All") return;

    const timer = setTimeout(() => {
      const section = document.getElementById(
        "fitness-classes"
      );

      if (!section) return;

      const navbarHeight = 85;

      const top =
        section.getBoundingClientRect().top +
        window.scrollY -
        navbarHeight;

      window.scrollTo({
        top: Math.max(0, top),
        behavior: "smooth",
      });
    }, 200);

    return () => clearTimeout(timer);
  }, [location.search, location.state]);

  /* ================= FILTER CLASSES ================= */

  const filteredClasses = useMemo(() => {
    if (activeCategory === "All") {
      return classesData;
    }

    return classesData.filter(
      (item) => item.category === activeCategory
    );
  }, [activeCategory]);

  /* ================= CATEGORY BUTTON CLICK ================= */

  const handleCategoryChange = (category) => {
    setActiveCategory(category);

    navigate(
      category === "All"
        ? "/classes"
        : `/classes?category=${category.toLowerCase()}`,
      {
        replace: true,
        state: null,
        preventScrollReset: true,
      }
    );
  };

  /* ================= REFRESH ANIMATION ================= */

  useEffect(() => {
    const timer = setTimeout(() => {
      AOS.refreshHard();
    }, 120);

    return () => clearTimeout(timer);
  }, [activeCategory]);

  /* ================= CLASS ICON ================= */

  const getClassIcon = (category) => {
    switch (category) {
      case "Strength":
        return <FaDumbbell />;
      case "Cardio":
        return <FiActivity />;
      case "HIIT":
        return <FiZap />;
      case "Yoga":
        return <FiHeart />;
      case "Personal":
        return <FiTarget />;
      default:
        return <FiTrendingUp />;
    }
  };


  /* =========================================================
     MAIN JSX
  ========================================================= */

  return (
    <main className="classes-page">

      {/* =====================================================
          HERO SECTION
      ===================================================== */}

      <section className="classes-hero">

        <div className="classes-hero-overlay" />

        <div className="classes-hero-decoration classes-decoration-one" />
        <div className="classes-hero-decoration classes-decoration-two" />

        <div className="classes-hero-container">

          <div
            className="classes-hero-content"
            data-aos="fade-right"
            data-aos-duration="900"
          >

            <div className="classes-eyebrow">
              <span />
              FITNESS CLASSES
            </div>

            <h1>
              TRAIN YOUR
              <br />
              <strong>WAY.</strong>
            </h1>

            <p>
              Strength. Cardio. Yoga. HIIT.
              Whatever your goal, there is a
              FitZone class built to move you
              forward.
            </p>

            <div className="classes-hero-actions">

              <a
                href="#fitness-classes"
                className="classes-primary-btn"
              >
                EXPLORE CLASSES
                <FiArrowRight />
              </a>

              <Link
                to="/join"
                className="classes-secondary-btn"
              >
                JOIN FITZONE
                <FiArrowUpRight />
              </Link>

            </div>

          </div>

          <div
            className="classes-hero-right"
            data-aos="fade-left"
            data-aos-delay="200"
          >

            <span>01</span>

            <div className="classes-hero-right-line" />

            <p>
              18 CLASSES
              <strong>6 TRAINING STYLES</strong>
            </p>

          </div>

        </div>

      </section>

      {/* =====================================================
          STATS SECTION
      ===================================================== */}

      <section className="classes-stats">

        <div className="classes-stats-container">

          <div
            className="classes-stat"
            data-aos="fade-up"
          >
            <FiUsers />

            <div>
              <strong>50+</strong>
              <span>Weekly Sessions</span>
            </div>
          </div>

          <div
            className="classes-stat"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <FiClock />

            <div>
              <strong>40–60</strong>
              <span>Minute Workouts</span>
            </div>
          </div>

          <div
            className="classes-stat"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <FiTarget />

            <div>
              <strong>ALL</strong>
              <span>Fitness Levels</span>
            </div>
          </div>

          <div
            className="classes-stat"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <FiCalendar />

            <div>
              <strong>6 DAYS</strong>
              <span>Every Week</span>
            </div>
          </div>

        </div>

      </section>

      {/* =====================================================
          CLASSES SECTION
      ===================================================== */}

      <section
        className="classes-main"
        id="fitness-classes"
      >

        <div className="classes-background-word">
          CLASSES
        </div>

        <div className="classes-container">

          {/* ================= HEADER ================= */}

          <div
            className="classes-section-header"
            data-aos="fade-up"
            data-aos-duration="800"
          >

            <div>

              <div className="classes-section-label">
                <span>01</span>
                FIND YOUR CLASS
              </div>

              <h2>
                CHOOSE HOW YOU
                <br />
                <strong>WANT TO TRAIN.</strong>
              </h2>

            </div>

            <p>
              Select a training style and
              discover three classes designed
              for different fitness levels
              and goals.
            </p>

          </div>

          {/* ================= CATEGORY FILTER ================= */}

          <div
            className="classes-filter"
            data-aos="fade-up"
            data-aos-delay="100"
          >

            {categories.map((category) => (

              <button
                key={category}
                type="button"
                className={
                  activeCategory === category
                    ? "active"
                    : ""
                }
                onClick={() =>
                  handleCategoryChange(category)
                }
              >
                {category}
              </button>

            ))}

          </div>

          {/* ================= CLASS CARDS ================= */}

          <div
            className="classes-grid"
            key={activeCategory}
          >

            {filteredClasses.map((item, index) => (

              <article
                className="class-card"
                key={item.id}
                data-aos="fade-up"
                data-aos-duration="750"
                data-aos-delay={(index % 3) * 100}
              >

                {/* IMAGE */}

                <Link
                  to={`/classes/${item.id}`}
                  state={{ classData: item }}
                  className="class-card-image"
                  aria-label={`View ${item.title} details`}
                >

                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                  />

                  <div className="class-card-image-overlay" />

                  <span className="class-card-number">
                    {item.number}
                  </span>

                  <span className="class-card-category">
                    {item.category}
                  </span>

                  <div className="class-card-icon">
                    {getClassIcon(item.category)}
                  </div>

                </Link>

                {/* CARD CONTENT */}

                <div className="class-card-content">

                  <div className="class-card-meta">

                    <span>
                      <FiClock />
                      {item.duration}
                    </span>

                    <span>
                      <FiActivity />
                      {item.level}
                    </span>

                  </div>

                  {/* TITLE */}

                  <Link
                    to={`/classes/${item.id}`}
                    state={{ classData: item }}
                    className="class-card-title-link"
                  >
                    <h3>{item.title}</h3>
                  </Link>

                  {/* DESCRIPTION */}

                  <p className="class-card-description">
                    {item.description}
                  </p>

                  {/* TRAINER + SCHEDULE */}

                  <div className="class-card-info">

                    <div>
                      <span>TRAINER</span>
                      <strong>{item.trainer}</strong>
                    </div>

                    <div>
                      <span>DAYS</span>
                      <strong>{item.schedule}</strong>
                    </div>

                  </div>

                  {/* CLASS TIME */}

                  <div className="class-card-time">

                    <FiClock />

                    <div>
                      <span>CLASS TIME</span>
                      <strong>{item.time}</strong>
                    </div>

                  </div>

                  {/* JOIN BUTTON */}

                  <Link
                    to="/join"
                    state={{
                      classBooking: {
                        id: item.id,
                        title: item.title,
                        category: item.category,
                        trainer: item.trainer,
                        schedule: item.schedule,
                        time: item.time,
                        duration: item.duration,
                        level: item.level,
                        image: item.image,
                      },
                    }}
                    className="class-card-button"
                  >
                    JOIN THIS CLASS
                    <FiArrowUpRight />
                  </Link>

                </div>

              </article>

            ))}

          </div>

        </div>

      </section>

      {/* =====================================================
          THREE STEPS SECTION
      ===================================================== */}

      <section className="classes-process">

        <div className="classes-container">

          <div
            className="classes-process-heading"
            data-aos="fade-up"
          >

            <div className="classes-section-label">
              <span>02</span>
              START TRAINING
            </div>

            <h2>
              THREE STEPS.
              <br />
              <strong>ONE STRONGER YOU.</strong>
            </h2>

          </div>

          <div className="classes-process-grid">

            {/* STEP 1 */}

            <article
              className="classes-process-card"
              data-aos="fade-up"
              data-aos-duration="750"
              data-aos-delay="100"
            >

              <span className="process-number">
                01
              </span>

              <div className="process-icon">
                <FiTarget />
              </div>

              <h3>Choose Your Goal</h3>

              <p>
                Decide whether you want to
                build strength, lose weight,
                improve stamina or increase
                flexibility.
              </p>

            </article>

            {/* STEP 2 */}

            <article
              className="classes-process-card"
              data-aos="fade-up"
              data-aos-duration="750"
              data-aos-delay="200"
            >

              <span className="process-number">
                02
              </span>

              <div className="process-icon">
                <FiCalendar />
              </div>

              <h3>Pick Your Class</h3>

              <p>
                Select a class that fits your
                goal, experience level and
                weekly schedule.
              </p>

            </article>

            {/* STEP 3 */}

            <article
              className="classes-process-card"
              data-aos="fade-up"
              data-aos-duration="750"
              data-aos-delay="300"
            >

              <span className="process-number">
                03
              </span>

              <div className="process-icon">
                <FiZap />
              </div>

              <h3>Start Training</h3>

              <p>
                Train with expert coaches,
                stay consistent and keep
                moving toward better results.
              </p>

            </article>

          </div>

        </div>

      </section>

      {/* =====================================================
          EXPERIENCE SECTION
      ===================================================== */}

      <section className="classes-experience">

        <div className="classes-container classes-experience-grid">

          {/* IMAGE */}

          <div
            className="classes-experience-visual"
            data-aos="fade-right"
            data-aos-duration="900"
          >

            <div className="classes-experience-image">

              <img
                src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1400&q=90"
                alt="FitZone training"
                loading="lazy"
              />

            </div>

            <div className="classes-experience-badge">

              <FaDumbbell />

              <div>
                <span>FITZONE</span>
                <strong>TRAIN STRONG</strong>
              </div>

            </div>

          </div>

          {/* CONTENT */}

          <div
            className="classes-experience-content"
            data-aos="fade-left"
            data-aos-duration="900"
            data-aos-delay="150"
          >

            <div className="classes-section-label">
              <span>03</span>
              EVERY SESSION
            </div>

            <h2>
              MORE THAN
              <br />
              JUST A <strong>WORKOUT.</strong>
            </h2>

            <p>
              Every FitZone class combines
              structure, coaching and
              motivation so you can train
              smarter and make consistent
              progress.
            </p>

            <div className="classes-benefits">

              <div>
                <span><FiCheck /></span>
                Professional Coaching
              </div>

              <div>
                <span><FiCheck /></span>
                Structured Workouts
              </div>

              <div>
                <span><FiCheck /></span>
                Modern Equipment
              </div>

              <div>
                <span><FiCheck /></span>
                Supportive Community
              </div>

              <div>
                <span><FiCheck /></span>
                Multiple Fitness Levels
              </div>

              <div>
                <span><FiCheck /></span>
                Progress Focused
              </div>

            </div>

            <Link
              to="/join"
              className="classes-primary-btn"
            >
              START TRAINING
              <FiArrowRight />
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
};

export default Classes;
