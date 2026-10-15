import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiActivity,
  FiArrowLeft,
  FiCalendar,
  FiCheck,
  FiClock,
  FiCreditCard,
} from "react-icons/fi";

import { FaDumbbell } from "react-icons/fa";

import "./MyMembership.css";

const MyMembership = () => {
  const navigate = useNavigate();

  const [membership, setMembership] = useState(null);

  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("fitzoneMembership") || "null"
      );

      setMembership(saved);
    } catch {
      setMembership(null);
    }
  }, []);

  const plan =
    membership?.plan?.name ||
    membership?.plan ||
    "No Membership";

  const duration =
    membership?.duration ||
    membership?.selectedDuration ||
    "Not selected";

  const amount =
    membership?.total ||
    membership?.totalPrice ||
    membership?.amount ||
    membership?.plan?.price ||
    "—";

  const status =
    membership?.status ||
    (membership ? "Active" : "Inactive");

  return (
    <main className="membership-page">
      <header className="membership-header">
        <div>
          <button
            onClick={() =>
              navigate("/user/dashboard")
            }
          >
            <FiArrowLeft />
          </button>

          <div>
            <span>MEMBER ACCOUNT</span>
            <h1>
              My <strong>Membership</strong>
            </h1>
          </div>
        </div>
      </header>

      {!membership ? (
        <section className="no-membership">
          <FaDumbbell />

          <h2>No Active Membership</h2>

          <p>
            Choose a FITZONE membership plan to
            start your fitness journey.
          </p>

          <button
            onClick={() =>
              navigate("/membership")
            }
          >
            VIEW MEMBERSHIP PLANS
          </button>
        </section>
      ) : (
        <>
          <section className="membership-hero-card">
            <div>
              <span>YOUR CURRENT PLAN</span>

              <h2>{plan}</h2>

              <p>
                Your FITZONE membership is currently{" "}
                <strong>{status}</strong>.
              </p>
            </div>

            <div className="membership-dumbbell">
              <FaDumbbell />
            </div>
          </section>

          <section className="membership-info-grid">
            <article>
              <FiActivity />
              <span>Plan</span>
              <strong>{plan}</strong>
            </article>

            <article>
              <FiClock />
              <span>Duration</span>
              <strong>{duration}</strong>
            </article>

            <article>
              <FiCreditCard />
              <span>Amount</span>
              <strong>{amount}</strong>
            </article>

            <article>
              <FiCheck />
              <span>Status</span>
              <strong>{status}</strong>
            </article>
          </section>

          <section className="membership-detail-card">
            <div className="membership-detail-heading">
              <span>PLAN INFORMATION</span>
              <h3>Membership Details</h3>
            </div>

            <div className="membership-detail-row">
              <div>
                <FiActivity />
                <span>Membership Plan</span>
              </div>

              <strong>{plan}</strong>
            </div>

            <div className="membership-detail-row">
              <div>
                <FiClock />
                <span>Plan Duration</span>
              </div>

              <strong>{duration}</strong>
            </div>

            <div className="membership-detail-row">
              <div>
                <FiCalendar />
                <span>Fitness Goal</span>
              </div>

              <strong>
                {membership?.goal ||
                  membership?.fitnessGoal ||
                  "General Fitness"}
              </strong>
            </div>

            <div className="membership-detail-row">
              <div>
                <FiCheck />
                <span>Membership Status</span>
              </div>

              <strong className="membership-status">
                {status}
              </strong>
            </div>
          </section>
        </>
      )}
    </main>
  );
};

export default MyMembership;