import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  FiArrowLeft,
  FiArrowRight,
  FiCheck,
  FiCheckCircle,
  FiCreditCard,
  FiLock,
  FiShield,
  FiSmartphone,
  FiUser,
} from "react-icons/fi";

import { FaUniversity } from "react-icons/fa";

import "./Payment.css";

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
   PAYMENT PAGE
========================================================= */

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();

  /* =======================================================
     MEMBERSHIP DATA
  ======================================================= */

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
      console.error("Unable to read membership:", error);
    }

    return null;
  }, [location.state]);

  /* =======================================================
     STATES
  ======================================================= */

  const [paymentMethod, setPaymentMethod] = useState("upi");

  const [upiId, setUpiId] = useState("");

  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const [bank, setBank] = useState("");

  const [errors, setErrors] = useState({});

  const [isPaying, setIsPaying] = useState(false);

  /* =======================================================
     PAGE TOP
  ======================================================= */

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  /* =======================================================
     CARD NUMBER
  ======================================================= */

  const handleCardNumber = (e) => {
    const value = e.target.value
      .replace(/\D/g, "")
      .slice(0, 16);

    const formatted = value
      .replace(/(.{4})/g, "$1 ")
      .trim();

    setCardNumber(formatted);

    setErrors((prev) => ({
      ...prev,
      cardNumber: "",
    }));
  };

  /* =======================================================
     EXPIRY
  ======================================================= */

  const handleExpiry = (e) => {
    let value = e.target.value
      .replace(/\D/g, "")
      .slice(0, 4);

    if (value.length >= 3) {
      value =
        value.slice(0, 2) +
        "/" +
        value.slice(2);
    }

    setExpiry(value);

    setErrors((prev) => ({
      ...prev,
      expiry: "",
    }));
  };

  /* =======================================================
     CVV
  ======================================================= */

  const handleCvv = (e) => {
    const value = e.target.value
      .replace(/\D/g, "")
      .slice(0, 3);

    setCvv(value);

    setErrors((prev) => ({
      ...prev,
      cvv: "",
    }));
  };

  /* =======================================================
     VALIDATE PAYMENT
  ======================================================= */

  const validatePayment = () => {
    const newErrors = {};

    /* UPI */

    if (paymentMethod === "upi") {
      const cleanUpi = upiId.trim();

      if (!cleanUpi) {
        newErrors.upi =
          "Please enter your UPI ID.";
      } else if (
        !/^[\w.-]+@[\w.-]+$/.test(cleanUpi)
      ) {
        newErrors.upi =
          "Please enter a valid UPI ID.";
      }
    }

    /* CARD */

    if (paymentMethod === "card") {
      const cleanCard =
        cardNumber.replace(/\s/g, "");

      if (cleanCard.length !== 16) {
        newErrors.cardNumber =
          "Enter a valid 16 digit card number.";
      }

      if (!cardName.trim()) {
        newErrors.cardName =
          "Enter name on card.";
      }

      if (!/^\d{2}\/\d{2}$/.test(expiry)) {
        newErrors.expiry =
          "Enter expiry as MM/YY.";
      }

      if (cvv.length !== 3) {
        newErrors.cvv =
          "Enter a valid 3 digit CVV.";
      }
    }

    /* NET BANKING */

    if (paymentMethod === "netbanking") {
      if (!bank) {
        newErrors.bank =
          "Please select your bank.";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* =======================================================
     PAY NOW
  ======================================================= */

  const handlePayment = (e) => {
    e.preventDefault();

    if (!membership) {
      navigate("/join");
      return;
    }

    if (!validatePayment()) {
      return;
    }

    setIsPaying(true);

    /*
      DEMO PAYMENT

      Real online payment ke liye later
      Razorpay / Cashfree / PayU etc.
      gateway connect karna hoga.
    */

    setTimeout(() => {
      const paymentData = {
        paymentId:
          "PAY-" +
          Date.now()
            .toString()
            .slice(-10),

        membershipId:
          membership.id,

        member:
          membership.name,

        email:
          membership.email,

        phone:
          membership.phone,

        plan:
          membership.plan,

        duration:
          membership.duration,

        startDate:
          membership.displayStartDate,

        amount:
          membership.total,

        paymentMethod:
          paymentMethod === "upi"
            ? "UPI"
            : paymentMethod === "card"
            ? "Card"
            : "Net Banking",

        status: "Paid",

        paidAt:
          new Date().toISOString(),
      };

      localStorage.setItem(
        "fitzonePayment",
        JSON.stringify(paymentData)
      );

      const updatedMembership = {
        ...membership,

        paymentStatus: "Paid",

        paymentId:
          paymentData.paymentId,

        paymentMethod:
          paymentData.paymentMethod,
      };

      localStorage.setItem(
        "fitzoneMembership",
        JSON.stringify(updatedMembership)
      );

      setIsPaying(false);

      /*
        Abhi success page banaya nahi hai.

        Jab MembershipSuccess.jsx ban jayega,
        ye route use hoga.
      */

      navigate("/membership-success", {
        state: {
          membership: updatedMembership,
          payment: paymentData,
        },
      });
    }, 1200);
  };

  /* =======================================================
     NO MEMBERSHIP
  ======================================================= */

  if (!membership) {
    return (
      <main className="payment-empty">

        <div className="payment-empty-card">

          <FiCreditCard />

          <span>FITZONE PAYMENT</span>

          <h1>
            NO MEMBERSHIP
            <strong> FOUND.</strong>
          </h1>

          <p>
            Please complete your membership
            form before continuing to payment.
          </p>

          <button
            type="button"
            onClick={() => navigate("/join")}
          >
            GO TO MEMBERSHIP

            <FiArrowRight />
          </button>

        </div>

      </main>
    );
  }

  /* =======================================================
     MAIN PAYMENT PAGE
  ======================================================= */

  return (
    <main className="payment-page">

      {/* ===================================================
          HERO
      =================================================== */}

      <section className="payment-hero">

        <div className="payment-hero-container">

          <button
            type="button"
            className="payment-back"
            onClick={() => navigate(-1)}
          >
            <FiArrowLeft />

            Back to Membership
          </button>

          <div className="payment-hero-content">

            <span className="payment-eyebrow">
              SECURE CHECKOUT
            </span>

            <h1>
              COMPLETE YOUR
              <strong> PAYMENT.</strong>
            </h1>

            <p>
              You're one step away from activating
              your FitZone membership.
            </p>

            <div className="payment-security">

              <div>
                <FiLock />
                Secure Payment
              </div>

              <div>
                <FiShield />
                Protected Details
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ===================================================
          PAYMENT CONTENT
      =================================================== */}

      <section className="payment-main">

        <div className="payment-container">

          {/* =================================================
              LEFT
          ================================================= */}

          <div className="payment-left">

            <div className="payment-section-heading">

              <span>
                01 — PAYMENT METHOD
              </span>

              <h2>
                HOW WOULD YOU LIKE TO
                <strong> PAY?</strong>
              </h2>

              <p>
                Select your preferred payment
                method below.
              </p>

            </div>

            {/* ===============================================
                PAYMENT METHOD TABS
            =============================================== */}

            <div className="payment-methods">

              <button
                type="button"
                className={
                  paymentMethod === "upi"
                    ? "payment-method active"
                    : "payment-method"
                }
                onClick={() => {
                  setPaymentMethod("upi");
                  setErrors({});
                }}
              >
                <FiSmartphone />

                <div>
                  <strong>UPI</strong>
                  <span>
                    Pay using UPI ID
                  </span>
                </div>

                <span className="payment-method-check">
                  {paymentMethod === "upi" && (
                    <FiCheck />
                  )}
                </span>
              </button>

              <button
                type="button"
                className={
                  paymentMethod === "card"
                    ? "payment-method active"
                    : "payment-method"
                }
                onClick={() => {
                  setPaymentMethod("card");
                  setErrors({});
                }}
              >
                <FiCreditCard />

                <div>
                  <strong>
                    Card
                  </strong>

                  <span>
                    Debit / Credit Card
                  </span>
                </div>

                <span className="payment-method-check">
                  {paymentMethod === "card" && (
                    <FiCheck />
                  )}
                </span>
              </button>

              <button
                type="button"
                className={
                  paymentMethod ===
                  "netbanking"
                    ? "payment-method active"
                    : "payment-method"
                }
                onClick={() => {
                  setPaymentMethod(
                    "netbanking"
                  );

                  setErrors({});
                }}
              >
                <FaUniversity />

                <div>
                  <strong>
                    Net Banking
                  </strong>

                  <span>
                    Pay from your bank
                  </span>
                </div>

                <span className="payment-method-check">
                  {paymentMethod ===
                    "netbanking" && (
                    <FiCheck />
                  )}
                </span>
              </button>

            </div>

            {/* ===============================================
                PAYMENT FORM
            =============================================== */}

            <form
              className="payment-form"
              onSubmit={handlePayment}
              noValidate
            >

              {/* =============================================
                  UPI
              ============================================= */}

              {paymentMethod === "upi" && (
                <div className="payment-form-box">

                  <div className="payment-form-title">

                    <FiSmartphone />

                    <div>
                      <span>
                        UPI PAYMENT
                      </span>

                      <h3>
                        Enter Your UPI ID
                      </h3>
                    </div>

                  </div>

                  <div className="payment-field">

                    <label htmlFor="upi">
                      UPI ID
                    </label>

                    <div
                      className={
                        errors.upi
                          ? "payment-input error"
                          : "payment-input"
                      }
                    >
                      <FiSmartphone />

                      <input
                        id="upi"
                        type="text"
                        value={upiId}
                        onChange={(e) => {
                          setUpiId(
                            e.target.value
                          );

                          setErrors(
                            (prev) => ({
                              ...prev,
                              upi: "",
                            })
                          );
                        }}
                        placeholder="yourname@upi"
                      />
                    </div>

                    {errors.upi && (
                      <p className="payment-error">
                        {errors.upi}
                      </p>
                    )}

                  </div>

                  <div className="payment-upi-apps">

                    <span>
                      SUPPORTED UPI APPS
                    </span>

                    <div>
                      <strong>
                        G Pay
                      </strong>

                      <strong>
                        PhonePe
                      </strong>

                      <strong>
                        Paytm
                      </strong>

                      <strong>
                        BHIM
                      </strong>
                    </div>

                  </div>

                </div>
              )}

              {/* =============================================
                  CARD
              ============================================= */}

              {paymentMethod === "card" && (
                <div className="payment-form-box">

                  <div className="payment-form-title">

                    <FiCreditCard />

                    <div>
                      <span>
                        CARD PAYMENT
                      </span>

                      <h3>
                        Enter Card Details
                      </h3>
                    </div>

                  </div>

                  {/* CARD NUMBER */}

                  <div className="payment-field">

                    <label htmlFor="cardNumber">
                      Card Number
                    </label>

                    <div
                      className={
                        errors.cardNumber
                          ? "payment-input error"
                          : "payment-input"
                      }
                    >
                      <FiCreditCard />

                      <input
                        id="cardNumber"
                        type="text"
                        inputMode="numeric"
                        value={cardNumber}
                        onChange={
                          handleCardNumber
                        }
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                    </div>

                    {errors.cardNumber && (
                      <p className="payment-error">
                        {errors.cardNumber}
                      </p>
                    )}

                  </div>

                  {/* NAME */}

                  <div className="payment-field">

                    <label htmlFor="cardName">
                      Name On Card
                    </label>

                    <div
                      className={
                        errors.cardName
                          ? "payment-input error"
                          : "payment-input"
                      }
                    >
                      <FiUser />

                      <input
                        id="cardName"
                        type="text"
                        value={cardName}
                        onChange={(e) => {
                          setCardName(
                            e.target.value
                          );

                          setErrors(
                            (prev) => ({
                              ...prev,
                              cardName: "",
                            })
                          );
                        }}
                        placeholder="Name as on card"
                      />
                    </div>

                    {errors.cardName && (
                      <p className="payment-error">
                        {errors.cardName}
                      </p>
                    )}

                  </div>

                  <div className="payment-card-row">

                    {/* EXPIRY */}

                    <div className="payment-field">

                      <label htmlFor="expiry">
                        Expiry
                      </label>

                      <div
                        className={
                          errors.expiry
                            ? "payment-input error"
                            : "payment-input"
                        }
                      >
                        <input
                          id="expiry"
                          type="text"
                          inputMode="numeric"
                          value={expiry}
                          onChange={
                            handleExpiry
                          }
                          placeholder="MM/YY"
                          maxLength={5}
                        />
                      </div>

                      {errors.expiry && (
                        <p className="payment-error">
                          {errors.expiry}
                        </p>
                      )}

                    </div>

                    {/* CVV */}

                    <div className="payment-field">

                      <label htmlFor="cvv">
                        CVV
                      </label>

                      <div
                        className={
                          errors.cvv
                            ? "payment-input error"
                            : "payment-input"
                        }
                      >
                        <FiLock />

                        <input
                          id="cvv"
                          type="password"
                          inputMode="numeric"
                          value={cvv}
                          onChange={
                            handleCvv
                          }
                          placeholder="•••"
                          maxLength={3}
                        />
                      </div>

                      {errors.cvv && (
                        <p className="payment-error">
                          {errors.cvv}
                        </p>
                      )}

                    </div>

                  </div>

                </div>
              )}

              {/* =============================================
                  NET BANKING
              ============================================= */}

              {paymentMethod ===
                "netbanking" && (
                <div className="payment-form-box">

                  <div className="payment-form-title">

                    <FaUniversity />

                    <div>
                      <span>
                        NET BANKING
                      </span>

                      <h3>
                        Select Your Bank
                      </h3>
                    </div>

                  </div>

                  <div className="payment-field">

                    <label htmlFor="bank">
                      Bank
                    </label>

                    <div
                      className={
                        errors.bank
                          ? "payment-input error"
                          : "payment-input"
                      }
                    >
                      <FaUniversity />

                      <select
                        id="bank"
                        value={bank}
                        onChange={(e) => {
                          setBank(
                            e.target.value
                          );

                          setErrors(
                            (prev) => ({
                              ...prev,
                              bank: "",
                            })
                          );
                        }}
                      >
                        <option value="">
                          Select your bank
                        </option>

                        <option value="SBI">
                          State Bank of India
                        </option>

                        <option value="HDFC">
                          HDFC Bank
                        </option>

                        <option value="ICICI">
                          ICICI Bank
                        </option>

                        <option value="AXIS">
                          Axis Bank
                        </option>

                        <option value="PNB">
                          Punjab National Bank
                        </option>

                        <option value="BOB">
                          Bank of Baroda
                        </option>
                      </select>

                    </div>

                    {errors.bank && (
                      <p className="payment-error">
                        {errors.bank}
                      </p>
                    )}

                  </div>

                </div>
              )}

              {/* =============================================
                  SECURITY NOTE
              ============================================= */}

              <div className="payment-secure-note">

                <FiShield />

                <div>
                  <strong>
                    Secure Payment
                  </strong>

                  <p>
                    Your payment information
                    is protected and secure.
                  </p>
                </div>

              </div>

              {/* =============================================
                  PAY BUTTON
              ============================================= */}

              <button
                type="submit"
                className="payment-pay-btn"
                disabled={isPaying}
              >
                <FiLock />

                <span>
                  {isPaying
                    ? "PROCESSING PAYMENT..."
                    : `PAY ${formatPrice(
                        membership.total
                      )} SECURELY`}
                </span>

                {!isPaying && (
                  <FiArrowRight />
                )}
              </button>

            </form>

          </div>

          {/* =================================================
              RIGHT SUMMARY
          ================================================= */}

          <aside className="payment-summary">

            <div className="payment-summary-card">

              <div className="payment-summary-top">

                <span>
                  ORDER SUMMARY
                </span>

                <h2>
                  YOUR
                  <strong> MEMBERSHIP.</strong>
                </h2>

              </div>

              {/* MEMBER */}

              <div className="payment-member">

                <div className="payment-member-icon">
                  <FiUser />
                </div>

                <div>
                  <span>
                    MEMBER
                  </span>

                  <strong>
                    {membership.name}
                  </strong>

                  <small>
                    {membership.email}
                  </small>
                </div>

              </div>

              <div className="payment-divider" />

              {/* DETAILS */}

              <div className="payment-summary-details">

                <div>
                  <span>
                    Plan
                  </span>

                  <strong>
                    {membership.plan}
                  </strong>
                </div>

                <div>
                  <span>
                    Duration
                  </span>

                  <strong>
                    {membership.duration}
                  </strong>
                </div>

                <div>
                  <span>
                    Start Date
                  </span>

                  <strong>
                    {membership.displayStartDate}
                  </strong>
                </div>

                {membership.selectedClass && (
                  <div>
                    <span>
                      Fitness Class
                    </span>

                    <strong>
                      {
                        membership
                          .selectedClass
                          .title
                      }
                    </strong>
                  </div>
                )}

              </div>

              <div className="payment-divider" />

              {/* PRICE */}

              <div className="payment-price-details">

                <div>
                  <span>
                    Subtotal
                  </span>

                  <strong>
                    {formatPrice(
                      membership.subtotal
                    )}
                  </strong>
                </div>

                {membership.discountAmount >
                  0 && (
                  <div className="discount">
                    <span>
                      Discount
                    </span>

                    <strong>
                      -
                      {formatPrice(
                        membership
                          .discountAmount
                      )}
                    </strong>
                  </div>
                )}

              </div>

              {/* TOTAL */}

              <div className="payment-total">

                <div>
                  <span>
                    TOTAL TO PAY
                  </span>

                  <small>
                    One-time payment
                  </small>
                </div>

                <strong>
                  {formatPrice(
                    membership.total
                  )}
                </strong>

              </div>

              {/* SAFE */}

              <div className="payment-summary-safe">

                <FiCheckCircle />

                <div>
                  <strong>
                    Safe & Secure
                  </strong>

                  <span>
                    Protected checkout
                  </span>
                </div>

              </div>

            </div>

          </aside>

        </div>

      </section>

    </main>
  );
};

export default Payment;