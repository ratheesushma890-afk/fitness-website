import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiArrowRight,
  FiCheckCircle,
  FiClock,
  FiHeadphones,
  FiMail,
  FiMapPin,
  FiMessageSquare,
  FiPhone,
  FiShield,
  FiUser,
  FiUsers,
} from "react-icons/fi";

import { FaDumbbell } from "react-icons/fa";

import "./Contact.css";


/* =========================================================
   CONTACT PAGE
========================================================= */

const Contact = () => {
  const navigate = useNavigate();


  /* =======================================================
     FORM STATE
  ======================================================= */

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });


  /* =======================================================
     ERROR STATE
  ======================================================= */

  const [errors, setErrors] = useState({});


  /* =======================================================
     SUCCESS STATE
  ======================================================= */

  const [success, setSuccess] = useState(false);


  /* =======================================================
     NORMAL INPUT CHANGE
  ======================================================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));


    /* REMOVE ERROR WHILE TYPING */

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));


    setSuccess(false);
  };


  /* =======================================================
     PHONE INPUT
     ONLY NUMBERS
     MAXIMUM 10 DIGITS
  ======================================================= */

  const handlePhoneChange = (e) => {
    const value = e.target.value;


    /* REMOVE EVERYTHING EXCEPT NUMBERS */

    const onlyNumbers = value.replace(/\D/g, "");


    /* MAXIMUM 10 DIGITS */

    const tenDigitsOnly = onlyNumbers.slice(0, 10);


    setFormData((prev) => ({
      ...prev,
      phone: tenDigitsOnly,
    }));


    /* LIVE ERROR */

    if (
      tenDigitsOnly.length > 0 &&
      tenDigitsOnly.length < 10
    ) {
      setErrors((prev) => ({
        ...prev,
        phone: "Phone number must be exactly 10 digits.",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        phone: "",
      }));
    }


    setSuccess(false);
  };


  /* =======================================================
     VALIDATE FORM
  ======================================================= */

  const validateForm = () => {
    const newErrors = {};


    /* NAME */

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name.";
    } else if (
      formData.name.trim().length < 3
    ) {
      newErrors.name =
        "Name must contain at least 3 characters.";
    }


    /* EMAIL */

    if (!formData.email.trim()) {
      newErrors.email =
        "Please enter your email address.";
    } else {
      const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (
        !emailPattern.test(
          formData.email.trim()
        )
      ) {
        newErrors.email =
          "Please enter a valid email address.";
      }
    }


    /* PHONE */

    if (!formData.phone) {
      newErrors.phone =
        "Please enter your phone number.";
    } else if (
      !/^\d{10}$/.test(formData.phone)
    ) {
      newErrors.phone =
        "Phone number must be exactly 10 digits.";
    }


    /* SUBJECT */

    if (!formData.subject) {
      newErrors.subject =
        "Please select a subject.";
    }


    /* MESSAGE */

    if (!formData.message.trim()) {
      newErrors.message =
        "Please enter your message.";
    } else if (
      formData.message.trim().length < 10
    ) {
      newErrors.message =
        "Message must contain at least 10 characters.";
    }


    setErrors(newErrors);


    return Object.keys(newErrors).length === 0;
  };


  /* =======================================================
     SUBMIT
  ======================================================= */

  const handleSubmit = (e) => {
    e.preventDefault();


    /* CHECK VALIDATION */

    const isValid = validateForm();


    if (!isValid) {
      setSuccess(false);

      return;
    }


    /* =====================================================
       SAVE MESSAGE IN LOCAL STORAGE
       FRONTEND DEMO
    ===================================================== */

    const oldMessages =
      JSON.parse(
        localStorage.getItem(
          "fitzoneContactMessages"
        )
      ) || [];


    const newMessage = {
      id: Date.now(),

      name: formData.name.trim(),

      email: formData.email.trim(),

      phone: formData.phone,

      subject: formData.subject,

      message: formData.message.trim(),

      createdAt:
        new Date().toLocaleString(),
    };


    const updatedMessages = [
      ...oldMessages,
      newMessage,
    ];


    localStorage.setItem(
      "fitzoneContactMessages",
      JSON.stringify(updatedMessages)
    );


    /* SHOW SUCCESS */

    setSuccess(true);


    /* REMOVE ERRORS */

    setErrors({});


    /* CLEAR FORM */

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };


  return (
    <main className="contact-page">


      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="contact-hero">

        <div className="contact-hero-overlay" />

        <div className="contact-hero-glow contact-glow-one" />

        <div className="contact-hero-glow contact-glow-two" />


        <div className="contact-container contact-hero-inner">


          {/* LEFT */}

          <div className="contact-hero-content">

            <span className="contact-eyebrow">
              GET IN TOUCH
            </span>


            <h1>
              We're Here

              <span>
                For You
              </span>
            </h1>


            <p>
              Have questions, need support, or want
              to learn more about our gym? Our team
              is always ready to help you.
            </p>


            {/* FEATURES */}

            <div className="contact-hero-features">


              <div className="contact-hero-feature">

                <span>
                  <FiMessageSquare />
                </span>

                <div>

                  <strong>
                    Quick Response
                  </strong>

                  <p>
                    We reply within 24 hours
                  </p>

                </div>

              </div>


              <div className="contact-hero-feature">

                <span>
                  <FiUsers />
                </span>

                <div>

                  <strong>
                    Friendly Support
                  </strong>

                  <p>
                    Always here to help
                  </p>

                </div>

              </div>


              <div className="contact-hero-feature">

                <span>
                  <FiHeadphones />
                </span>

                <div>

                  <strong>
                    Expert Guidance
                  </strong>

                  <p>
                    Get the right advice
                  </p>

                </div>

              </div>


            </div>

          </div>


          {/* RIGHT QUOTE */}

          <div className="contact-hero-quote">

            <span>
              Let's Build
            </span>

            <span>
              a Healthier
            </span>

            <span>
              Stronger
            </span>

            <strong>
              You
            </strong>

            <div />

          </div>


        </div>

      </section>


      {/* =====================================================
          MAIN CONTACT
      ===================================================== */}

      <section className="contact-main-section">

        <div className="contact-container contact-main-grid">


          {/* =================================================
              CONTACT INFORMATION
          ================================================= */}

          <article className="contact-info-card">


            {/* ADDRESS */}

            <div className="contact-info-item">

              <div className="contact-info-icon">
                <FiMapPin />
              </div>


              <div>

                <h3>
                  Our Address
                </h3>

                <p>
                  123 Fitness Street, Sector 15
                  <br />

                  Noida, Uttar Pradesh, India
                </p>

              </div>

            </div>


            {/* PHONE */}

            <div className="contact-info-item">

              <div className="contact-info-icon">
                <FiPhone />
              </div>


              <div>

                <h3>
                  Call Us
                </h3>


                <a href="tel:+919876543210">
                  +91 98765 43210
                </a>


                <a href="tel:+919876543211">
                  +91 98765 43211
                </a>

              </div>

            </div>


            {/* EMAIL */}

            <div className="contact-info-item">

              <div className="contact-info-icon">
                <FiMail />
              </div>


              <div>

                <h3>
                  Email Us
                </h3>


                <a
                  href="mailto:support@fitzone.com"
                >
                  support@fitzone.com
                </a>


                <a
                  href="mailto:info@fitzone.com"
                >
                  info@fitzone.com
                </a>

              </div>

            </div>


            {/* WORKING HOURS */}

            <div className="contact-info-item">

              <div className="contact-info-icon">
                <FiClock />
              </div>


              <div>

                <h3>
                  Working Hours
                </h3>

                <p>
                  Monday - Sunday
                  <br />

                  5:00 AM - 11:00 PM
                </p>

              </div>

            </div>


          </article>


          {/* =================================================
              CONTACT FORM
          ================================================= */}

          <article className="contact-form-card">


            <div className="contact-card-heading">

              <h2>
                Send Us a Message
              </h2>

              <p>
                Fill out the form and our team
                will get back to you soon.
              </p>

            </div>


            <form
              onSubmit={handleSubmit}
              noValidate
            >


              {/* =============================================
                  NAME + EMAIL
              ============================================= */}

              <div className="contact-form-row">


                {/* NAME */}

                <div className="contact-field">

                  <div
                    className={`contact-input-box ${
                      errors.name
                        ? "input-error"
                        : ""
                    }`}
                  >

                    <FiUser />


                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      autoComplete="name"
                    />

                  </div>


                  {errors.name && (
                    <span className="contact-error">
                      {errors.name}
                    </span>
                  )}

                </div>


                {/* EMAIL */}

                <div className="contact-field">

                  <div
                    className={`contact-input-box ${
                      errors.email
                        ? "input-error"
                        : ""
                    }`}
                  >

                    <FiMail />


                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="email"
                    />

                  </div>


                  {errors.email && (
                    <span className="contact-error">
                      {errors.email}
                    </span>
                  )}

                </div>


              </div>


              {/* =============================================
                  PHONE + SUBJECT
              ============================================= */}

              <div className="contact-form-row">


                {/* PHONE */}

                <div className="contact-field">

                  <div
                    className={`contact-input-box ${
                      errors.phone
                        ? "input-error"
                        : ""
                    }`}
                  >

                    <FiPhone />


                    <input
                      type="tel"
                      name="phone"
                      placeholder="10 Digit Phone Number"
                      value={formData.phone}
                      onChange={handlePhoneChange}

                      inputMode="numeric"

                      autoComplete="tel"

                      maxLength={10}
                    />

                  </div>


                  {errors.phone && (
                    <span className="contact-error">
                      {errors.phone}
                    </span>
                  )}

                </div>


                {/* SUBJECT */}

                <div className="contact-field">

                  <div
                    className={`contact-input-box ${
                      errors.subject
                        ? "input-error"
                        : ""
                    }`}
                  >

                    <FiMessageSquare />


                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                    >

                      <option value="">
                        Select Subject
                      </option>


                      <option value="Membership Enquiry">
                        Membership Enquiry
                      </option>


                      <option value="Fitness Classes">
                        Fitness Classes
                      </option>


                      <option value="Personal Trainer">
                        Personal Trainer
                      </option>


                      <option value="Gym Facilities">
                        Gym Facilities
                      </option>


                      <option value="Pricing & Plans">
                        Pricing & Plans
                      </option>


                      <option value="General Enquiry">
                        General Enquiry
                      </option>


                      <option value="Support">
                        Support
                      </option>

                    </select>

                  </div>


                  {errors.subject && (
                    <span className="contact-error">
                      {errors.subject}
                    </span>
                  )}

                </div>


              </div>


              {/* =============================================
                  MESSAGE
              ============================================= */}

              <div className="contact-field">

                <div
                  className={`contact-textarea-box ${
                    errors.message
                      ? "input-error"
                      : ""
                  }`}
                >

                  <FiMessageSquare />


                  <textarea
                    name="message"
                    placeholder="Write your message..."
                    value={formData.message}
                    onChange={handleChange}
                    maxLength={500}
                  />

                </div>


                <div className="contact-message-bottom">

                  <div>

                    {errors.message && (
                      <span className="contact-error">
                        {errors.message}
                      </span>
                    )}

                  </div>


                  <span className="contact-character-count">
                    {formData.message.length}/500
                  </span>

                </div>

              </div>


              {/* =============================================
                  SUCCESS MESSAGE
              ============================================= */}

              {success && (

                <div className="contact-success">

                  <FiCheckCircle />

                  <div>

                    <strong>
                      Message Sent Successfully!
                    </strong>

                    <span>
                      Thank you for contacting FitZone.
                      Our team will get back to you soon.
                    </span>

                  </div>

                </div>

              )}


              {/* =============================================
                  SUBMIT
              ============================================= */}

              <button
                type="submit"
                className="contact-send-btn"
              >

                Send Message

                <FiArrowRight />

              </button>


            </form>

          </article>


          {/* =================================================
              MAP
          ================================================= */}

          <article className="contact-map-card">

            <div className="contact-card-heading">

              <h2>
                Find Us on Map
              </h2>

              <p>
                Visit our gym and experience
                our fitness facilities.
              </p>

            </div>


            <div className="contact-map">

              <iframe
                title="FitZone Location"
                src="https://www.google.com/maps?q=Sector%2015%20Noida%20Uttar%20Pradesh&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

            </div>

          </article>


        </div>

      </section>


      {/* =====================================================
          BOTTOM
      ===================================================== */}

      <section className="contact-bottom-section">

        <div className="contact-container contact-bottom-grid">


          {/* BENEFITS */}

          <div className="contact-bottom-benefits">


            <div className="contact-bottom-item">

              <span>
                <FiShield />
              </span>

              <div>

                <strong>
                  Safe & Secure Environment
                </strong>

                <p>
                  Your safety is our priority
                </p>

              </div>

            </div>


            <div className="contact-bottom-item">

              <span>
                <FiUsers />
              </span>

              <div>

                <strong>
                  Professional Staff
                </strong>

                <p>
                  Always ready to assist you
                </p>

              </div>

            </div>


            <div className="contact-bottom-item">

              <span>
                <FaDumbbell />
              </span>

              <div>

                <strong>
                  Modern Facilities
                </strong>

                <p>
                  Experience premium fitness
                </p>

              </div>

            </div>


          </div>


          {/* JOIN */}

          <div className="contact-join-card">

            <div className="contact-join-overlay" />


            <div className="contact-join-content">

              <span>
                JOIN OUR FITNESS FAMILY
              </span>


              <h2>
                Start Your Fitness
                <br />

                Journey Today
              </h2>


              <button
                type="button"
                onClick={() =>
                  navigate("/join")
                }
              >

                Join Now

                <FiArrowRight />

              </button>

            </div>

          </div>


        </div>

      </section>


    </main>
  );
};


export default Contact;