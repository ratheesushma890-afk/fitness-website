import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiArrowLeft,
  FiEdit2,
  FiEye,
  FiPlus,
  FiSearch,
  FiTrash2,
  FiUser,
  FiUsers,
  FiX,
} from "react-icons/fi";

import "./ManagerMembers.css";

const demoMembers = [
  {
    id: "FIT-1001",
    name: "Aarav Sharma",
    email: "aarav@gmail.com",
    phone: "+91 98765 43210",
    plan: "Pro",
    goal: "Muscle Gain",
    status: "Active",
  },
  {
    id: "FIT-1002",
    name: "Riya Mehta",
    email: "riya@gmail.com",
    phone: "+91 98111 22334",
    plan: "Elite",
    goal: "General Fitness",
    status: "Active",
  },
  {
    id: "FIT-1003",
    name: "Kabir Singh",
    email: "kabir@gmail.com",
    phone: "+91 98989 11223",
    plan: "Basic",
    goal: "Weight Loss",
    status: "Expired",
  },
  {
    id: "FIT-1004",
    name: "Neha Verma",
    email: "neha@gmail.com",
    phone: "+91 98770 11223",
    plan: "Pro",
    goal: "Strength Training",
    status: "Active",
  },
];

const ManagerMembers = () => {
  const navigate = useNavigate();

  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedMember, setSelectedMember] = useState(null);

  const checkManager = () => {
    try {
      const admin = JSON.parse(
        localStorage.getItem("fitzoneAdmin") || "null"
      );

      if (!admin?.loggedIn) {
        navigate("/admin", { replace: true });
        return false;
      }

      if (admin.role !== "manager") {
        navigate("/admin/dashboard", { replace: true });
        return false;
      }

      return true;
    } catch {
      navigate("/admin", { replace: true });
      return false;
    }
  };

  useEffect(() => {
    if (!checkManager()) return;

    try {
      const saved = JSON.parse(
        localStorage.getItem("fitzoneAdminMembers") || "null"
      );

      setMembers(
        Array.isArray(saved) && saved.length
          ? saved
          : demoMembers
      );
    } catch {
      setMembers(demoMembers);
    }
  }, []);

  useEffect(() => {
    if (members.length) {
      localStorage.setItem(
        "fitzoneAdminMembers",
        JSON.stringify(members)
      );
    }
  }, [members]);

  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      const text = search.toLowerCase();

      const matchesSearch =
        member.name.toLowerCase().includes(text) ||
        member.email.toLowerCase().includes(text) ||
        member.phone.toLowerCase().includes(text) ||
        member.id.toLowerCase().includes(text) ||
        member.plan.toLowerCase().includes(text);

      const matchesFilter =
        filter === "All" || member.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [members, search, filter]);

  const activeCount = members.filter(
    (item) => item.status === "Active"
  ).length;

  const expiredCount = members.filter(
    (item) => item.status === "Expired"
  ).length;

  const handleDelete = (id) => {
    if (!window.confirm("Delete this member?")) return;

    setMembers((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const handleEdit = (member) => {
    const name = window.prompt(
      "Member name",
      member.name
    );

    if (!name) return;

    const phone = window.prompt(
      "Phone number",
      member.phone
    );

    if (!phone) return;

    setMembers((prev) =>
      prev.map((item) =>
        item.id === member.id
          ? {
              ...item,
              name,
              phone,
            }
          : item
      )
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
            <span>MANAGER / MEMBERS</span>
            <h1>
              Manage <strong>Members</strong>
            </h1>
          </div>
        </div>

        <button
          className="manager-primary-btn"
          onClick={() => navigate("/join")}
        >
          <FiPlus />
          Add Member
        </button>

      </header>

      <section className="manager-page-stats">

        <article>
          <FiUsers />
          <div>
            <span>Total Members</span>
            <strong>{members.length}</strong>
          </div>
        </article>

        <article>
          <FiUser />
          <div>
            <span>Active</span>
            <strong>{activeCount}</strong>
          </div>
        </article>

        <article>
          <FiX />
          <div>
            <span>Expired</span>
            <strong>{expiredCount}</strong>
          </div>
        </article>

      </section>

      <section className="manager-table-panel">

        <div className="manager-toolbar">

          <div className="manager-search">
            <FiSearch />

            <input
              type="text"
              placeholder="Search members..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
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
                <th>ID</th>
                <th>Contact</th>
                <th>Plan</th>
                <th>Goal</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredMembers.map((member) => (
                <tr key={member.id}>

                  <td>
                    <div className="manager-user-cell">
                      <span>
                        {member.name.charAt(0)}
                      </span>

                      <strong>{member.name}</strong>
                    </div>
                  </td>

                  <td>{member.id}</td>

                  <td>
                    <strong>{member.email}</strong>
                    <small>{member.phone}</small>
                  </td>

                  <td>{member.plan}</td>

                  <td>{member.goal}</td>

                  <td>
                    <span
                      className={`manager-status ${member.status.toLowerCase()}`}
                    >
                      {member.status}
                    </span>
                  </td>

                  <td>
                    <div className="manager-actions">

                      <button
                        onClick={() =>
                          setSelectedMember(member)
                        }
                      >
                        <FiEye />
                      </button>

                      <button
                        onClick={() =>
                          handleEdit(member)
                        }
                      >
                        <FiEdit2 />
                      </button>

                      <button
                        className="danger"
                        onClick={() =>
                          handleDelete(member.id)
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

      {selectedMember && (
        <div className="manager-modal-backdrop">

          <div className="manager-modal">

            <button
              className="manager-modal-close"
              onClick={() =>
                setSelectedMember(null)
              }
            >
              <FiX />
            </button>

            <span>MEMBER DETAILS</span>

            <h2>{selectedMember.name}</h2>

            <div className="manager-detail-list">
              <p>
                <strong>ID</strong>
                {selectedMember.id}
              </p>

              <p>
                <strong>Email</strong>
                {selectedMember.email}
              </p>

              <p>
                <strong>Phone</strong>
                {selectedMember.phone}
              </p>

              <p>
                <strong>Plan</strong>
                {selectedMember.plan}
              </p>

              <p>
                <strong>Goal</strong>
                {selectedMember.goal}
              </p>

              <p>
                <strong>Status</strong>
                {selectedMember.status}
              </p>
            </div>

          </div>

        </div>
      )}

    </main>
  );
};

export default ManagerMembers;