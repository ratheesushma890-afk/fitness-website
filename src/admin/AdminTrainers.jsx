import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiArrowLeft,
  FiEdit2,
  FiEye,
  FiMail,
  FiPhone,
  FiPlus,
  FiSearch,
  FiStar,
  FiTrash2,
  FiUsers,
  FiX,
} from "react-icons/fi";

import { FaDumbbell } from "react-icons/fa";

import "./AdminTrainers.css";

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
  classes: "0",
  clients: "0",
  rating: "5.0",
  status: "Active",
};

const AdminTrainers = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [selectedTrainer, setSelectedTrainer] = useState(null);

  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState(emptyTrainer);

  const [trainers, setTrainers] = useState(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("fitzoneAdminTrainers") || "null"
      );

      if (Array.isArray(saved)) {
        return saved;
      }
    } catch {
      // ignore
    }

    return demoTrainers;
  });

  /* =========================================================
     AUTH
  ========================================================= */

  useEffect(() => {
    try {
      const admin = JSON.parse(
        localStorage.getItem("fitzoneAdmin")
      );

      if (!admin?.loggedIn) {
        navigate("/admin", {
          replace: true,
        });
      }
    } catch {
      navigate("/admin", {
        replace: true,
      });
    }
  }, [navigate]);

  /* =========================================================
     SAVE
  ========================================================= */

  useEffect(() => {
    localStorage.setItem(
      "fitzoneAdminTrainers",
      JSON.stringify(trainers)
    );
  }, [trainers]);

  /* =========================================================
     FILTER
  ========================================================= */

  const filteredTrainers = useMemo(() => {
    const value = search.trim().toLowerCase();

    return trainers.filter((trainer) => {
      const matchesSearch =
        !value ||
        trainer.name?.toLowerCase().includes(value) ||
        trainer.specialty?.toLowerCase().includes(value) ||
        trainer.email?.toLowerCase().includes(value) ||
        trainer.id?.toLowerCase().includes(value);

      const matchesStatus =
        statusFilter === "All" ||
        trainer.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [trainers, search, statusFilter]);

  /* =========================================================
     COUNTS
  ========================================================= */

  const activeTrainers = trainers.filter(
    (trainer) => trainer.status === "Active"
  ).length;

  const totalClients = trainers.reduce(
    (total, trainer) =>
      total + Number(trainer.clients || 0),
    0
  );

  const totalClasses = trainers.reduce(
    (total, trainer) =>
      total + Number(trainer.classes || 0),
    0
  );

  /* =========================================================
     FORM
  ========================================================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const openAddTrainer = () => {
    setEditingId(null);
    setForm(emptyTrainer);
    setFormOpen(true);
  };

  const openEditTrainer = (trainer) => {
    setEditingId(trainer.id);

    setForm({
      name: trainer.name,
      specialty: trainer.specialty,
      experience: trainer.experience,
      email: trainer.email,
      phone: trainer.phone,
      classes: String(trainer.classes),
      clients: String(trainer.clients),
      rating: String(trainer.rating),
      status: trainer.status,
    });

    setFormOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.name.trim() ||
      !form.specialty.trim() ||
      !form.email.trim()
    ) {
      window.alert(
        "Please enter trainer name, specialty and email."
      );
      return;
    }

    const trainerData = {
      ...form,
      classes: Number(form.classes) || 0,
      clients: Number(form.clients) || 0,
    };

    if (editingId) {
      setTrainers((previous) =>
        previous.map((trainer) =>
          trainer.id === editingId
            ? {
                ...trainer,
                ...trainerData,
              }
            : trainer
        )
      );
    } else {
      setTrainers((previous) => [
        {
          id: `TRN-${Date.now().toString().slice(-5)}`,
          ...trainerData,
        },
        ...previous,
      ]);
    }

    setFormOpen(false);
    setEditingId(null);
    setForm(emptyTrainer);
  };

  /* =========================================================
     DELETE
  ========================================================= */

  const deleteTrainer = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this trainer?"
    );

    if (!confirmed) return;

    setTrainers((previous) =>
      previous.filter((trainer) => trainer.id !== id)
    );

    if (selectedTrainer?.id === id) {
      setSelectedTrainer(null);
    }
  };

  return (
    <main className="admin-trainers-page">

      {/* HEADER */}

      <header className="admin-trainers-header">

        <div className="admin-trainers-title">

          <button
            type="button"
            className="admin-trainers-back"
            onClick={() =>
              navigate("/admin/dashboard")
            }
          >
            <FiArrowLeft />
          </button>

          <div>
            <span>FITZONE ADMIN</span>

            <h1>
              Manage <strong>Trainers</strong>
            </h1>

            <p>
              Manage FITZONE trainers, clients and coaching details.
            </p>
          </div>

        </div>

        <button
          type="button"
          className="admin-trainers-add"
          onClick={openAddTrainer}
        >
          <FiPlus />
          Add Trainer
        </button>

      </header>


      {/* STATS */}

      <section className="admin-trainers-stats">

        <article>
          <div>
            <FaDumbbell />
          </div>

          <span>Total Trainers</span>
          <strong>{trainers.length}</strong>
          <p>FITZONE coaching team</p>
        </article>

        <article>
          <div>
            <FiUsers />
          </div>

          <span>Active Trainers</span>
          <strong>{activeTrainers}</strong>
          <p>Currently available</p>
        </article>

        <article>
          <div>
            <FiUsers />
          </div>

          <span>Total Clients</span>
          <strong>{totalClients}</strong>
          <p>Assigned members</p>
        </article>

        <article>
          <div>
            <FiStar />
          </div>

          <span>Classes Managed</span>
          <strong>{totalClasses}</strong>
          <p>Trainer-led classes</p>
        </article>

      </section>


      {/* PANEL */}

      <section className="admin-trainers-panel">

        <div className="admin-trainers-panel-head">

          <div>
            <span>TRAINER DIRECTORY</span>
            <h2>All Trainers</h2>
          </div>

          <div className="admin-trainers-tools">

            <div className="admin-trainers-search">
              <FiSearch />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search trainer..."
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="On Leave">On Leave</option>
              <option value="Inactive">Inactive</option>
            </select>

          </div>

        </div>


        {/* TABLE */}

        <div className="admin-trainers-table-wrap">

          <table className="admin-trainers-table">

            <thead>
              <tr>
                <th>Trainer</th>
                <th>Contact</th>
                <th>Experience</th>
                <th>Classes</th>
                <th>Clients</th>
                <th>Rating</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredTrainers.map((trainer) => (

                <tr key={trainer.id}>

                  <td>
                    <div className="admin-trainer-user">

                      <span>
                        {trainer.name
                          ?.charAt(0)
                          .toUpperCase()}
                      </span>

                      <div>
                        <strong>{trainer.name}</strong>

                        <small>
                          {trainer.specialty}
                        </small>

                        <small>{trainer.id}</small>
                      </div>

                    </div>
                  </td>


                  <td>
                    <div className="admin-trainer-contact">

                      <span>
                        <FiMail />
                        {trainer.email}
                      </span>

                      <span>
                        <FiPhone />
                        {trainer.phone}
                      </span>

                    </div>
                  </td>


                  <td>
                    {trainer.experience}
                  </td>


                  <td>
                    <strong>
                      {trainer.classes}
                    </strong>
                  </td>


                  <td>
                    <strong>
                      {trainer.clients}
                    </strong>
                  </td>


                  <td>
                    <div className="admin-trainer-rating">
                      <FiStar />
                      {trainer.rating}
                    </div>
                  </td>


                  <td>
                    <span
                      className={`admin-trainer-status ${trainer.status
                        ?.toLowerCase()
                        .replaceAll(" ", "-")}`}
                    >
                      {trainer.status}
                    </span>
                  </td>


                  <td>
                    <div className="admin-trainer-actions">

                      <button
                        type="button"
                        title="View"
                        onClick={() =>
                          setSelectedTrainer(trainer)
                        }
                      >
                        <FiEye />
                      </button>

                      <button
                        type="button"
                        title="Edit"
                        onClick={() =>
                          openEditTrainer(trainer)
                        }
                      >
                        <FiEdit2 />
                      </button>

                      <button
                        type="button"
                        className="delete"
                        title="Delete"
                        onClick={() =>
                          deleteTrainer(trainer.id)
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


          {filteredTrainers.length === 0 && (
            <div className="admin-trainers-empty">

              <FaDumbbell />

              <strong>No trainers found</strong>

              <p>
                Try changing the search or status filter.
              </p>

            </div>
          )}

        </div>

      </section>


      {/* VIEW TRAINER */}

      {selectedTrainer && (

        <div
          className="admin-trainer-modal-backdrop"
          onClick={() =>
            setSelectedTrainer(null)
          }
        >

          <div
            className="admin-trainer-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              type="button"
              className="admin-trainer-modal-close"
              onClick={() =>
                setSelectedTrainer(null)
              }
            >
              <FiX />
            </button>

            <div className="admin-trainer-modal-avatar">
              {selectedTrainer.name
                ?.charAt(0)
                .toUpperCase()}
            </div>

            <span>TRAINER PROFILE</span>

            <h2>{selectedTrainer.name}</h2>

            <p>{selectedTrainer.specialty}</p>


            <div className="admin-trainer-modal-grid">

              <div>
                <small>Experience</small>
                <strong>
                  {selectedTrainer.experience}
                </strong>
              </div>

              <div>
                <small>Rating</small>
                <strong>
                  {selectedTrainer.rating}
                </strong>
              </div>

              <div>
                <small>Email</small>
                <strong>
                  {selectedTrainer.email}
                </strong>
              </div>

              <div>
                <small>Phone</small>
                <strong>
                  {selectedTrainer.phone}
                </strong>
              </div>

              <div>
                <small>Classes</small>
                <strong>
                  {selectedTrainer.classes}
                </strong>
              </div>

              <div>
                <small>Clients</small>
                <strong>
                  {selectedTrainer.clients}
                </strong>
              </div>

              <div>
                <small>Status</small>
                <strong>
                  {selectedTrainer.status}
                </strong>
              </div>

            </div>

          </div>

        </div>
      )}


      {/* ADD / EDIT */}

      {formOpen && (

        <div
          className="admin-trainer-modal-backdrop"
          onClick={() => setFormOpen(false)}
        >

          <form
            className="admin-trainer-form-modal"
            onSubmit={handleSubmit}
            onClick={(e) => e.stopPropagation()}
          >

            <button
              type="button"
              className="admin-trainer-modal-close"
              onClick={() => setFormOpen(false)}
            >
              <FiX />
            </button>

            <span>
              {editingId
                ? "EDIT TRAINER"
                : "NEW TRAINER"}
            </span>

            <h2>
              {editingId
                ? "Update Trainer"
                : "Add New Trainer"}
            </h2>

            <div className="admin-trainer-form-grid">

              <label>
                <span>Trainer Name</span>

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Trainer name"
                />
              </label>

              <label>
                <span>Specialty</span>

                <input
                  type="text"
                  name="specialty"
                  value={form.specialty}
                  onChange={handleChange}
                  placeholder="Strength Coach"
                />
              </label>

              <label>
                <span>Experience</span>

                <input
                  type="text"
                  name="experience"
                  value={form.experience}
                  onChange={handleChange}
                  placeholder="5+ Years"
                />
              </label>

              <label>
                <span>Email</span>

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="trainer@fitzone.com"
                />
              </label>

              <label>
                <span>Phone</span>

                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91..."
                />
              </label>

              <label>
                <span>Classes</span>

                <input
                  type="number"
                  min="0"
                  name="classes"
                  value={form.classes}
                  onChange={handleChange}
                />
              </label>

              <label>
                <span>Clients</span>

                <input
                  type="number"
                  min="0"
                  name="clients"
                  value={form.clients}
                  onChange={handleChange}
                />
              </label>

              <label>
                <span>Rating</span>

                <input
                  type="number"
                  min="1"
                  max="5"
                  step="0.1"
                  name="rating"
                  value={form.rating}
                  onChange={handleChange}
                />
              </label>

              <label>
                <span>Status</span>

                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option>Active</option>
                  <option>On Leave</option>
                  <option>Inactive</option>
                </select>
              </label>

            </div>

            <button
              type="submit"
              className="admin-trainer-save"
            >
              {editingId
                ? "SAVE CHANGES"
                : "ADD TRAINER"}
            </button>

          </form>

        </div>
      )}

    </main>
  );
};

export default AdminTrainers;