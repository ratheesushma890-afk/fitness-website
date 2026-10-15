import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiArrowLeft,
  FiCheckCircle,
  FiInbox,
  FiMail,
  FiMessageSquare,
  FiSearch,
  FiTrash2,
  FiUser,
  FiX,
} from "react-icons/fi";

import "./AdminMessages.css";

/* =========================================================
   DEMO MESSAGES
========================================================= */

const demoMessages = [
  {
    id: "MSG-101",
    name: "Aarav Sharma",
    email: "aarav@gmail.com",
    subject: "Membership Plan Query",
    message:
      "Hi FITZONE, I want to know more about the Pro membership plan and personal training classes.",
    date: "10 Oct 2026",
    time: "10:30 AM",
    status: "Unread",
  },

  {
    id: "MSG-102",
    name: "Priya Verma",
    email: "priya@gmail.com",
    subject: "Yoga Class Timing",
    message:
      "Can you please confirm the morning timing for Yoga & Flexibility classes?",
    date: "09 Oct 2026",
    time: "04:15 PM",
    status: "Read",
  },

  {
    id: "MSG-103",
    name: "Rahul Singh",
    email: "rahul@gmail.com",
    subject: "Payment Confirmation",
    message:
      "I completed my membership payment. Please confirm whether my membership is active.",
    date: "08 Oct 2026",
    time: "01:20 PM",
    status: "Unread",
  },

  {
    id: "MSG-104",
    name: "Neha Mehta",
    email: "neha@gmail.com",
    subject: "Personal Trainer",
    message:
      "I am interested in strength training. Please suggest a suitable personal trainer.",
    date: "07 Oct 2026",
    time: "06:40 PM",
    status: "Read",
  },
];


/* =========================================================
   ADMIN MESSAGES
========================================================= */

