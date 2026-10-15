import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  FiActivity,
  FiArrowLeft,
  FiArrowRight,
  FiCalendar,
  FiCheck,
  FiCheckCircle,
  FiChevronDown,
  FiClock,
  FiCreditCard,
  FiMail,
  FiPhone,
  FiShield,
  FiTarget,
  FiUser,
  FiUsers,
} from "react-icons/fi";

import {
  FaCrown,
  FaDumbbell,
  FaGem,
} from "react-icons/fa";

import "./Join.css";


/* =========================================================
   MEMBERSHIP PLANS
========================================================= */

const PLANS = {
  basic: {
    id: "basic",
    tag: "STARTER",
    name: "Basic",
    price: 999,
    icon: FaDumbbell,

    description:
      "Everything you need to start your fitness journey.",

    features: [
      "Full Gym Access",
      "Modern Equipment",
      "Locker Facility",
      "Fitness Assessment",
      "General Workout Plan",
    ],
  },

  pro: {
    id: "pro",
    tag: "MOST POPULAR",
    name: "Pro",
    price: 1499,
    icon: FaCrown,
    popular: true,

    description:
      "More support, more classes and better progress.",

    features: [
      "Everything in Basic",
      "All Fitness Classes",
      "Personalized Workout Plan",
      "Basic Diet Guidance",
      "Progress Tracking",
    ],
  },

  elite: {
    id: "elite",
    tag: "MAXIMUM RESULTS",
    name: "Elite",
    price: 2499,
    icon: FaGem,

    description:
      "Personal coaching designed for maximum results.",

    features: [
      "Everything in Pro",
      "Personal Trainer Sessions",
      "Custom Diet Plan",
      "Advanced Body Analysis",
      "Priority Support",
    ],
  },
};


/* =========================================================
   DURATION OPTIONS
========================================================= */

const DURATIONS = [
  {
    id: "1",
    label: "1 Month",
    months: 1,
    discount: 0,
  },

  {
    id: "3",
    label: "3 Months",
    months: 3,
    discount: 0,
  },

  {
    id: "6",
    label: "6 Months",
    months: 6,
    discount: 5,
  },

  {
    id: "12",
    label: "12 Months",
    months: 12,
    discount: 10,
  },
];


/* =========================================================
   FITNESS GOALS
========================================================= */

const FITNESS_GOALS = [
  "Weight Loss",
  "Muscle Gain",
  "Strength Training",
  "General Fitness",
  "Body Transformation",
  "Improve Stamina",
  "Flexibility",
  "Sports Performance",
];


/* =========================================================
   FORMAT PRICE
========================================================= */

const formatPrice = (price) => {
  return `₹${Number(
    price || 0
  ).toLocaleString("en-IN")}`;
};


/* =========================================================
   TOMORROW DATE
========================================================= */

const getTomorrow = () => {
  const date = new Date();

  date.setDate(
    date.getDate() + 1
  );

  const year =
    date.getFullYear();

  const month = String(
    date.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    date.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
};


/* =========================================================
   DISPLAY DATE
========================================================= */

const formatDisplayDate = (value) => {
  if (!value) {
    return "DD / MM / YYYY";
  }

  const date =
    new Date(
      `${value}T00:00:00`
    );

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "DD / MM / YYYY";
  }

  return date.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
};


/* =========================================================
   SELECTED WORKOUT INFORMATION

   Classes page + Gallery page dono ke liye
========================================================= */

