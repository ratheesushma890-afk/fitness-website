import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiArrowLeft,
  FiEdit2,
  FiEye,
  FiPlus,
  FiSearch,
  FiTrash2,
  FiUsers,
  FiX,
} from "react-icons/fi";

import { FaDumbbell } from "react-icons/fa";

import "./ManagerTrainers.css";

const demoTrainers = [
  {
    id: "TRN-101",
    name: "Arjun Sharma",
    specialty: "Strength Coach",
    experience: "7+ Years",
    email: "arjun@fitzone.com",
    phone: "+91 98765 43210",
    classes: 4,
    clients: 48,
    rating: "4.9",
    status: "Active",
  },
  {
    id: "TRN-102",
    name: "Riya Mehta",
    specialty: "Yoga & Mobility Coach",
    experience: "5+ Years",
    email: "riya@fitzone.com",
    phone: "+91 98111 22334",
    classes: 3,
    clients: 36,
    rating: "4.8",
    status: "Active",
  },
  {
    id: "TRN-103",
    name: "Kabir Singh",
    specialty: "Cardio & HIIT Coach",
    experience: "6+ Years",
    email: "kabir@fitzone.com",
    phone: "+91 98989 11223",
    classes: 5,
    clients: 52,
    rating: "4.9",
    status: "Active",
  },
];

const emptyTrainer = {
  name: "",
  specialty: "",
  experience: "",
  email: "",
  phone: "",
  classes: "",
  clients: "",
  rating: "",
  status: "Active",
};

