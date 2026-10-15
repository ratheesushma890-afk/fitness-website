import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiArrowLeft,
  FiCalendar,
  FiClock,
  FiEdit2,
  FiEye,
  FiPlus,
  FiSearch,
  FiTrash2,
  FiUsers,
  FiX,
} from "react-icons/fi";

import { FaDumbbell } from "react-icons/fa";

import "./AdminClasses.css";

const demoClasses = [
  {
    id: "CLS-101",
    name: "Strength Training",
    trainer: "Arjun Sharma",
    category: "Strength",
    schedule: "Mon, Wed, Fri",
    time: "07:00 AM",
    duration: "60 Min",
    capacity: 20,
    enrolled: 16,
    level: "Intermediate",
    status: "Active",
  },
  {
    id: "CLS-102",
    name: "Yoga & Flexibility",
    trainer: "Riya Mehta",
    category: "Yoga",
    schedule: "Tue, Thu, Sat",
    time: "08:00 AM",
    duration: "50 Min",
    capacity: 18,
    enrolled: 12,
    level: "Beginner",
    status: "Active",
  },
  {
    id: "CLS-103",
    name: "HIIT Workout",
    trainer: "Kabir Singh",
    category: "HIIT",
    schedule: "Mon, Wed, Sat",
    time: "06:00 PM",
    duration: "45 Min",
    capacity: 15,
    enrolled: 15,
    level: "Advanced",
    status: "Full",
  },
  {
    id: "CLS-104",
    name: "Cardio Blast",
    trainer: "Kabir Singh",
    category: "Cardio",
    schedule: "Tue, Thu",
    time: "07:00 PM",
    duration: "45 Min",
    capacity: 20,
    enrolled: 8,
    level: "Beginner",
    status: "Active",
  },
];

const emptyForm = {
  name: "",
  trainer: "",
  category: "Strength",
  schedule: "",
  time: "",
  duration: "60 Min",
  capacity: "20",
  enrolled: "0",
  level: "Beginner",
  status: "Active",
};