const getWorkoutInfo = (
  selectedClass
) => {
  if (!selectedClass) {
    return null;
  }

  const title = String(
    selectedClass.title ||
      selectedClass.name ||
      ""
  ).toLowerCase();

  const category = String(
    selectedClass.category ||
      ""
  ).toLowerCase();

  /* CARDIO */

  if (
    title.includes("cardio") ||
    category.includes("cardio")
  ) {
    return {
      type: "CARDIO FITNESS",

      purpose:
        "Stamina • Fat Burn • Heart Health",

      text:
        selectedClass.description ||
        "Improve stamina, burn calories and build better cardiovascular fitness.",
    };
  }

  /* HIIT */

  if (
    title.includes("hiit")
  ) {
    return {
      type: "HIIT TRAINING",

      purpose:
        "Fat Burn • Stamina • Full Body",

      text:
        selectedClass.description ||
        "High intensity training designed to burn calories and improve full-body endurance.",
    };
  }

  /* YOGA */

  if (
    title.includes("yoga") ||
    category.includes("yoga")
  ) {
    return {
      type: "YOGA & MOBILITY",

      purpose:
        "Flexibility • Balance • Recovery",

      text:
        selectedClass.description ||
        "Improve flexibility, mobility, balance and overall body recovery.",
    };
  }

  /* STRENGTH */

  if (
    title.includes("strength") ||
    title.includes("weight") ||
    category.includes("strength")
  ) {
    return {
      type: "STRENGTH TRAINING",

      purpose:
        "Strength • Muscle • Power",

      text:
        selectedClass.description ||
        "Build muscle, increase strength and improve overall physical performance.",
    };
  }

  /* BATTLE ROPE */

  if (
    title.includes("battle") ||
    title.includes("rope")
  ) {
    return {
      type: "FULL BODY WORKOUT",

      purpose:
        "Cardio • Strength • Endurance",

      text:
        selectedClass.description ||
        "A high-energy full-body workout for stamina, strength and conditioning.",
    };
  }

  /* FUNCTIONAL */

  if (
    title.includes("functional")
  ) {
    return {
      type: "FUNCTIONAL FITNESS",

      purpose:
        "Mobility • Strength • Balance",

      text:
        selectedClass.description ||
        "Improve everyday movement, coordination, balance and functional strength.",
    };
  }

  /* ZUMBA */

  if (
    title.includes("zumba") ||
    title.includes("dance")
  ) {
    return {
      type: "DANCE FITNESS",

      purpose:
        "Cardio • Fat Burn • Energy",

      text:
        selectedClass.description ||
        "Enjoy an energetic dance workout designed to burn calories and improve stamina.",
    };
  }

  /* CROSSFIT */

  if (
    title.includes("crossfit") ||
    title.includes("cross fit")
  ) {
    return {
      type: "CROSSFIT",

      purpose:
        "Power • Strength • Conditioning",

      text:
        selectedClass.description ||
        "Build strength, power and endurance through challenging functional workouts.",
    };
  }

  /* BOXING */

  if (
    title.includes("boxing") ||
    title.includes("kickbox")
  ) {
    return {
      type: "BOXING FITNESS",

      purpose:
        "Cardio • Power • Coordination",

      text:
        selectedClass.description ||
        "Improve fitness, coordination and power through energetic boxing-based training.",
    };
  }

  /* PERSONAL TRAINING */

  if (
    title.includes("personal")
  ) {
    return {
      type: "PERSONAL TRAINING",

      purpose:
        "Personal Goals • Coaching • Progress",

      text:
        selectedClass.description ||
        "One-to-one guidance with training designed around your personal fitness goals.",
    };
  }

  /* DEFAULT */

  return {
    type:
      selectedClass.category
        ? String(
            selectedClass.category
          ).toUpperCase()
        : "FITNESS TRAINING",

    purpose:
      selectedClass.focus ||
      "Fitness • Strength • Healthy Lifestyle",

    text:
      selectedClass.description ||
      "A FITZONE workout designed to help you improve your fitness and reach your goals.",
  };
};


/* =========================================================
   JOIN COMPONENT
========================================================= */

