import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiArrowLeft,
  FiCheckCircle,
  FiInbox,
  FiMail,
  FiSearch,
  FiTrash2,
  FiX,
} from "react-icons/fi";

import "./ManagerMessages.css";

const demoMessages = [
  {
    id: "MSG-101",
    name: "Aarav",
    email: "aarav@gmail.com",
    subject: "Membership Plan Query",
    message:
      "I want more information about the Pro membership plan.",
    status: "Unread",
  },
  {
    id: "MSG-102",
    name: "Priya",
    email: "priya@gmail.com",
    subject: "Yoga Class Timing",
    message:
      "Please tell me the morning Yoga class timing.",
    status: "Read",
  },
  {
    id: "MSG-103",
    name: "Rahul",
    email: "rahul@gmail.com",
    subject: "Payment Confirmation",
    message:
      "I completed my payment. Please confirm my membership.",
    status: "Unread",
  },
  {
    id: "MSG-104",
    name: "Neha",
    email: "neha@gmail.com",
    subject: "Personal Trainer",
    message:
      "I want to know about personal trainer availability.",
    status: "Read",
  },
];

const ManagerMessages = () => {
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    try {
      const admin = JSON.parse(
        localStorage.getItem("fitzoneAdmin") || "null"
      );

      if (!admin?.loggedIn) {
        navigate("/admin", { replace: true });
        return;
      }

      if (admin.role !== "manager") {
        navigate("/admin/dashboard", {
          replace: true,
        });
        return;
      }

      const saved = JSON.parse(
        localStorage.getItem(
          "fitzoneAdminMessages"
        ) || "null"
      );

      setMessages(
        Array.isArray(saved) && saved.length
          ? saved
          : demoMessages
      );
    } catch {
      setMessages(demoMessages);
    }
  }, [navigate]);

  useEffect(() => {
    if (messages.length) {
      localStorage.setItem(
        "fitzoneAdminMessages",
        JSON.stringify(messages)
      );
    }
  }, [messages]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();

    return messages.filter((item) => {
      const match =
        item.name.toLowerCase().includes(q) ||
        item.email.toLowerCase().includes(q) ||
        item.subject.toLowerCase().includes(q) ||
        item.message.toLowerCase().includes(q);

      return (
        match &&
        (filter === "All" ||
          item.status === filter)
      );
    });
  }, [messages, search, filter]);

  const unread = messages.filter(
    (item) => item.status === "Unread"
  ).length;

  const read = messages.filter(
    (item) => item.status === "Read"
  ).length;

  const openMessage = (message) => {
    setMessages((prev) =>
      prev.map((item) =>
        item.id === message.id
          ? {
              ...item,
              status: "Read",
            }
          : item
      )
    );

    setSelected({
      ...message,
      status: "Read",
    });
  };

  const toggleStatus = (id) => {
    setMessages((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status:
                item.status === "Read"
                  ? "Unread"
                  : "Read",
            }
          : item
      )
    );

    setSelected((prev) =>
      prev
        ? {
            ...prev,
            status:
              prev.status === "Read"
                ? "Unread"
                : "Read",
          }
        : prev
    );
  };

  const deleteMessage = (id) => {
    if (!window.confirm("Delete this message?")) {
      return;
    }

    setMessages((prev) =>
      prev.filter((item) => item.id !== id)
    );

    if (selected?.id === id) {
      setSelected(null);
    }
  };

  return (
    <main className="manager-page">

      <header className="manager-page-header">

        <div>
          <button
            className="manager-back-btn"
            onClick={() =>
              navigate("/admin/manager-dashboard")
            }
          >
            <FiArrowLeft />
          </button>

          <div>
            <span>MANAGER / MESSAGES</span>

            <h1>
              Customer <strong>Messages</strong>
            </h1>
          </div>
        </div>

      </header>

      <section className="manager-page-stats">

        <article>
          <FiMail />
          <div>
            <span>Total Messages</span>
            <strong>{messages.length}</strong>
          </div>
        </article>

        <article>
          <FiInbox />
          <div>
            <span>Unread</span>
            <strong>{unread}</strong>
          </div>
        </article>

        <article>
          <FiCheckCircle />
          <div>
            <span>Read</span>
            <strong>{read}</strong>
          </div>
        </article>

      </section>

      <section className="manager-table-panel">

        <div className="manager-toolbar">

          <div className="manager-search">
            <FiSearch />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search messages..."
            />
          </div>

          <select
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value)
            }
          >
            <option>All</option>
            <option>Unread</option>
            <option>Read</option>
          </select>

        </div>

        <div className="manager-message-list">

          {filtered.map((message) => (

            <article
              key={message.id}
              className={
                message.status === "Unread"
                  ? "unread"
                  : ""
              }
            >

              <button
                className="manager-message-main"
                onClick={() =>
                  openMessage(message)
                }
              >

                <span className="manager-message-avatar">
                  {message.name.charAt(0)}
                </span>

                <div>
                  <strong>
                    {message.name}
                  </strong>

                  <small>
                    {message.email}
                  </small>
                </div>

                <div className="manager-message-subject">
                  <strong>
                    {message.subject}
                  </strong>

                  <p>
                    {message.message}
                  </p>
                </div>

                <span
                  className={`manager-status ${message.status.toLowerCase()}`}
                >
                  {message.status}
                </span>

              </button>

              <button
                className="manager-message-delete"
                onClick={() =>
                  deleteMessage(message.id)
                }
              >
                <FiTrash2 />
              </button>

            </article>

          ))}

        </div>

      </section>

      {selected && (
        <div className="manager-modal-backdrop">

          <div className="manager-modal">

            <button
              className="manager-modal-close"
              onClick={() => setSelected(null)}
            >
              <FiX />
            </button>

            <span>CUSTOMER MESSAGE</span>

            <h2>{selected.subject}</h2>

            <div className="manager-message-detail">
              <strong>{selected.name}</strong>
              <small>{selected.email}</small>

              <p>{selected.message}</p>
            </div>

            <div className="manager-modal-actions">

              <button
                onClick={() =>
                  toggleStatus(selected.id)
                }
              >
                <FiCheckCircle />

                Mark{" "}
                {selected.status === "Read"
                  ? "Unread"
                  : "Read"}
              </button>

              <button
                className="danger"
                onClick={() =>
                  deleteMessage(selected.id)
                }
              >
                <FiTrash2 />
                Delete
              </button>

            </div>

          </div>

        </div>
      )}

    </main>
  );
};

export default ManagerMessages;