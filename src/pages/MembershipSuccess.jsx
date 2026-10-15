import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  FiArrowRight,
  FiCalendar,
  FiCheck,
  FiCheckCircle,
  FiCreditCard,
  FiHome,
  FiMail,
  FiMapPin,
  FiPhone,
  FiTarget,
  FiUser,
  FiActivity,
  FiClock,
  FiAward,
} from "react-icons/fi";

import "./MembershipSuccess.css";

const MembershipSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  /* =========================================================
     GET MEMBERSHIP
  ========================================================= */

  const membership = useMemo(() => {
    if (location.state?.membership) {
      return location.state.membership;
    }

    try {
      const saved = localStorage.getItem("fitzoneMembership");

      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error("Membership error:", error);
    }

    return null;
  }, [location.state]);

  /* =========================================================
     GET PAYMENT
  ========================================================= */

  const payment = useMemo(() => {
    if (location.state?.payment) {
      return location.state.payment;
    }

    try {
      const saved = localStorage.getItem("fitzonePayment");

      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error("Payment error:", error);
    }

    return null;
  }, [location.state]);

  /* =========================================================
     FORMAT PRICE
  ========================================================= */

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(Number(price || 0));
  };

  /* =========================================================
     MEMBER DATA
  ========================================================= */

  const memberName =
    membership?.name ||
    membership?.fullName ||
    "FitZone Member";

  const memberEmail =
    membership?.email || "Not added";

  const memberPhone =
    membership?.phone || "Not added";

  const memberAge =
    membership?.age
      ? `${membership.age} Years`
      : "Not added";

  const memberCity =
    membership?.city || "Not added";

  const fitnessGoal =
    membership?.goal ||
    membership?.fitnessGoal ||
    "Stay Fit & Healthy";

  const plan =
    membership?.plan || "Pro";

  const duration =
    membership?.duration || "1 Month";

  const startDate =
    membership?.displayStartDate ||
    membership?.startDate ||
    "Not selected";

  const total =
    membership?.total || 0;

  const paymentMethod =
    payment?.paymentMethod ||
    membership?.paymentMethod ||
    "Online Payment";

  const paymentId =
    payment?.paymentId ||
    membership?.paymentId ||
    "FITZONE-PAYMENT";

  /* =========================================================
     SELECTED CLASS / WORKOUT
  ========================================================= */

  const selectedClass =
    membership?.selectedClass || null;

  const workoutName =
    selectedClass?.title ||
    selectedClass?.name ||
    membership?.className ||
    "Cardio";

  const workoutDescription =
    selectedClass?.description ||
    membership?.classDescription ||
    `You have chosen ${workoutName} to improve your fitness, stamina and overall health.`;

  /* =========================================================
     NO MEMBERSHIP
  ========================================================= */

  if (!membership) {
    return (
      <main className="success-page">

        <div className="success-empty">

          <FiUser />

          <h2>
            No Membership Found
          </h2>

          <p>
            Please complete your membership
            before opening this page.
          </p>

          <button
            type="button"
            onClick={() => navigate("/join")}
          >
            Join Now
            <FiArrowRight />
          </button>

        </div>

      </main>
    );
  }

  /* =========================================================
     PAGE
  ========================================================= */

  return (
    <main className="success-page">

      <div className="success-container">

        {/* =====================================================
            MAIN SINGLE BOX
        ===================================================== */}

        <section className="success-card">

          {/* ===================================================
              TOP
          =================================================== */}

          <div className="success-top">

            <div className="success-brand">

              <div className="success-brand-name">
                FIT<span>ZONE</span>
              </div>

              <small>
                TRAIN • TRANSFORM • TOGETHER
              </small>

            </div>


            <div className="success-heading">

              <div className="success-check">
                <FiCheck />
              </div>

              <h1>
                Payment Successful!
              </h1>

              <p>
                Your membership has been activated
                successfully.
                <br />

                Welcome to{" "}
                <strong>
                  FITZONE
                </strong>{" "}
                Family!
              </p>

            </div>


            <div className="success-plan-status">

              <FiAward />

              <div>
                <strong>
                  {plan} Member
                </strong>

                <span>
                  <i />
                  Active
                </span>
              </div>

            </div>

          </div>


          {/* ===================================================
              MEMBER + WORKOUT
          =================================================== */}

          <div className="success-member-workout">

            {/* MEMBER */}

            <div className="success-member">

              <div className="success-avatar">
                <FiUser />
              </div>

              <div className="success-member-info">

                <h2>
                  {memberName}
                </h2>

                <p>
                  <FiMail />
                  <span>
                    {memberEmail}
                  </span>
                </p>

                <p>
                  <FiPhone />
                  <span>
                    {memberPhone}
                  </span>
                </p>

                <p>
                  <FiMapPin />
                  <span>
                    {memberCity}
                  </span>
                </p>

                <p>
                  <FiCalendar />
                  <span>
                    {memberAge}
                  </span>
                </p>

              </div>

            </div>


            {/* WORKOUT */}

            <div className="success-workout">

              <div className="success-workout-icon">
                <FiActivity />
              </div>

              <div className="success-workout-content">

                <span>
                  Selected Workout
                </span>

                <h3>
                  {workoutName}
                </h3>

                <p>
                  {workoutDescription}
                </p>

              </div>


              <div className="success-enrolled">
                <FiCheck />
                Enrolled
              </div>

            </div>

          </div>


          {/* ===================================================
              FITNESS INFORMATION
          =================================================== */}

          <div className="success-fitness-row">

            {/* GOAL */}

            <div className="success-stat">

              <div className="success-stat-icon">
                <FiTarget />
              </div>

              <div>
                <span>
                  Your Fitness Goal
                </span>

                <strong>
                  {fitnessGoal}
                </strong>
              </div>

            </div>


            {/* PLAN */}

            <div className="success-stat">

              <div className="success-stat-icon gold">
                <FiAward />
              </div>

              <div>
                <span>
                  Membership Plan
                </span>

                <strong>
                  {plan} Plan
                </strong>
              </div>

            </div>


            {/* DURATION */}

            <div className="success-stat">

              <div className="success-stat-icon">
                <FiClock />
              </div>

              <div>
                <span>
                  Duration
                </span>

                <strong>
                  {duration}
                </strong>
              </div>

            </div>


            {/* START DATE */}

            <div className="success-stat">

              <div className="success-stat-icon">
                <FiCalendar />
              </div>

              <div>
                <span>
                  Start Date
                </span>

                <strong>
                  {startDate}
                </strong>
              </div>

            </div>

          </div>


          {/* ===================================================
              PAYMENT DETAILS
          =================================================== */}

          <div className="success-payment">

            <div className="success-payment-title">

              <FiCreditCard />

              <h3>
                Payment Details
              </h3>

            </div>


            <div className="success-payment-grid">

              {/* AMOUNT */}

              <div className="success-payment-item">

                <span>
                  Total Amount
                </span>

                <strong className="success-big-price">
                  {formatPrice(total)}
                </strong>

              </div>


              {/* METHOD */}

              <div className="success-payment-item">

                <span>
                  Payment Method
                </span>

                <strong>
                  {paymentMethod}
                </strong>

              </div>


              {/* ID */}

              <div className="success-payment-item">

                <span>
                  Payment ID
                </span>

                <strong>
                  {paymentId}
                </strong>

              </div>


              {/* STATUS */}

              <div className="success-payment-item">

                <span>
                  Payment Status
                </span>

                <strong className="success-paid">
                  <FiCheckCircle />
                  Paid
                </strong>

              </div>

            </div>

          </div>


          {/* ===================================================
              BOTTOM
          =================================================== */}

          <div className="success-bottom">

            <div className="success-next">

              <div className="success-next-icon">
                🎉
              </div>

              <div>

                <strong>
                  What's Next?
                </strong>

                <p>
                  You can now access all{" "}
                  {workoutName} classes,
                  schedules and workouts as per
                  your {plan} Plan.
                </p>

              </div>

            </div>


            <div className="success-actions">

              <button
                type="button"
                className="success-class-btn"
                onClick={() =>
                  navigate("/classes")
                }
              >
                Go to Classes
                <FiArrowRight />
              </button>


              <button
                type="button"
                className="success-home-btn"
                onClick={() =>
                  navigate("/")
                }
              >
                <FiHome />
                Back to Home
              </button>

            </div>

          </div>

        </section>

      </div>

    </main>
  );
};

export default MembershipSuccess;