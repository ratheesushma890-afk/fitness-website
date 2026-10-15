import React from "react";
import {
  FiStar,
  FiArrowUpRight,
  FiTrendingUp,
  FiCheckCircle,
} from "react-icons/fi";

import "./Testimonials.css";

const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      number: "01",
      name: "Rahul Verma",
      membership: "PRO MEMBER",
      result: "LOST 12 KG",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=700&q=90",
      review:
        "The trainers helped me stay consistent and build a routine that actually worked for me. I feel stronger, healthier and more confident.",
    },

    {
      id: 2,
      number: "02",
      name: "Ananya Sharma",
      membership: "ELITE MEMBER",
      result: "8 MONTHS STRONG",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=700&q=90",
      review:
        "I love the environment here. The workouts are challenging, the coaches are supportive and every session keeps me motivated.",
    },

    {
      id: 3,
      number: "03",
      name: "Vikram Singh",
      membership: "PRO MEMBER",
      result: "STRENGTH +40%",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=90",
      review:
        "From better technique to proper workout planning, everything feels professional. My strength and overall fitness have improved a lot.",
    },
  ];

  return (
    <section className="testimonials-section" id="reviews">
      {/* BACKGROUND WORD */}
      <div className="testimonials-bg-word" aria-hidden="true">
        RESULTS
      </div>

      <div className="testimonials-container">

        {/* =================================================
            TOP HEADING
        ================================================= */}

        <div className="testimonials-header">
          <div className="testimonials-heading">
            <div className="testimonials-label">
              <span></span>
              REAL PEOPLE. REAL RESULTS.
            </div>

            <h2>
              SUCCESS STORIES
              <span> THAT INSPIRE.</span>
            </h2>
          </div>

          <div className="testimonials-header-right">
            <p>
              Real members. Real progress. See how consistent
              training and expert support helped our community
              become stronger.
            </p>

            <div className="review-summary">
              <strong>4.9</strong>

              <div>
                <div className="summary-stars">
                  <FiStar />
                  <FiStar />
                  <FiStar />
                  <FiStar />
                  <FiStar />
                </div>

                <span>500+ Happy Members</span>
              </div>
            </div>
          </div>
        </div>

        {/* =================================================
            REVIEW CARDS
        ================================================= */}

        <div className="testimonials-grid">
          {reviews.map((review) => (
            <article
              className="testimonial-card"
              key={review.id}
            >
              {/* CARD TOP */}

              <div className="testimonial-top">
                <span className="testimonial-number">
                  {review.number}
                </span>

                <div className="testimonial-stars">
                  {[...Array(review.rating)].map((_, index) => (
                    <FiStar key={index} />
                  ))}
                </div>
              </div>

              {/* QUOTE */}

              <div className="testimonial-quote">
                “
              </div>

              {/* REVIEW */}

              <p className="testimonial-text">
                {review.review}
              </p>

              {/* RESULT */}

              <div className="testimonial-result">
                <FiTrendingUp />

                <span>
                  {review.result}
                </span>

                <FiCheckCircle className="result-check" />
              </div>

              {/* MEMBER */}

              <div className="testimonial-member">
                <div className="member-info">
                  <img
                    src={review.image}
                    alt={review.name}
                    loading="lazy"
                  />

                  <div>
                    <h3>{review.name}</h3>

                    <span>
                      {review.membership}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  className="testimonial-arrow"
                  aria-label={`View ${review.name} story`}
                >
                  <FiArrowUpRight />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* =================================================
            BOTTOM
        ================================================= */}

        <div className="testimonials-bottom">
          <span></span>

          <p>
            Your transformation could be the next success story.
          </p>

          <span></span>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;