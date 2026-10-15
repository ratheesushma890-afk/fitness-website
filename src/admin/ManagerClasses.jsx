import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiArrowLeft,
  FiCalendar,
  FiEdit2,
  FiEye,
  FiPlus,
  FiSearch,
  FiTrash2,
  FiUsers,
  FiX,
} from "react-icons/fi";

import "./ManagerClasses.css";

const demoClasses = [
  {
    id: "CLS-101",
    name: "Strength Training",
    trainer: "Arjun Sharma",
    category: "Strength",
    schedule: "Mon Wed Fri",
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
    schedule: "Tue Thu Sat",
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
    schedule: "Mon Wed Sat",
    time: "06:00 PM",
    duration: "45 Min",
    capacity: 15,
    enrolled: 15,
    level: "Advanced",
    status: "Full",
  },
];

const emptyForm = {
  name: "",
  trainer: "",
  category: "",
  schedule: "",
  time: "",
  duration: "",
  capacity: "",
  enrolled: "",
  level: "Beginner",
  status: "Active",
};

const ManagerClasses = () => {
  const navigate = useNavigate();

  const [classes, setClasses] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [modal, setModal] = useState("");
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(emptyForm);

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
        localStorage.getItem("fitzoneAdminClasses") ||
          "null"
      );

      setClasses(
        Array.isArray(saved) && saved.length
          ? saved
          : demoClasses
      );
    } catch {
      setClasses(demoClasses);
    }
  }, [navigate]);

  useEffect(() => {
    if (classes.length) {
      localStorage.setItem(
        "fitzoneAdminClasses",
        JSON.stringify(classes)
      );
    }
  }, [classes]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();

    return classes.filter((item) => {
      const match =
        item.name.toLowerCase().includes(q) ||
        item.trainer.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q);

      return (
        match &&
        (filter === "All" ||
          item.status === filter)
      );
    });
  }, [classes, search, filter]);

  const totalEnrolled = classes.reduce(
    (sum, item) =>
      sum + Number(item.enrolled || 0),
    0
  );

  const openAdd = () => {
    setSelected(null);
    setForm(emptyForm);
    setModal("form");
  };

  const openEdit = (item) => {
    setSelected(item);
    setForm(item);
    setModal("form");
  };

  const saveClass = (e) => {
    e.preventDefault();

    if (!form.name || !form.trainer) {
      alert("Class name and trainer are required.");
      return;
    }

    if (selected) {
      setClasses((prev) =>
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
      setClasses((prev) => [
        ...prev,
        {
          ...form,
          id: `CLS-${Date.now()
            .toString()
            .slice(-4)}`,
          capacity: Number(form.capacity || 0),
          enrolled: Number(form.enrolled || 0),
        },
      ]);
    }

    setModal("");
  };

  const deleteClass = (id) => {
    if (!window.confirm("Delete this class?")) {
      return;
    }

    setClasses((prev) =>
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
            <span>MANAGER / CLASSES</span>
            <h1>
              Manage <strong>Classes</strong>
            </h1>
          </div>
        </div>

        <button
          className="manager-primary-btn"
          onClick={openAdd}
        >
          <FiPlus />
          Add Class
        </button>

      </header>

      <section className="manager-page-stats">

        <article>
          <FiCalendar />
          <div>
            <span>Total Classes</span>
            <strong>{classes.length}</strong>
          </div>
        </article>

        <article>
          <FiCalendar />
          <div>
            <span>Active</span>
            <strong>
              {
                classes.filter(
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
            <span>Total Enrolled</span>
            <strong>{totalEnrolled}</strong>
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
              placeholder="Search classes..."
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
            <option>Full</option>
            <option>Inactive</option>
          </select>

        </div>

        <div className="manager-table-wrap">

          <table className="manager-table">

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

              {filtered.map((item) => (
                <tr key={item.id}>

                  <td>
                    <strong>{item.name}</strong>
                    <small>{item.category}</small>
                  </td>

                  <td>{item.trainer}</td>
                  <td>{item.schedule}</td>
                  <td>{item.time}</td>

                  <td>
                    {item.enrolled}/{item.capacity}
                  </td>

                  <td>{item.level}</td>

                  <td>
                    <span
                      className={`manager-status ${item.status.toLowerCase()}`}
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
                        onClick={() =>
                          openEdit(item)
                        }
                      >
                        <FiEdit2 />
                      </button>

                      <button
                        className="danger"
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

        </div>

      </section>

      {modal === "form" && (
        <div className="manager-modal-backdrop">

          <form
            className="manager-modal manager-form-modal"
            onSubmit={saveClass}
          >

            <button
              type="button"
              className="manager-modal-close"
              onClick={() => setModal("")}
            >
              <FiX />
            </button>

            <span>
              {selected ? "EDIT CLASS" : "NEW CLASS"}
            </span>

            <h2>
              {selected
                ? "Update Class"
                : "Add New Class"}
            </h2>

            <div className="manager-form-grid">

              <label>
                Class Name
                <input
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                />
              </label>

              <label>
                Trainer
                <input
                  value={form.trainer}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      trainer: e.target.value,
                    })
                  }
                />
              </label>

              <label>
                Category
                <input
                  value={form.category}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      category: e.target.value,
                    })
                  }
                />
              </label>

              <label>
                Schedule
                <input
                  value={form.schedule}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      schedule: e.target.value,
                    })
                  }
                />
              </label>

              <label>
                Time
                <input
                  type="text"
                  placeholder="07:00 AM"
                  value={form.time}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      time: e.target.value,
                    })
                  }
                />
              </label>

              <label>
                Duration
                <input
                  value={form.duration}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      duration: e.target.value,
                    })
                  }
                />
              </label>

              <label>
                Capacity
                <input
                  type="number"
                  value={form.capacity}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      capacity: e.target.value,
                    })
                  }
                />
              </label>

              <label>
                Enrolled
                <input
                  type="number"
                  value={form.enrolled}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      enrolled: e.target.value,
                    })
                  }
                />
              </label>

              <label>
                Level
                <select
                  value={form.level}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      level: e.target.value,
                    })
                  }
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </label>

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
                  <option>Full</option>
                  <option>Inactive</option>
                </select>
              </label>

            </div>

            <button className="manager-save-btn">
              Save Class
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

            <span>CLASS DETAILS</span>
            <h2>{selected.name}</h2>

            <div className="manager-detail-list">
              <p><strong>Trainer</strong>{selected.trainer}</p>
              <p><strong>Category</strong>{selected.category}</p>
              <p><strong>Schedule</strong>{selected.schedule}</p>
              <p><strong>Time</strong>{selected.time}</p>
              <p><strong>Duration</strong>{selected.duration}</p>
              <p><strong>Level</strong>{selected.level}</p>
            </div>

          </div>

        </div>
      )}

    </main>
  );
};

export default ManagerClasses;