const AdminClasses = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [selectedClass, setSelectedClass] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState(emptyForm);

  const [classes, setClasses] = useState(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("fitzoneAdminClasses") || "null"
      );

      if (Array.isArray(saved)) {
        return saved;
      }
    } catch {
      // ignore
    }

    return demoClasses;
  });

  /* =========================================================
     ADMIN AUTH
  ========================================================= */

  useEffect(() => {
    try {
      const admin = JSON.parse(
        localStorage.getItem("fitzoneAdmin")
      );

      if (!admin?.loggedIn) {
        navigate("/admin", { replace: true });
      }
    } catch {
      navigate("/admin", { replace: true });
    }
  }, [navigate]);

  /* =========================================================
     SAVE
  ========================================================= */

  useEffect(() => {
    localStorage.setItem(
      "fitzoneAdminClasses",
      JSON.stringify(classes)
    );
  }, [classes]);

  /* =========================================================
     FILTER
  ========================================================= */

  const filteredClasses = useMemo(() => {
    const value = search.trim().toLowerCase();

    return classes.filter((item) => {
      const matchesSearch =
        !value ||
        item.name?.toLowerCase().includes(value) ||
        item.trainer?.toLowerCase().includes(value) ||
        item.category?.toLowerCase().includes(value) ||
        item.id?.toLowerCase().includes(value);

      const matchesStatus =
        statusFilter === "All" ||
        item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [classes, search, statusFilter]);

  /* =========================================================
     COUNTS
  ========================================================= */

  const activeClasses = classes.filter(
    (item) => item.status === "Active"
  ).length;

  const totalEnrolled = classes.reduce(
    (total, item) => total + Number(item.enrolled || 0),
    0
  );

  const totalCapacity = classes.reduce(
    (total, item) => total + Number(item.capacity || 0),
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

  const openAddForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setFormOpen(true);
  };

  const openEditForm = (item) => {
    setEditingId(item.id);

    setForm({
      name: item.name,
      trainer: item.trainer,
      category: item.category,
      schedule: item.schedule,
      time: item.time,
      duration: item.duration,
      capacity: String(item.capacity),
      enrolled: String(item.enrolled),
      level: item.level,
      status: item.status,
    });

    setFormOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.name.trim() ||
      !form.trainer.trim() ||
      !form.schedule.trim() ||
      !form.time.trim()
    ) {
      window.alert("Please fill all required class details.");
      return;
    }

    const classData = {
      ...form,
      capacity: Number(form.capacity) || 0,
      enrolled: Number(form.enrolled) || 0,
    };

    if (editingId) {
      setClasses((previous) =>
        previous.map((item) =>
          item.id === editingId
            ? {
                ...item,
                ...classData,
              }
            : item
        )
      );
    } else {
      setClasses((previous) => [
        {
          id: `CLS-${Date.now().toString().slice(-5)}`,
          ...classData,
        },
        ...previous,
      ]);
    }

    setFormOpen(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  /* =========================================================
     DELETE
  ========================================================= */

  const deleteClass = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this class?"
    );

    if (!confirmed) return;

    setClasses((previous) =>
      previous.filter((item) => item.id !== id)
    );

    if (selectedClass?.id === id) {
      setSelectedClass(null);
    }
  };

  return (
    <main className="admin-classes-page">

      {/* HEADER */}

      <header className="admin-classes-header">

        <div className="admin-classes-title">

          <button
            type="button"
            className="admin-classes-back"
            onClick={() => navigate("/admin/dashboard")}
          >
            <FiArrowLeft />
          </button>

          <div>
            <span>FITZONE ADMIN</span>

            <h1>
              Manage <strong>Classes</strong>
            </h1>

            <p>
              Create, update and manage all FITZONE fitness classes.
            </p>
          </div>

        </div>

        <button
          type="button"
          className="admin-classes-add"
          onClick={openAddForm}
        >
          <FiPlus />
          Add New Class
        </button>

      </header>


      {/* STATS */}

      <section className="admin-classes-stats">

        <article>
          <div>
            <FaDumbbell />
          </div>

          <span>Total Classes</span>
          <strong>{classes.length}</strong>
          <p>All fitness classes</p>
        </article>


        <article>
          <div>
            <FiCalendar />
          </div>

          <span>Active Classes</span>
          <strong>{activeClasses}</strong>
          <p>Currently available</p>
        </article>


        <article>
          <div>
            <FiUsers />
          </div>

          <span>Total Enrolled</span>
          <strong>{totalEnrolled}</strong>
          <p>Members in classes</p>
        </article>


        <article>
          <div>
            <FiUsers />
          </div>

          <span>Total Capacity</span>
          <strong>{totalCapacity}</strong>
          <p>Available class capacity</p>
        </article>

      </section>


      {/* MAIN PANEL */}

      <section className="admin-classes-panel">

        <div className="admin-classes-panel-head">

          <div>
            <span>CLASS DIRECTORY</span>
            <h2>All Fitness Classes</h2>
          </div>

          <div className="admin-classes-tools">

            <div className="admin-classes-search">
              <FiSearch />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search class..."
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
              <option value="Full">Full</option>
              <option value="Inactive">Inactive</option>
            </select>

          </div>

        </div>


        {/* TABLE */}

        <div className="admin-classes-table-wrap">

          <table className="admin-classes-table">

            <thead>
              <tr>
                <th>Class</th>
                <th>Trainer</th>
                <th>Schedule</th>
                <th>Time</th>
                <th>Members</th>
                <th>Level</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredClasses.map((item) => (

                <tr key={item.id}>

                  <td>
                    <div className="admin-class-name">
                      <span>
                        <FaDumbbell />
                      </span>

                      <div>
                        <strong>{item.name}</strong>
                        <small>
                          {item.id} • {item.category}
                        </small>
                      </div>
                    </div>
                  </td>

                  <td>
                    <strong className="admin-class-trainer">
                      {item.trainer}
                    </strong>
                  </td>

                  <td>{item.schedule}</td>

                  <td>
                    <div className="admin-class-time">
                      <FiClock />
                      {item.time}
                    </div>
                  </td>

                  <td>
                    <strong>
                      {item.enrolled}/{item.capacity}
                    </strong>
                  </td>

                  <td>
                    <span className="admin-class-level">
                      {item.level}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`admin-class-status ${item.status
                        ?.toLowerCase()}`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td>
                    <div className="admin-class-actions">

                      <button
                        type="button"
                        title="View"
                        onClick={() =>
                          setSelectedClass(item)
                        }
                      >
                        <FiEye />
                      </button>

                      <button
                        type="button"
                        title="Edit"
                        onClick={() =>
                          openEditForm(item)
                        }
                      >
                        <FiEdit2 />
                      </button>

                      <button
                        type="button"
                        className="delete"
                        title="Delete"
                        onClick={() =>
                          deleteClass(item.id)
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


          {filteredClasses.length === 0 && (
            <div className="admin-classes-empty">
              <FaDumbbell />

              <strong>No classes found</strong>

              <p>
                Try changing the search or status filter.
              </p>
            </div>
          )}

        </div>

      </section>


      {/* =====================================================
          VIEW MODAL
      ===================================================== */}

      {selectedClass && (

        <div
          className="admin-class-modal-backdrop"
          onClick={() => setSelectedClass(null)}
        >

          <div
            className="admin-class-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              type="button"
              className="admin-class-modal-close"
              onClick={() => setSelectedClass(null)}
            >
              <FiX />
            </button>

            <div className="admin-class-modal-icon">
              <FaDumbbell />
            </div>

            <span>CLASS DETAILS</span>

            <h2>{selectedClass.name}</h2>

            <p>{selectedClass.id}</p>

            <div className="admin-class-modal-grid">

              <div>
                <small>Trainer</small>
                <strong>{selectedClass.trainer}</strong>
              </div>

              <div>
                <small>Category</small>
                <strong>{selectedClass.category}</strong>
              </div>

              <div>
                <small>Schedule</small>
                <strong>{selectedClass.schedule}</strong>
              </div>

              <div>
                <small>Time</small>
                <strong>{selectedClass.time}</strong>
              </div>

              <div>
                <small>Duration</small>
                <strong>{selectedClass.duration}</strong>
              </div>

              <div>
                <small>Level</small>
                <strong>{selectedClass.level}</strong>
              </div>

              <div>
                <small>Members</small>
                <strong>
                  {selectedClass.enrolled}/{selectedClass.capacity}
                </strong>
              </div>

              <div>
                <small>Status</small>
                <strong>{selectedClass.status}</strong>
              </div>

            </div>

          </div>

        </div>
      )}


      {/* =====================================================
          ADD / EDIT MODAL
      ===================================================== */}

      {formOpen && (

        <div
          className="admin-class-modal-backdrop"
          onClick={() => setFormOpen(false)}
        >

          <form
            className="admin-class-form-modal"
            onSubmit={handleSubmit}
            onClick={(e) => e.stopPropagation()}
          >

            <button
              type="button"
              className="admin-class-modal-close"
              onClick={() => setFormOpen(false)}
            >
              <FiX />
            </button>

            <span>
              {editingId ? "EDIT CLASS" : "NEW CLASS"}
            </span>

            <h2>
              {editingId
                ? "Update Fitness Class"
                : "Add Fitness Class"}
            </h2>

            <div className="admin-class-form-grid">

              <label>
                <span>Class Name</span>

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Strength Training"
                />
              </label>

              <label>
                <span>Trainer</span>

                <input
                  type="text"
                  name="trainer"
                  value={form.trainer}
                  onChange={handleChange}
                  placeholder="Trainer name"
                />
              </label>

              <label>
                <span>Category</span>

                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                >
                  <option>Strength</option>
                  <option>Yoga</option>
                  <option>HIIT</option>
                  <option>Cardio</option>
                  <option>Functional</option>
                </select>
              </label>

              <label>
                <span>Schedule</span>

                <input
                  type="text"
                  name="schedule"
                  value={form.schedule}
                  onChange={handleChange}
                  placeholder="Mon, Wed, Fri"
                />
              </label>

              <label>
                <span>Time</span>

                <input
                  type="time"
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                />
              </label>

              <label>
                <span>Duration</span>

                <select
                  name="duration"
                  value={form.duration}
                  onChange={handleChange}
                >
                  <option>30 Min</option>
                  <option>45 Min</option>
                  <option>50 Min</option>
                  <option>60 Min</option>
                  <option>90 Min</option>
                </select>
              </label>

              <label>
                <span>Capacity</span>

                <input
                  type="number"
                  min="1"
                  name="capacity"
                  value={form.capacity}
                  onChange={handleChange}
                />
              </label>

              <label>
                <span>Enrolled</span>

                <input
                  type="number"
                  min="0"
                  name="enrolled"
                  value={form.enrolled}
                  onChange={handleChange}
                />
              </label>

              <label>
                <span>Level</span>

                <select
                  name="level"
                  value={form.level}
                  onChange={handleChange}
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                  <option>All Levels</option>
                </select>
              </label>

              <label>
                <span>Status</span>

                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option>Active</option>
                  <option>Full</option>
                  <option>Inactive</option>
                </select>
              </label>

            </div>

            <button
              type="submit"
              className="admin-class-save"
            >
              {editingId ? "SAVE CHANGES" : "ADD CLASS"}
            </button>

          </form>

        </div>
      )}

    </main>
  );
};

export default AdminClasses;