const ManagerTrainers = () => {
  const navigate = useNavigate();

  const [trainers, setTrainers] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const [modal, setModal] = useState("");
  const [form, setForm] = useState(emptyTrainer);

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
          "fitzoneAdminTrainers"
        ) || "null"
      );

      setTrainers(
        Array.isArray(saved) && saved.length
          ? saved
          : demoTrainers
      );
    } catch {
      setTrainers(demoTrainers);
    }
  }, [navigate]);

  useEffect(() => {
    if (trainers.length) {
      localStorage.setItem(
        "fitzoneAdminTrainers",
        JSON.stringify(trainers)
      );
    }
  }, [trainers]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();

    return trainers.filter((item) => {
      const match =
        item.name.toLowerCase().includes(q) ||
        item.specialty.toLowerCase().includes(q) ||
        item.email.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q);

      return (
        match &&
        (filter === "All" ||
          item.status === filter)
      );
    });
  }, [trainers, search, filter]);

  const saveTrainer = (e) => {
    e.preventDefault();

    if (!form.name || !form.specialty) {
      alert("Name and specialty are required.");
      return;
    }

    if (selected) {
      setTrainers((prev) =>
        prev.map((item) =>
          item.id === selected.id
            ? {
                ...form,
                id: selected.id,
              }
            : item
        )
      );
    } else {
      setTrainers((prev) => [
        ...prev,
        {
          ...form,
          id: `TRN-${Date.now()
            .toString()
            .slice(-4)}`,
        },
      ]);
    }

    setModal("");
  };

  const deleteTrainer = (id) => {
    if (!window.confirm("Delete this trainer?")) {
      return;
    }

    setTrainers((prev) =>
      prev.filter((item) => item.id !== id)
    );
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
            <span>MANAGER / TRAINERS</span>
            <h1>
              Manage <strong>Trainers</strong>
            </h1>
          </div>
        </div>

        <button
          className="manager-primary-btn"
          onClick={() => {
            setSelected(null);
            setForm(emptyTrainer);
            setModal("form");
          }}
        >
          <FiPlus />
          Add Trainer
        </button>

      </header>

      <section className="manager-page-stats">

        <article>
          <FaDumbbell />
          <div>
            <span>Total Trainers</span>
            <strong>{trainers.length}</strong>
          </div>
        </article>

        <article>
          <FaDumbbell />
          <div>
            <span>Active Trainers</span>
            <strong>
              {
                trainers.filter(
                  (item) =>
                    item.status === "Active"
                ).length
              }
            </strong>
          </div>
        </article>

        <article>
          <FiUsers />
          <div>
            <span>Total Clients</span>
            <strong>
              {trainers.reduce(
                (sum, item) =>
                  sum + Number(item.clients || 0),
                0
              )}
            </strong>
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
              placeholder="Search trainers..."
            />
          </div>

          <select
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value)
            }
          >
            <option>All</option>
            <option>Active</option>
            <option>On Leave</option>
            <option>Inactive</option>
          </select>

        </div>

        <div className="manager-table-wrap">

          <table className="manager-table">

            <thead>
              <tr>
                <th>Trainer</th>
                <th>Specialty</th>
                <th>Experience</th>
                <th>Classes</th>
                <th>Clients</th>
                <th>Rating</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {filtered.map((item) => (
                <tr key={item.id}>

                  <td>
                    <strong>{item.name}</strong>
                    <small>{item.email}</small>
                  </td>

                  <td>{item.specialty}</td>
                  <td>{item.experience}</td>
                  <td>{item.classes}</td>
                  <td>{item.clients}</td>
                  <td>⭐ {item.rating}</td>

                  <td>
                    <span
                      className={`manager-status ${item.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td>
                    <div className="manager-actions">

                      <button
                        onClick={() => {
                          setSelected(item);
                          setModal("view");
                        }}
                      >
                        <FiEye />
                      </button>

                      <button
                        onClick={() => {
                          setSelected(item);
                          setForm(item);
                          setModal("form");
                        }}
                      >
                        <FiEdit2 />
                      </button>

                      <button
                        className="danger"
                        onClick={() =>
                          deleteTrainer(item.id)
                        }
                      >
                        <FiTrash2 />
                      </button>

                    </div>
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </section>

      {modal === "form" && (
        <div className="manager-modal-backdrop">

          <form
            className="manager-modal manager-form-modal"
            onSubmit={saveTrainer}
          >

            <button
              type="button"
              className="manager-modal-close"
              onClick={() => setModal("")}
            >
              <FiX />
            </button>

            <span>
              {selected
                ? "EDIT TRAINER"
                : "NEW TRAINER"}
            </span>

            <h2>
              {selected
                ? "Update Trainer"
                : "Add Trainer"}
            </h2>

            <div className="manager-form-grid">

              {[
                ["name", "Trainer Name"],
                ["specialty", "Specialty"],
                ["experience", "Experience"],
                ["email", "Email"],
                ["phone", "Phone"],
                ["classes", "Classes"],
                ["clients", "Clients"],
                ["rating", "Rating"],
              ].map(([name, label]) => (
                <label key={name}>
                  {label}

                  <input
                    value={form[name]}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        [name]: e.target.value,
                      })
                    }
                  />
                </label>
              ))}

              <label>
                Status

                <select
                  value={form.status}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      status: e.target.value,
                    })
                  }
                >
                  <option>Active</option>
                  <option>On Leave</option>
                  <option>Inactive</option>
                </select>
              </label>

            </div>

            <button className="manager-save-btn">
              Save Trainer
            </button>

          </form>

        </div>
      )}

      {modal === "view" && selected && (
        <div className="manager-modal-backdrop">

          <div className="manager-modal">

            <button
              className="manager-modal-close"
              onClick={() => setModal("")}
            >
              <FiX />
            </button>

            <span>TRAINER DETAILS</span>
            <h2>{selected.name}</h2>

            <div className="manager-detail-list">
              <p><strong>Specialty</strong>{selected.specialty}</p>
              <p><strong>Experience</strong>{selected.experience}</p>
              <p><strong>Email</strong>{selected.email}</p>
              <p><strong>Phone</strong>{selected.phone}</p>
              <p><strong>Clients</strong>{selected.clients}</p>
              <p><strong>Rating</strong>{selected.rating}</p>
            </div>

          </div>

        </div>
      )}

    </main>
  );
};

export default ManagerTrainers;