const AdminMessages = () => {
  const navigate = useNavigate();

  /* =========================================================
     STATES
  ========================================================= */

  const [messages, setMessages] = useState(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("fitzoneAdminMessages") || "null"
      );

      if (Array.isArray(saved)) {
        return saved;
      }
    } catch (error) {
      console.log("Messages load error:", error);
    }

    return demoMessages;
  });

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("All");

  const [selectedMessage, setSelectedMessage] =
    useState(null);


  /* =========================================================
     ADMIN AUTH CHECK
  ========================================================= */

  useEffect(() => {
    try {
      const admin = JSON.parse(
        localStorage.getItem("fitzoneAdmin") || "null"
      );

      if (!admin?.loggedIn) {
        navigate("/admin", {
          replace: true,
        });
      }
    } catch (error) {
      navigate("/admin", {
        replace: true,
      });
    }
  }, [navigate]);


  /* =========================================================
     SAVE MESSAGES
  ========================================================= */

  useEffect(() => {
    localStorage.setItem(
      "fitzoneAdminMessages",
      JSON.stringify(messages)
    );
  }, [messages]);


  /* =========================================================
     MESSAGE COUNTS
  ========================================================= */

  const unreadCount = messages.filter(
    (item) => item.status === "Unread"
  ).length;

  const readCount = messages.filter(
    (item) => item.status === "Read"
  ).length;


  /* =========================================================
     SEARCH + FILTER
  ========================================================= */

  const filteredMessages = useMemo(() => {
    const value = search
      .trim()
      .toLowerCase();

    return messages.filter((item) => {
      const matchesSearch =
        !value ||
        item.name
          ?.toLowerCase()
          .includes(value) ||
        item.email
          ?.toLowerCase()
          .includes(value) ||
        item.subject
          ?.toLowerCase()
          .includes(value) ||
        item.message
          ?.toLowerCase()
          .includes(value);

      const matchesFilter =
        filter === "All" ||
        item.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [messages, search, filter]);


  /* =========================================================
     OPEN MESSAGE
  ========================================================= */

  const openMessage = (message) => {
    const updatedMessage = {
      ...message,
      status: "Read",
    };

    setMessages((previous) =>
      previous.map((item) =>
        item.id === message.id
          ? updatedMessage
          : item
      )
    );

    setSelectedMessage(updatedMessage);
  };


  /* =========================================================
     MARK READ / UNREAD
  ========================================================= */

  const toggleReadStatus = (id) => {
    setMessages((previous) =>
      previous.map((item) => {
        if (item.id !== id) {
          return item;
        }

        return {
          ...item,

          status:
            item.status === "Read"
              ? "Unread"
              : "Read",
        };
      })
    );


    setSelectedMessage((previous) => {
      if (!previous) {
        return previous;
      }

      if (previous.id !== id) {
        return previous;
      }

      return {
        ...previous,

        status:
          previous.status === "Read"
            ? "Unread"
            : "Read",
      };
    });
  };


  /* =========================================================
     DELETE MESSAGE
  ========================================================= */

  const deleteMessage = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this message?"
    );

    if (!confirmed) {
      return;
    }

    setMessages((previous) =>
      previous.filter(
        (item) => item.id !== id
      )
    );

    if (selectedMessage?.id === id) {
      setSelectedMessage(null);
    }
  };


  /* =========================================================
     GO BACK
  ========================================================= */

  const goBack = () => {
    navigate("/admin/dashboard");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  /* =========================================================
     JSX
  ========================================================= */

  return (
    <main className="admin-messages-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="admin-messages-header">

        <div className="admin-messages-title">

          <button
            type="button"
            className="admin-messages-back"
            onClick={goBack}
            aria-label="Back to dashboard"
          >
            <FiArrowLeft />
          </button>


          <div>

            <span>
              FITZONE ADMIN
            </span>

            <h1>
              Manage{" "}
              <strong>
                Messages
              </strong>
            </h1>

            <p>
              View and manage customer enquiries
              and messages.
            </p>

          </div>

        </div>

      </header>


      {/* =====================================================
          STATS
      ===================================================== */}

      <section className="admin-messages-stats">

        {/* TOTAL */}

        <article>

          <div>
            <FiMessageSquare />
          </div>

          <span>
            Total Messages
          </span>

          <strong>
            {messages.length}
          </strong>

          <p>
            All customer enquiries
          </p>

        </article>


        {/* UNREAD */}

        <article>

          <div>
            <FiMail />
          </div>

          <span>
            Unread Messages
          </span>

          <strong>
            {unreadCount}
          </strong>

          <p>
            Need your attention
          </p>

        </article>


        {/* READ */}

        <article>

          <div>
            <FiInbox />
          </div>

          <span>
            Read Messages
          </span>

          <strong>
            {readCount}
          </strong>

          <p>
            Already reviewed
          </p>

        </article>

      </section>


      {/* =====================================================
          MESSAGES PANEL
      ===================================================== */}

      <section className="admin-messages-panel">

        {/* PANEL HEADER */}

        <div className="admin-messages-panel-head">

          <div>

            <span>
              INBOX
            </span>

            <h2>
              Customer Messages
            </h2>

          </div>


          {/* SEARCH + FILTER */}

          <div className="admin-messages-tools">

            <div className="admin-messages-search">

              <FiSearch />

              <input
                type="text"
                placeholder="Search message..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

            </div>


            <select
              value={filter}
              onChange={(e) =>
                setFilter(e.target.value)
              }
            >

              <option value="All">
                All Messages
              </option>

              <option value="Unread">
                Unread
              </option>

              <option value="Read">
                Read
              </option>

            </select>

          </div>

        </div>


        {/* ===================================================
            MESSAGE LIST
        =================================================== */}

        <div className="admin-messages-list">

          {filteredMessages.map((item) => (

            <article
              key={item.id}
              className={`admin-message-row ${
                item.status === "Unread"
                  ? "unread"
                  : ""
              }`}
              onClick={() =>
                openMessage(item)
              }
            >

              {/* AVATAR */}

              <div className="admin-message-avatar">

                {item.name
                  ?.charAt(0)
                  .toUpperCase()}

              </div>


              {/* MESSAGE INFORMATION */}

              <div className="admin-message-info">

                <div className="admin-message-name-row">

                  <div>

                    <strong>
                      {item.name}
                    </strong>

                    <span>
                      {item.email}
                    </span>

                  </div>


                  <small>
                    {item.date}
                    {" • "}
                    {item.time}
                  </small>

                </div>


                <h3>
                  {item.subject}
                </h3>


                <p>
                  {item.message}
                </p>

              </div>


              {/* ACTIONS */}

              <div
                className="admin-message-actions"
                onClick={(e) =>
                  e.stopPropagation()
                }
              >

                {/* READ / UNREAD */}

                <button
                  type="button"
                  title={
                    item.status === "Read"
                      ? "Mark as unread"
                      : "Mark as read"
                  }
                  onClick={() =>
                    toggleReadStatus(
                      item.id
                    )
                  }
                >

                  {item.status === "Read" ? (
                    <FiMail />
                  ) : (
                    <FiCheckCircle />
                  )}

                </button>


                {/* DELETE */}

                <button
                  type="button"
                  className="delete"
                  title="Delete message"
                  onClick={() =>
                    deleteMessage(
                      item.id
                    )
                  }
                >

                  <FiTrash2 />

                </button>

              </div>

            </article>

          ))}


          {/* NO RESULT */}

          {filteredMessages.length === 0 && (

            <div className="admin-messages-empty">

              <FiMail />

              <strong>
                No messages found
              </strong>

              <p>
                There are no messages
                matching your search.
              </p>

            </div>

          )}

        </div>

      </section>


      {/* =====================================================
          MESSAGE DETAIL MODAL
      ===================================================== */}

      {selectedMessage && (

        <div
          className="admin-message-modal-backdrop"
          onClick={() =>
            setSelectedMessage(null)
          }
        >

          <div
            className="admin-message-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* CLOSE */}

            <button
              type="button"
              className="admin-message-modal-close"
              onClick={() =>
                setSelectedMessage(null)
              }
              aria-label="Close message"
            >
              <FiX />
            </button>


            {/* ICON */}

            <div className="admin-message-modal-icon">
              <FiInbox />
            </div>


            <span>
              CUSTOMER MESSAGE
            </span>


            <h2>
              {selectedMessage.subject}
            </h2>


            {/* CUSTOMER */}

            <div className="admin-message-customer">

              <div>
                <FiUser />
              </div>


              <span>

                <strong>
                  {selectedMessage.name}
                </strong>

                <small>
                  {selectedMessage.email}
                </small>

              </span>

            </div>


            {/* FULL MESSAGE */}

            <div className="admin-message-full-text">

              <p>
                {selectedMessage.message}
              </p>

            </div>


            {/* MESSAGE META */}

            <div className="admin-message-meta">

              <span>

                <small>
                  Date
                </small>

                <strong>
                  {selectedMessage.date}
                </strong>

              </span>


              <span>

                <small>
                  Time
                </small>

                <strong>
                  {selectedMessage.time}
                </strong>

              </span>


              <span>

                <small>
                  Status
                </small>

                <strong>
                  {selectedMessage.status}
                </strong>

              </span>

            </div>


            {/* MODAL ACTIONS */}

            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "16px",
              }}
            >

              <button
                type="button"
                onClick={() =>
                  toggleReadStatus(
                    selectedMessage.id
                  )
                }
                style={{
                  flex: 1,
                  minHeight: "46px",
                  border: "0",
                  borderRadius: "8px",
                  background:
                    "linear-gradient(135deg, #19b9ff, #0871ef)",
                  color: "#ffffff",
                  fontWeight: "800",
                  cursor: "pointer",
                }}
              >

                {selectedMessage.status === "Read"
                  ? "MARK AS UNREAD"
                  : "MARK AS READ"}

              </button>


              <button
                type="button"
                onClick={() =>
                  deleteMessage(
                    selectedMessage.id
                  )
                }
                style={{
                  minWidth: "110px",
                  minHeight: "46px",
                  border:
                    "1px solid rgba(255, 95, 110, 0.2)",
                  borderRadius: "8px",
                  background:
                    "rgba(255, 75, 94, 0.07)",
                  color: "#ff8491",
                  fontWeight: "800",
                  cursor: "pointer",
                }}
              >

                DELETE

              </button>

            </div>

          </div>

        </div>

      )}

    </main>
  );
};

export default AdminMessages;