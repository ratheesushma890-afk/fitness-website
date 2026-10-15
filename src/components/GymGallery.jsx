import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiActivity,
  FiArrowUpRight,
  FiChevronLeft,
  FiChevronRight,
  FiClock,
  FiImage,
  FiTrendingUp,
  FiUsers,
  FiX,
} from "react-icons/fi";

import "./GymGallery.css";

const GymGallery = () => {
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedIndex, setSelectedIndex] = useState(null);

  /* =========================================================
     CATEGORIES
  ========================================================= */

  const categories = [
    "All",
    "Gym Interior",
    "Workouts",
    "Classes",
    "Members",
    "Trainers",
  ];

  /* =========================================================
     GALLERY DATA
  ========================================================= */

  const gallery = [
    {
      id: 1,
      title: "Strength Training",
      category: "Workouts",

      image:
        "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1400&q=90",

      description:
        "Build strength, improve endurance and push your limits with modern equipment and expert guidance.",

      duration: "45 - 60 Minutes",
      level: "Intermediate",
      suitable: "Men & Women",
      focus: "Strength & Muscle",

      joinable: true,
    },

    {
      id: 2,
      title: "Battle Rope Training",
      category: "Workouts",

      image:
        "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=1400&q=90",

      description:
        "A powerful full-body workout designed to improve stamina, strength and cardiovascular fitness.",

      duration: "30 - 45 Minutes",
      level: "Intermediate",
      suitable: "Men & Women",
      focus: "Cardio & Strength",

      joinable: true,
    },

    {
      id: 3,
      title: "Modern Gym Floor",
      category: "Gym Interior",

      image:
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1400&q=90",

      description:
        "Train in a premium fitness environment with modern machines, free weights and spacious workout zones.",

      duration: "Open Daily",
      level: "All Levels",
      suitable: "All Members",
      focus: "Complete Fitness",

      joinable: false,
    },

    {
      id: 4,
      title: "Yoga & Flexibility",
      category: "Classes",

      image:
        "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&w=1400&q=90",

      description:
        "Improve flexibility, balance, mobility and recovery with guided yoga and stretching sessions.",

      duration: "40 - 50 Minutes",
      level: "All Levels",
      suitable: "Men & Women",
      focus: "Flexibility & Balance",

      joinable: true,
    },

    {
      id: 5,
      title: "Cardio Zone",
      category: "Gym Interior",

      image:
        "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1400&q=90",

      description:
        "Train in our dedicated cardio zone with modern equipment for endurance, stamina and heart health.",

      duration: "Flexible",
      level: "All Levels",
      suitable: "All Members",
      focus: "Cardio Fitness",

      joinable: false,
    },

    {
      id: 6,
      title: "Weight Training",
      category: "Members",

      image:
        "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1400&q=90",

      description:
        "Focused resistance training designed to build strength, muscle control and overall physical performance.",

      duration: "45 - 60 Minutes",
      level: "Intermediate",
      suitable: "Men & Women",
      focus: "Muscle Building",

      joinable: false,
    },

    {
      id: 7,
      title: "Personal Training",
      category: "Trainers",

      image:
        "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1400&q=90",

      description:
        "Train one-on-one with experienced coaches and follow a workout plan designed around your personal goals.",

      duration: "60 Minutes",
      level: "All Levels",
      suitable: "All Members",
      focus: "Personal Goals",

      joinable: true,
    },

    {
      id: 8,
      title: "Functional Training",
      category: "Classes",

      image:
        "https://images.unsplash.com/photo-1590487988256-9ed24133863e?auto=format&fit=crop&w=1400&q=90",

      description:
        "Improve strength, balance, coordination and athletic performance through functional movement training.",

      duration: "45 Minutes",
      level: "Intermediate",
      suitable: "Men & Women",
      focus: "Functional Fitness",

      joinable: true,
    },

    {
      id: 9,
      title: "Fitness Community",
      category: "Members",

      image:
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1400&q=90",

      description:
        "Train with a motivating community that helps you stay consistent, focused and excited about fitness.",

      duration: "Daily",
      level: "All Levels",
      suitable: "Everyone",
      focus: "Community Fitness",

      joinable: false,
    },
  ];

  /* =========================================================
     FILTER DATA
  ========================================================= */

  const filteredGallery = useMemo(() => {
    if (activeCategory === "All") {
      return gallery;
    }

    return gallery.filter(
      (item) => item.category === activeCategory
    );
  }, [activeCategory]);

  /* =========================================================
     SELECTED ITEM
  ========================================================= */

  const selectedItem =
    selectedIndex !== null
      ? filteredGallery[selectedIndex]
      : null;

  /* =========================================================
     OPEN IMAGE
  ========================================================= */

  const openGallery = (index) => {
    setSelectedIndex(index);
  };

  /* =========================================================
     CLOSE IMAGE
  ========================================================= */

  const closeGallery = () => {
    setSelectedIndex(null);
  };

  /* =========================================================
     NEXT IMAGE
  ========================================================= */

  const nextImage = () => {
    setSelectedIndex((current) => {
      if (current === null) {
        return 0;
      }

      if (current === filteredGallery.length - 1) {
        return 0;
      }

      return current + 1;
    });
  };

  /* =========================================================
     PREVIOUS IMAGE
  ========================================================= */

  const previousImage = () => {
    setSelectedIndex((current) => {
      if (current === null) {
        return 0;
      }

      if (current === 0) {
        return filteredGallery.length - 1;
      }

      return current - 1;
    });
  };

  /* =========================================================
     CHANGE CATEGORY
  ========================================================= */

  const handleCategory = (category) => {
    setActiveCategory(category);

    setSelectedIndex(null);
  };

  /* =========================================================
     KEYBOARD + BODY SCROLL
  ========================================================= */

  useEffect(() => {
    if (selectedIndex === null) {
      document.body.style.overflow = "";

      return;
    }

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      /* ESC CLOSE */

      if (event.key === "Escape") {
        setSelectedIndex(null);
      }

      /* NEXT */

      if (event.key === "ArrowRight") {
        setSelectedIndex((current) => {
          if (current === null) {
            return 0;
          }

          return current ===
            filteredGallery.length - 1
            ? 0
            : current + 1;
        });
      }

      /* PREVIOUS */

      if (event.key === "ArrowLeft") {
        setSelectedIndex((current) => {
          if (current === null) {
            return 0;
          }

          return current === 0
            ? filteredGallery.length - 1
            : current - 1;
        });
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );

      document.body.style.overflow = "";
    };
  }, [
    selectedIndex,
    filteredGallery.length,
  ]);

  /* =========================================================
     JOIN SELECTED WORKOUT / CLASS
  ========================================================= */

  const handleJoin = () => {
    if (!selectedItem) {
      return;
    }

    /*
      Selected workout/class ko object me save kar rahe hain.

      Isko Join.jsx, Payment.jsx aur MembershipSuccess.jsx
      me use kar sakte ho.
    */

    const selectedClass = {
      id: selectedItem.id,

      title: selectedItem.title,

      description:
        selectedItem.description,

      category:
        selectedItem.category,

      image:
        selectedItem.image,

      duration:
        selectedItem.duration,

      level:
        selectedItem.level,

      suitable:
        selectedItem.suitable,

      focus:
        selectedItem.focus,
    };

    /* LOCAL STORAGE */

    localStorage.setItem(
      "fitzoneSelectedClass",
      JSON.stringify(selectedClass)
    );

    /* CLOSE POPUP */

    setSelectedIndex(null);

    /* JOIN PAGE */

    navigate("/join", {
      state: {
        selectedClass,
      },
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =========================================================
     EXPLORE CLASSES
  ========================================================= */

  const handleExploreClasses = () => {
    setSelectedIndex(null);

    navigate("/classes");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section
      className="gym-gallery"
      id="gallery"
    >
      {/* =====================================================
          BACKGROUND TEXT
      ====================================================== */}

      <div
        className="gym-gallery-bg"
        aria-hidden="true"
      >
        GALLERY
      </div>

      <div className="gym-gallery-container">

        {/* ===================================================
            HEADING
        ==================================================== */}

        <div className="gym-gallery-heading">

          <div className="gym-gallery-small-title">

            <span></span>

            OUR GALLERY

            <span></span>

          </div>

          <h2>
            Life At
            <span> FITZONE</span>
          </h2>

          <p>
            Real people. Real workouts. Real results.
            Take a look inside our gym and feel the
            FITZONE vibe.
          </p>

        </div>

        
        {/* ===================================================
            GALLERY GRID
        ==================================================== */}

        <div className="gym-gallery-grid">

          {filteredGallery.map(
            (item, index) => (
              <article
                key={item.id}
                className="gym-gallery-item"

                role="button"

                tabIndex={0}

                aria-label={`Open ${item.title}`}

                onClick={() =>
                  openGallery(index)
                }

                onKeyDown={(event) => {
                  if (
                    event.key === "Enter" ||
                    event.key === " "
                  ) {
                    event.preventDefault();

                    openGallery(index);
                  }
                }}
              >

                {/* IMAGE */}

                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                />

                {/* IMAGE OVERLAY */}

                <div className="gym-gallery-overlay">

                  <div className="gym-gallery-overlay-text">

                    <span>
                      {item.category}
                    </span>

                    <h3>
                      {item.title}
                    </h3>

                  </div>

                  <div className="gym-gallery-view">
                    <FiImage />
                  </div>

                </div>

              </article>
            )
          )}

        </div>

      </div>

      {/* =====================================================
          POPUP / LIGHTBOX
      ====================================================== */}

      {selectedItem && (
        <div
          className="gym-gallery-modal"
          onClick={closeGallery}
        >

          {/* =================================================
              MODAL BOX
          ================================================== */}

          <div
            className="gym-gallery-modal-box"

            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* =================================================
                LEFT SIDE
            ================================================== */}

            <div className="gallery-modal-left">

              {/* IMAGE COUNTER */}

              <div className="gallery-counter">

                {selectedIndex + 1}

                {" / "}

                {filteredGallery.length}

              </div>

              {/* =================================================
                  BIG IMAGE
              ================================================== */}

              <div className="gallery-main-image-wrap">

                <img
                  className="gallery-main-image"

                  src={selectedItem.image}

                  alt={selectedItem.title}
                />

                {/* PREVIOUS */}

                <button
                  type="button"

                  className="gallery-slide-btn gallery-prev"

                  onClick={previousImage}

                  aria-label="Previous image"
                >
                  <FiChevronLeft />
                </button>

                {/* NEXT */}

                <button
                  type="button"

                  className="gallery-slide-btn gallery-next"

                  onClick={nextImage}

                  aria-label="Next image"
                >
                  <FiChevronRight />
                </button>

              </div>

              {/* =================================================
                  SMALL THUMBNAILS
              ================================================== */}

              <div className="gallery-thumbnails">

                {filteredGallery.map(
                  (item, index) => (
                    <button
                      type="button"

                      key={item.id}

                      className={
                        selectedIndex === index
                          ? "gallery-thumb active"
                          : "gallery-thumb"
                      }

                      onClick={() =>
                        setSelectedIndex(index)
                      }

                      aria-label={`View ${item.title}`}
                    >

                      <img
                        src={item.image}

                        alt={item.title}
                      />

                    </button>
                  )
                )}

              </div>

            </div>

            {/* =================================================
                RIGHT DETAILS
            ================================================== */}

            <div className="gallery-modal-details">

              {/* CLOSE */}

              <button
                type="button"

                className="gallery-modal-close"

                onClick={closeGallery}

                aria-label="Close gallery"
              >
                <FiX />
              </button>

              {/* CATEGORY */}

              <span className="gallery-detail-category">
                {selectedItem.category}
              </span>

              {/* TITLE */}

              <h3>
                {selectedItem.title}
              </h3>

              <div className="gallery-title-line"></div>

              {/* DESCRIPTION */}

              <p className="gallery-description">
                {selectedItem.description}
              </p>

              {/* =================================================
                  DETAILS
              ================================================== */}

              <div className="gallery-detail-list">

                {/* DURATION */}

                <div className="gallery-detail-row">

                  <div className="gallery-detail-icon">
                    <FiClock />
                  </div>

                  <div>

                    <span>
                      Duration
                    </span>

                    <strong>
                      {selectedItem.duration}
                    </strong>

                  </div>

                </div>

                {/* DIFFICULTY */}

                <div className="gallery-detail-row">

                  <div className="gallery-detail-icon">
                    <FiTrendingUp />
                  </div>

                  <div>

                    <span>
                      Difficulty Level
                    </span>

                    <strong>
                      {selectedItem.level}
                    </strong>

                  </div>

                </div>

                {/* SUITABLE */}

                <div className="gallery-detail-row">

                  <div className="gallery-detail-icon">
                    <FiUsers />
                  </div>

                  <div>

                    <span>
                      Suitable For
                    </span>

                    <strong>
                      {selectedItem.suitable}
                    </strong>

                  </div>

                </div>

                {/* FOCUS */}

                <div className="gallery-detail-row">

                  <div className="gallery-detail-icon">
                    <FiActivity />
                  </div>

                  <div>

                    <span>
                      Workout Focus
                    </span>

                    <strong>
                      {selectedItem.focus}
                    </strong>

                  </div>

                </div>

              </div>

              {/* =================================================
                  SMART BUTTON

                  Workout / Class / Trainer
                  = JOIN NOW

                  Gym Interior / Members
                  = EXPLORE CLASSES
              ================================================== */}

              {selectedItem.joinable ? (

                <button
                  type="button"

                  className="gallery-join-btn"

                  onClick={handleJoin}
                >
                  Join {selectedItem.title}

                  <FiArrowUpRight />
                </button>

              ) : (

                <button
                  type="button"

                  className="gallery-join-btn"

                  onClick={handleExploreClasses}
                >
                  Explore Classes

                  <FiArrowUpRight />
                </button>

              )}

            </div>

          </div>

        </div>
      )}

    </section>
  );
};

export default GymGallery;