const Join = () => {
  const navigate =
    useNavigate();

  const location =
    useLocation();

  const dateInputRef =
    useRef(null);


  /* =======================================================
     PLAN / DURATION
  ======================================================= */

  const [
    selectedPlan,
    setSelectedPlan,
  ] = useState("pro");

  const [
    selectedDuration,
    setSelectedDuration,
  ] = useState("1");


  /* =======================================================
     MEMBER FORM
  ======================================================= */

  const [
    formData,
    setFormData,
  ] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    city: "",
    startDate: "",
    goal: "",
  });

  const [
    errors,
    setErrors,
  ] = useState({});

  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false);


  /* =======================================================
     SELECTED CLASS / WORKOUT
  ======================================================= */

  const [
    selectedClass,
    setSelectedClass,
  ] = useState(null);


  /* =======================================================
     LOAD PLAN FROM MEMBERSHIP PAGE
  ======================================================= */

  useEffect(() => {
    const planFromState =
      location.state?.plan;

    if (!planFromState) {
      return;
    }

    const normalizedPlan =
      String(
        planFromState
      ).toLowerCase();

    if (
      PLANS[normalizedPlan]
    ) {
      setSelectedPlan(
        normalizedPlan
      );
    }
  }, [location.state]);


  /* =======================================================
     LOAD SELECTED CLASS

     Works with:
     1. Classes page
     2. Class Detail page
     3. Gym Gallery
     4. localStorage
  ======================================================= */

  useEffect(() => {
    const classFromState =
      location.state
        ?.selectedClass ||
      location.state
        ?.classData ||
      location.state
        ?.workout ||
      null;

    if (classFromState) {
      setSelectedClass(
        classFromState
      );

      try {
        localStorage.setItem(
          "fitzoneSelectedClass",
          JSON.stringify(
            classFromState
          )
        );
      } catch (error) {
        console.error(
          "Unable to save selected class:",
          error
        );
      }

      return;
    }

    try {
      const savedClass =
        localStorage.getItem(
          "fitzoneSelectedClass"
        );

      if (savedClass) {
        setSelectedClass(
          JSON.parse(
            savedClass
          )
        );
      }
    } catch (error) {
      console.error(
        "Unable to load selected class:",
        error
      );
    }
  }, [location.state]);


  /* =======================================================
     WORKOUT INFORMATION
  ======================================================= */

  const workoutInfo =
    useMemo(() => {
      return getWorkoutInfo(
        selectedClass
      );
    }, [selectedClass]);


  /* =======================================================
     CURRENT PLAN
  ======================================================= */

  const currentPlan =
    useMemo(() => {
      return (
        PLANS[
          selectedPlan
        ] || PLANS.pro
      );
    }, [selectedPlan]);


  /* =======================================================
     CURRENT DURATION
  ======================================================= */

  const currentDuration =
    useMemo(() => {
      return (
        DURATIONS.find(
          (item) =>
            item.id ===
            selectedDuration
        ) ||
        DURATIONS[0]
      );
    }, [selectedDuration]);


  /* =======================================================
     PRICE DETAILS
  ======================================================= */

  const priceDetails =
    useMemo(() => {
      const subtotal =
        currentPlan.price *
        currentDuration.months;

      const discountAmount =
        Math.round(
          subtotal *
            (
              currentDuration.discount /
              100
            )
        );

      const total =
        subtotal -
        discountAmount;

      return {
        subtotal,
        discountAmount,
        total,
      };
    }, [
      currentPlan,
      currentDuration,
    ]);


  /* =======================================================
     INPUT CHANGE
  ======================================================= */

  const handleChange = (
    e
  ) => {
    const {
      name,
      value,
    } = e.target;

    let nextValue =
      value;

    if (
      name === "phone"
    ) {
      nextValue =
        value
          .replace(
            /\D/g,
            ""
          )
          .slice(
            0,
            10
          );
    }

    if (
      name === "age"
    ) {
      nextValue =
        value
          .replace(
            /\D/g,
            ""
          )
          .slice(
            0,
            2
          );
    }

    setFormData(
      (prev) => ({
        ...prev,

        [name]:
          nextValue,
      })
    );

    if (
      errors[name]
    ) {
      setErrors(
        (prev) => ({
          ...prev,

          [name]:
            "",
        })
      );
    }
  };


  /* =======================================================
     OPEN DATE PICKER
  ======================================================= */

  const openDatePicker =
    () => {
      const input =
        dateInputRef.current;

      if (!input) {
        return;
      }

      try {
        if (
          typeof input.showPicker ===
          "function"
        ) {
          input.showPicker();
        } else {
          input.focus();
          input.click();
        }
      } catch {
        input.focus();
        input.click();
      }
    };


  /* =======================================================
     VALIDATION
  ======================================================= */

  const validateForm =
    () => {
      const newErrors =
        {};

      const cleanName =
        formData.name.trim();

      const cleanEmail =
        formData.email.trim();

      const cleanCity =
        formData.city.trim();

      const nameRegex =
        /^[a-zA-Z\s.'-]{2,50}$/;

      const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      const phoneRegex =
        /^[6-9]\d{9}$/;


      /* NAME */

      if (!cleanName) {
        newErrors.name =
          "Please enter your full name.";
      } else if (
        !nameRegex.test(
          cleanName
        )
      ) {
        newErrors.name =
          "Please enter a valid name.";
      }


      /* EMAIL */

      if (!cleanEmail) {
        newErrors.email =
          "Please enter your email address.";
      } else if (
        !emailRegex.test(
          cleanEmail
        )
      ) {
        newErrors.email =
          "Please enter a valid email address.";
      }


      /* PHONE */

      if (
        !formData.phone
      ) {
        newErrors.phone =
          "Please enter your phone number.";
      } else if (
        !phoneRegex.test(
          formData.phone
        )
      ) {
        newErrors.phone =
          "Enter a valid 10-digit Indian mobile number.";
      }


      /* AGE */

      const age =
        Number(
          formData.age
        );

      if (
        !formData.age
      ) {
        newErrors.age =
          "Please enter your age.";
      } else if (
        Number.isNaN(
          age
        ) ||
        age < 16 ||
        age > 80
      ) {
        newErrors.age =
          "Age must be between 16 and 80.";
      }


      /* CITY */

      if (!cleanCity) {
        newErrors.city =
          "Please enter your city.";
      }


      /* START DATE */

      if (
        !formData.startDate
      ) {
        newErrors.startDate =
          "Please select your start date.";
      } else {
        const selected =
          new Date(
            `${formData.startDate}T00:00:00`
          );

        const minimum =
          new Date(
            `${getTomorrow()}T00:00:00`
          );

        if (
          selected <
          minimum
        ) {
          newErrors.startDate =
            "Membership must start from tomorrow or later.";
        }
      }


      /* GOAL */

      if (
        !formData.goal
      ) {
        newErrors.goal =
          "Please select your fitness goal.";
      }

      setErrors(
        newErrors
      );

      return (
        Object.keys(
          newErrors
        ).length === 0
      );
    };


  /* =======================================================
     COMPLETE MEMBERSHIP → PAYMENT
  ======================================================= */

  const handleSubmit = (
    e
  ) => {
    e.preventDefault();

    if (
      !validateForm()
    ) {
      setTimeout(
        () => {
          document
            .querySelector(
              ".join-field-error"
            )
            ?.scrollIntoView({
              behavior:
                "smooth",

              block:
                "center",
            });
        },
        50
      );

      return;
    }

    setIsSubmitting(
      true
    );

    /* ===============================================
       SAVE COMPLETE SELECTED CLASS
    =============================================== */

    const finalSelectedClass =
      selectedClass
        ? {
            id:
              selectedClass.id ||
              "",

            title:
              selectedClass.title ||
              selectedClass.name ||
              "",

            name:
              selectedClass.name ||
              selectedClass.title ||
              "",

            category:
              selectedClass.category ||
              "",

            description:
              selectedClass.description ||
              workoutInfo?.text ||
              "",

            trainer:
              selectedClass.trainer ||
              "FITZONE Trainer",

            schedule:
              selectedClass.schedule ||
              selectedClass.days ||
              "",

            days:
              selectedClass.days ||
              selectedClass.schedule ||
              "",

            time:
              selectedClass.time ||
              "",

            duration:
              selectedClass.duration ||
              "",

            level:
              selectedClass.level ||
              "",

            suitable:
              selectedClass.suitable ||
              "",

            focus:
              selectedClass.focus ||
              workoutInfo?.purpose ||
              "",

            workoutType:
              workoutInfo?.type ||
              "FITNESS TRAINING",

            purpose:
              workoutInfo?.purpose ||
              "",

            image:
              selectedClass.image ||
              "",
          }
        : null;


    /* ===============================================
       MEMBERSHIP DATA
    =============================================== */

    const membershipData =
      {
        id:
          "FIT-" +
          Date.now()
            .toString()
            .slice(-8),

        name:
          formData.name.trim(),

        email:
          formData.email
            .trim()
            .toLowerCase(),

        phone:
          formData.phone,

        age:
          formData.age,

        city:
          formData.city.trim(),

        goal:
          formData.goal,

        startDate:
          formData.startDate,

        displayStartDate:
          formatDisplayDate(
            formData.startDate
          ),

        plan:
          currentPlan.name,

        planId:
          currentPlan.id,

        monthlyPrice:
          currentPlan.price,

        duration:
          currentDuration.label,

        months:
          currentDuration.months,

        discount:
          currentDuration.discount,

        subtotal:
          priceDetails.subtotal,

        discountAmount:
          priceDetails.discountAmount,

        total:
          priceDetails.total,

        status:
          "Pending Payment",

        paymentStatus:
          "Pending",

        createdAt:
          new Date().toISOString(),

        selectedClass:
          finalSelectedClass,
      };

    setTimeout(
      () => {
        try {
          localStorage.setItem(
            "fitzoneMembership",
            JSON.stringify(
              membershipData
            )
          );

          if (
            finalSelectedClass
          ) {
            localStorage.setItem(
              "fitzoneSelectedClass",
              JSON.stringify(
                finalSelectedClass
              )
            );
          }
        } catch (
          error
        ) {
          console.error(
            "Unable to save membership:",
            error
          );
        }

        setIsSubmitting(
          false
        );

        navigate(
          "/payment",
          {
            state: {
              membership:
                membershipData,
            },
          }
        );
      },
      650
    );
  };


  /* =========================================================
     JSX
  ========================================================= */

  return (
    <main className="join-page">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="join-hero">

        <div className="join-hero-overlay" />

        <div className="join-hero-container">

          <button
            type="button"
            className="join-back"
            onClick={() =>
              navigate(-1)
            }
          >
            <FiArrowLeft />
            Back
          </button>


          <div className="join-hero-content">

            <div className="join-eyebrow">
              <span />
              MEMBERSHIP
            </div>

            <h1>
              Choose Your
              <br />

              <strong>
                Membership Plan
              </strong>
            </h1>

            <p>
              Choose a plan based on your
              training needs. Select your
              duration, complete your details
              and start your fitness journey.
            </p>

            <div className="join-hero-points">

              <div>
                <span>
                  <FaDumbbell />
                </span>

                World Class Facilities
              </div>

              <div>
                <span>
                  <FiUsers />
                </span>

                Expert Trainers
              </div>

              <div>
                <span>
                  <FiCheckCircle />
                </span>

                Flexible Plans
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <section className="join-main">

        <div className="join-container">

          {/* =================================================
              LEFT
          ================================================== */}

          <div className="join-left">

            {/* =================================================
                SELECTED CLASS FROM CLASSES/GALLERY
            ================================================== */}

            {selectedClass &&
              workoutInfo && (
                <section className="join-selected-section">

                  <div className="join-section-heading">

                    <span>
                      YOUR SELECTED TRAINING
                    </span>

                    <h2>
                      Your Workout
                      <strong>
                        {" "}Choice.
                      </strong>
                    </h2>

                    <p>
                      This is the workout or
                      class you selected before
                      joining FITZONE.
                    </p>

                  </div>


                  <div className="join-selected-workout">

                    {/* IMAGE */}

                    <div className="join-selected-workout-image">

                      {selectedClass.image ? (
                        <img
                          src={
                            selectedClass.image
                          }
                          alt={
                            selectedClass.title ||
                            selectedClass.name ||
                            "Selected workout"
                          }
                        />
                      ) : (
                        <div className="join-selected-workout-placeholder">
                          <FaDumbbell />
                        </div>
                      )}

                      <span className="join-workout-badge">
                        <FiActivity />

                        {workoutInfo.type}
                      </span>

                    </div>


                    {/* CONTENT */}

                    <div className="join-selected-workout-content">

                      <div className="join-workout-top">

                        <div>

                          <span className="join-workout-label">
                            SELECTED WORKOUT
                          </span>

                          <h3>
                            {selectedClass.title ||
                              selectedClass.name}
                          </h3>

                        </div>

                        <div className="join-workout-selected">
                          <FiCheckCircle />

                          Selected
                        </div>

                      </div>


                      <p className="join-workout-description">
                        {workoutInfo.text}
                      </p>


                      {/* BEST FOR */}

                      <div className="join-workout-purpose">

                        <span>
                          <FiTarget />
                          BEST FOR
                        </span>

                        <strong>
                          {workoutInfo.purpose}
                        </strong>

                      </div>


                      {/* META */}

                      <div className="join-workout-meta">

                        {selectedClass.duration && (
                          <div>
                            <FiClock />

                            <span>
                              Duration

                              <strong>
                                {
                                  selectedClass.duration
                                }
                              </strong>
                            </span>
                          </div>
                        )}


                        {selectedClass.level && (
                          <div>
                            <FiActivity />

                            <span>
                              Level

                              <strong>
                                {
                                  selectedClass.level
                                }
                              </strong>
                            </span>
                          </div>
                        )}


                        {selectedClass.trainer && (
                          <div>
                            <FiUser />

                            <span>
                              Trainer

                              <strong>
                                {
                                  selectedClass.trainer
                                }
                              </strong>
                            </span>
                          </div>
                        )}


                        {selectedClass.time && (
                          <div>
                            <FiClock />

                            <span>
                              Time

                              <strong>
                                {
                                  selectedClass.time
                                }
                              </strong>
                            </span>
                          </div>
                        )}


                        {selectedClass.focus && (
                          <div>
                            <FaDumbbell />

                            <span>
                              Focus

                              <strong>
                                {
                                  selectedClass.focus
                                }
                              </strong>
                            </span>
                          </div>
                        )}

                      </div>

                    </div>

                  </div>

                </section>
              )}


            {/* =================================================
                01 PLAN
            ================================================== */}

            <div className="join-section-heading">

              <span>
                01 — CHOOSE YOUR PLAN
              </span>

              <h2>
                Find Your Perfect

                <strong>
                  {" "}Membership.
                </strong>
              </h2>

              <p>
                Choose a plan based on your
                training needs. You can change
                your plan anytime before
                submitting.
              </p>

            </div>


            <div className="join-plans">

              {Object.values(
                PLANS
              ).map(
                (plan) => {
                  const Icon =
                    plan.icon;

                  const isSelected =
                    selectedPlan ===
                    plan.id;

                  return (
                    <button
                      key={
                        plan.id
                      }
                      type="button"
                      className={`join-plan-card ${
                        isSelected
                          ? "selected"
                          : ""
                      }`}
                      onClick={() =>
                        setSelectedPlan(
                          plan.id
                        )
                      }
                    >

                      {plan.popular && (
                        <div className="join-popular">
                          MOST POPULAR
                        </div>
                      )}

                      <div className="join-plan-icon">
                        <Icon />
                      </div>

                      <span className="join-plan-tag">
                        {plan.tag}
                      </span>

                      <div className="join-plan-top">

                        <div>
                          <h3>
                            {plan.name}
                          </h3>
                        </div>

                        <div className="join-plan-check">
                          {isSelected && (
                            <FiCheck />
                          )}
                        </div>

                      </div>

                      <p className="join-plan-description">
                        {
                          plan.description
                        }
                      </p>

                      <div className="join-plan-price">

                        {formatPrice(
                          plan.price
                        )}

                        <small>
                          / month
                        </small>

                      </div>

                      <ul>

                        {plan.features.map(
                          (
                            feature
                          ) => (
                            <li
                              key={
                                feature
                              }
                            >
                              <span>
                                <FiCheck />
                              </span>

                              {feature}
                            </li>
                          )
                        )}

                      </ul>

                      <div className="join-plan-select-text">

                        <span>
                          {isSelected
                            ? "SELECTED"
                            : "SELECT PLAN"}
                        </span>

                        {isSelected ? (
                          <FiCheck />
                        ) : (
                          <FiArrowRight />
                        )}

                      </div>

                    </button>
                  );
                }
              )}

            </div>


            {/* =================================================
                02 DURATION
            ================================================== */}

            <section className="join-duration-section">

              <div className="join-section-heading">

                <span>
                  02 — MEMBERSHIP DURATION
                </span>

                <h2>
                  Choose Your

                  <strong>
                    {" "}Duration.
                  </strong>
                </h2>

                <p>
                  Stay longer and save more
                  on your fitness membership.
                </p>

              </div>


              <div className="join-duration-grid">

                {DURATIONS.map(
                  (
                    duration
                  ) => {
                    const selected =
                      selectedDuration ===
                      duration.id;

                    return (
                      <button
                        key={
                          duration.id
                        }
                        type="button"
                        className={`join-duration-card ${
                          selected
                            ? "selected"
                            : ""
                        }`}
                        onClick={() =>
                          setSelectedDuration(
                            duration.id
                          )
                        }
                      >

                        {duration.discount >
                          0 && (
                          <span className="join-duration-badge">
                            SAVE{" "}
                            {
                              duration.discount
                            }
                            %
                          </span>
                        )}

                        <FiCalendar />

                        <strong>
                          {
                            duration.label
                          }
                        </strong>

                        <span>
                          {duration.discount >
                          0
                            ? `${duration.discount}% discount`
                            : "Standard price"}
                        </span>

                        <div className="join-duration-check">
                          {selected && (
                            <FiCheck />
                          )}
                        </div>

                      </button>
                    );
                  }
                )}

              </div>

            </section>


            {/* =================================================
                03 DETAILS
            ================================================== */}

            <section className="join-form-section">

              <div className="join-section-heading">

                <span>
                  03 — YOUR DETAILS
                </span>

                <h2>
                  Complete Your

                  <strong>
                    {" "}Details.
                  </strong>
                </h2>

                <p>
                  Fill in your information to
                  continue to payment and
                  activate your membership.
                </p>

              </div>


              <form
                className="join-form"
                onSubmit={
                  handleSubmit
                }
                noValidate
              >

                <div className="join-form-grid">

                  {/* NAME */}

                  <div
                    className={`join-field ${
                      errors.name
                        ? "join-field-error"
                        : ""
                    }`}
                  >

                    <label htmlFor="name">
                      Full Name
                      <span>*</span>
                    </label>

                    <div className="join-input-wrap">

                      <FiUser />

                      <input
                        id="name"
                        type="text"
                        name="name"
                        value={
                          formData.name
                        }
                        onChange={
                          handleChange
                        }
                        placeholder="Enter your full name"
                        autoComplete="name"
                      />

                    </div>

                    {errors.name && (
                      <small className="join-error-text">
                        {
                          errors.name
                        }
                      </small>
                    )}

                  </div>


                  {/* EMAIL */}

                  <div
                    className={`join-field ${
                      errors.email
                        ? "join-field-error"
                        : ""
                    }`}
                  >

                    <label htmlFor="email">
                      Email Address
                      <span>*</span>
                    </label>

                    <div className="join-input-wrap">

                      <FiMail />

                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={
                          formData.email
                        }
                        onChange={
                          handleChange
                        }
                        placeholder="you@example.com"
                        autoComplete="email"
                      />

                    </div>

                    {errors.email && (
                      <small className="join-error-text">
                        {
                          errors.email
                        }
                      </small>
                    )}

                  </div>


                  {/* PHONE */}

                  <div
                    className={`join-field ${
                      errors.phone
                        ? "join-field-error"
                        : ""
                    }`}
                  >

                    <label htmlFor="phone">
                      Phone Number
                      <span>*</span>
                    </label>

                    <div className="join-input-wrap">

                      <FiPhone />

                      <input
                        id="phone"
                        type="tel"
                        name="phone"
                        value={
                          formData.phone
                        }
                        onChange={
                          handleChange
                        }
                        placeholder="Enter 10-digit number"
                        inputMode="numeric"
                        autoComplete="tel"
                      />

                    </div>

                    {errors.phone && (
                      <small className="join-error-text">
                        {
                          errors.phone
                        }
                      </small>
                    )}

                  </div>


                  {/* AGE */}

                  <div
                    className={`join-field ${
                      errors.age
                        ? "join-field-error"
                        : ""
                    }`}
                  >

                    <label htmlFor="age">
                      Age
                      <span>*</span>
                    </label>

                    <div className="join-input-wrap">

                      <FiUser />

                      <input
                        id="age"
                        type="text"
                        name="age"
                        value={
                          formData.age
                        }
                        onChange={
                          handleChange
                        }
                        placeholder="Your age"
                        inputMode="numeric"
                      />

                    </div>

                    {errors.age && (
                      <small className="join-error-text">
                        {
                          errors.age
                        }
                      </small>
                    )}

                  </div>


                  {/* CITY */}

                  <div
                    className={`join-field ${
                      errors.city
                        ? "join-field-error"
                        : ""
                    }`}
                  >

                    <label htmlFor="city">
                      City
                      <span>*</span>
                    </label>

                    <div className="join-input-wrap">

                      <FiUsers />

                      <input
                        id="city"
                        type="text"
                        name="city"
                        value={
                          formData.city
                        }
                        onChange={
                          handleChange
                        }
                        placeholder="Enter your city"
                        autoComplete="address-level2"
                      />

                    </div>

                    {errors.city && (
                      <small className="join-error-text">
                        {
                          errors.city
                        }
                      </small>
                    )}

                  </div>


                  {/* START DATE */}

                  <div
                    className={`join-field ${
                      errors.startDate
                        ? "join-field-error"
                        : ""
                    }`}
                  >

                    <label htmlFor="startDate">
                      Start Date
                      <span>*</span>
                    </label>

                    <div
                      className="join-input-wrap join-date-wrap"
                      onClick={
                        openDatePicker
                      }
                    >

                      <FiCalendar />

                      <div className="join-date-display">

                        {formData.startDate
                          ? formatDisplayDate(
                              formData.startDate
                            )
                          : "DD / MM / YYYY"}

                      </div>

                      <input
                        ref={
                          dateInputRef
                        }
                        id="startDate"
                        type="date"
                        name="startDate"
                        value={
                          formData.startDate
                        }
                        min={
                          getTomorrow()
                        }
                        onChange={
                          handleChange
                        }
                        aria-label="Start Date"
                      />

                      <FiChevronDown className="join-date-arrow" />

                    </div>

                    {errors.startDate && (
                      <small className="join-error-text">
                        {
                          errors.startDate
                        }
                      </small>
                    )}

                  </div>

                </div>


                {/* FITNESS GOAL */}

                <div
                  className={`join-field join-goal-field ${
                    errors.goal
                      ? "join-field-error"
                      : ""
                  }`}
                >

                  <label htmlFor="goal">
                    Fitness Goal
                    <span>*</span>
                  </label>

                  <div className="join-input-wrap">

                    <FiTarget />

                    <select
                      id="goal"
                      name="goal"
                      value={
                        formData.goal
                      }
                      onChange={
                        handleChange
                      }
                    >

                      <option value="">
                        Select your fitness goal
                      </option>

                      {FITNESS_GOALS.map(
                        (
                          goal
                        ) => (
                          <option
                            key={
                              goal
                            }
                            value={
                              goal
                            }
                          >
                            {goal}
                          </option>
                        )
                      )}

                    </select>

                    <FiChevronDown className="join-select-arrow" />

                  </div>

                  {errors.goal && (
                    <small className="join-error-text">
                      {
                        errors.goal
                      }
                    </small>
                  )}

                </div>


                {/* =================================================
                    SELECTED CLASS MINI CONFIRMATION
                ================================================== */}

                {selectedClass &&
                  workoutInfo && (
                    <div className="join-form-class">

                      <div className="join-form-class-icon">
                        <FaDumbbell />
                      </div>

                      <div className="join-form-class-info">

                        <span>
                          {
                            workoutInfo.type
                          }
                        </span>

                        <strong>
                          {selectedClass.title ||
                            selectedClass.name}
                        </strong>

                        <small>
                          {
                            workoutInfo.purpose
                          }
                        </small>

                      </div>

                      <FiCheckCircle />

                    </div>
                  )}


                {/* SECURE NOTE */}

                <div className="join-form-note">

                  <FiShield />

                  <div>

                    <strong>
                      Secure membership registration
                    </strong>

                    <p>
                      Your membership will become
                      active after successful payment.
                    </p>

                  </div>

                </div>


                {/* SUBMIT */}

                <button
                  type="submit"
                  className="join-submit-btn"
                  disabled={
                    isSubmitting
                  }
                >

                  {isSubmitting ? (
                    <>
                      Processing...
                    </>
                  ) : (
                    <>
                      <FiCreditCard />

                      CONTINUE TO PAYMENT

                      <FiArrowRight />
                    </>
                  )}

                </button>

              </form>

            </section>

          </div>


          {/* =================================================
              RIGHT SUMMARY
          ================================================== */}

          <aside className="join-summary">

            <div className="join-summary-card">

              {/* TOP */}

              <div className="join-summary-top">

                <div className="join-summary-icon">
                  <FiCreditCard />
                </div>

                <span>
                  MEMBERSHIP SUMMARY
                </span>

              </div>


              {/* PLAN */}

              <div className="join-summary-plan">

                <div className="join-summary-plan-icon">

                  {currentPlan.id ===
                  "basic" ? (
                    <FaDumbbell />
                  ) : currentPlan.id ===
                    "pro" ? (
                    <FaCrown />
                  ) : (
                    <FaGem />
                  )}

                </div>

                <div>

                  <span>
                    {
                      currentPlan.tag
                    }
                  </span>

                  <h2>
                    {
                      currentPlan.name
                    }
                  </h2>

                  <p>
                    {
                      currentPlan.description
                    }
                  </p>

                </div>

              </div>


              {/* MONTHLY */}

              <div className="join-summary-monthly">

                <strong>
                  {formatPrice(
                    currentPlan.price
                  )}
                </strong>

                <span>
                  / month
                </span>

              </div>


              <div className="join-summary-divider" />


              {/* DURATION */}

              <div className="join-summary-row">

                <span>
                  Duration
                </span>

                <strong>
                  {
                    currentDuration.label
                  }
                </strong>

              </div>


              {/* SUBTOTAL */}

              <div className="join-summary-row">

                <span>
                  Subtotal
                </span>

                <strong>
                  {formatPrice(
                    priceDetails.subtotal
                  )}
                </strong>

              </div>


              {/* DISCOUNT */}

              {currentDuration.discount >
                0 && (
                <div className="join-summary-row discount">

                  <span>
                    Discount (
                    {
                      currentDuration.discount
                    }
                    %)
                  </span>

                  <strong>
                    -
                    {formatPrice(
                      priceDetails.discountAmount
                    )}
                  </strong>

                </div>
              )}


              {/* TOTAL */}

              <div className="join-summary-total">

                <div>

                  <span>
                    TOTAL
                  </span>

                  <small>
                    Membership amount
                  </small>

                </div>

                <strong>
                  {formatPrice(
                    priceDetails.total
                  )}
                </strong>

              </div>


              <div className="join-summary-divider" />


              {/* INCLUDED */}

              <h3>
                What's Included
              </h3>

              <ul className="join-summary-features">

                {currentPlan.features.map(
                  (
                    feature
                  ) => (
                    <li
                      key={
                        feature
                      }
                    >
                      <span>
                        <FiCheck />
                      </span>

                      {feature}
                    </li>
                  )
                )}

              </ul>


              {/* START DATE */}

              <div className="join-summary-date">

                <FiCalendar />

                <div>

                  <span>
                    START DATE
                  </span>

                  <strong>
                    {formatDisplayDate(
                      formData.startDate
                    )}
                  </strong>

                </div>

              </div>


              {/* =================================================
                  SELECTED CLASS IN SUMMARY
              ================================================== */}

              {selectedClass &&
                workoutInfo && (
                  <div className="join-summary-class">

                    <FaDumbbell />

                    <div>

                      <span>
                        {
                          workoutInfo.type
                        }
                      </span>

                      <strong>
                        {selectedClass.title ||
                          selectedClass.name}
                      </strong>

                      <small>
                        {
                          workoutInfo.purpose
                        }
                      </small>

                    </div>

                  </div>
                )}


              {/* NOTE */}

              <div className="join-summary-note">

                <FiShield />

                <p>
                  Complete your details and
                  continue to payment to
                  activate your membership.
                </p>

              </div>

            </div>

          </aside>

        </div>

      </section>

    </main>
  );
};

export default Join;