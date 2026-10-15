import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiActivity,
  FiArrowLeft,
  FiCheckCircle,
  FiClock,
  FiEdit2,
  FiEye,
  FiSearch,
  FiTrash2,
  FiX,
} from "react-icons/fi";

import "./ManagerMemberships.css";

const demoMemberships = [
  {
    id: "MEM-1001",
    member: "Aarav Sharma",
    email: "aarav@gmail.com",
    plan: "Pro",
    duration: "6 Months",
    amount: "₹8,544",
    startDate: "10 Oct 2026",
    payment: "Paid",
    status: "Active",
  },
  {
    id: "MEM-1002",
    member: "Riya Mehta",
    email: "riya@gmail.com",
    plan: "Elite",
    duration: "12 Months",
    amount: "₹26,989",
    startDate: "02 Oct 2026",
    payment: "Paid",
    status: "Active",
  },
  {
    id: "MEM-1003",
    member: "Kabir Singh",
    email: "kabir@gmail.com",
    plan: "Basic",
    duration: "1 Month",
    amount: "₹999",
    startDate: "01 Sep 2026",
    payment: "Paid",
    status: "Expired",
  },
  {
    id: "MEM-1004",
    member: "Neha Verma",
    email: "neha@gmail.com",
    plan: "Pro",
    duration: "3 Months",
    amount: "₹4,497",
    startDate: "08 Oct 2026",
    payment: "Pending",
    status: "Pending",
  },
];

const ManagerMemberships = () => {
  const navigate = useNavigate();

  const [memberships, setMemberships] = useState([]);
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
          "fitzoneAdminMemberships"
        ) || "null"
      );

      setMemberships(
        Array.isArray(saved) && saved.length
          ? saved
          : demoMemberships
      );
    } catch {
      setMemberships(demoMemberships);
    }
  }, [navigate]);

  useEffect(() => {
    if (memberships.length) {
      localStorage.setItem(
        "fitzoneAdminMemberships",
        JSON.stringify(memberships)
      );
    }
  }, [memberships]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();

    return memberships.filter((item) => {
      const matches =
        item.member.toLowerCase().includes(q) ||
        item.email.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q) ||
        item.plan.toLowerCase().includes(q);

      return (
        matches &&
        (filter === "All" ||
          item.status === filter)
      );
    });
  }, [memberships, search, filter]);

  const active = memberships.filter(
    (item) => item.status === "Active"
  ).length;

  const pending = memberships.filter(
    (item) => item.status === "Pending"
  ).length;

  const expired = memberships.filter(
    (item) => item.status === "Expired"
  ).length;

  const editStatus = (membership) => {
    const status = window.prompt(
      "Enter status: Active, Pending or Expired",
      membership.status
    );

    if (!status) return;

    const cleanStatus =
      status.charAt(0).toUpperCase() +
      status.slice(1).toLowerCase();

    if (
      !["Active", "Pending", "Expired"].includes(
        cleanStatus
      )
    ) {
      alert("Invalid status");
      return;
    }

    setMemberships((prev) =>
      prev.map((item) =>
        item.id === membership.id
          ? {
              ...item,
              status: cleanStatus,
            }
          : item
      )
    );
  };

  const deleteMembership = (id) => {
    if (!window.confirm("Delete this membership?")) {
      return;
    }

    setMemberships((prev) =>
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
            <span>MANAGER / MEMBERSHIPS</span>

            <h1>
              Manage <strong>Memberships</strong>
            </h1>
          </div>
        </div>

      </header>

      <section className="manager-page-stats four">

        <article>
          <FiActivity />
          <div>
            <span>Total</span>
            <strong>{memberships.length}</strong>
          </div>
        </article>

        <article>
          <FiCheckCircle />
          <div>
            <span>Active</span>
            <strong>{active}</strong>
          </div>
        </article>

        <article>
          <FiClock />
          <div>
            <span>Pending</span>
            <strong>{pending}</strong>
          </div>
        </article>

        <article>
          <FiX />
          <div>
            <span>Expired</span>
            <strong>{expired}</strong>
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
              placeholder="Search memberships..."
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
            <option>Pending</option>
            <option>Expired</option>
          </select>

        </div>

        <div className="manager-table-wrap">

          <table className="manager-table">

            <thead>
              <tr>
                <th>Member</th>
                <th>Plan</th>
                <th>Duration</th>
                <th>Amount</th>
                <th>Start Date</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {filtered.map((item) => (
                <tr key={item.id}>

                  <td>
                    <strong>{item.member}</strong>
                    <small>{item.email}</small>
                  </td>

                  <td>{item.plan}</td>
                  <td>{item.duration}</td>
                  <td>{item.amount}</td>
                  <td>{item.startDate}</td>
                  <td>{item.payment}</td>

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
                        onClick={() =>
                          setSelected(item)
                        }
                      >
                        <FiEye />
                      </button>

                      <button
                        onClick={() =>
                          editStatus(item)
                        }
                      >
                        <FiEdit2 />
                      </button>

                      <button
                        className="danger"
                        onClick={() =>
                          deleteMembership(item.id)
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

      {selected && (
        <div className="manager-modal-backdrop">

          <div className="manager-modal">

            <button
              className="manager-modal-close"
              onClick={() => setSelected(null)}
            >
              <FiX />
            </button>

            <span>MEMBERSHIP DETAILS</span>
            <h2>{selected.member}</h2>

            <div className="manager-detail-list">
              <p><strong>ID</strong>{selected.id}</p>
              <p><strong>Plan</strong>{selected.plan}</p>
              <p><strong>Duration</strong>{selected.duration}</p>
              <p><strong>Amount</strong>{selected.amount}</p>
              <p><strong>Payment</strong>{selected.payment}</p>
              <p><strong>Status</strong>{selected.status}</p>
            </div>

          </div>

        </div>
      )}

    </main>
  );
};

export default ManagerMemberships;