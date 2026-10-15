import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiArrowLeft,
  FiEdit2,
  FiEye,
  FiMail,
  FiPhone,
  FiSearch,
  FiTrash2,
  FiUserPlus,
  FiUsers,
  FiX,
} from "react-icons/fi";

import "./AdminMembers.css";

const demoMembers = [
  {
    id: "FIT-1001",
    name: "Aarav Sharma",
    email: "aarav@gmail.com",
    phone: "+91 98765 43210",
    plan: "Pro",
    goal: "Muscle Gain",
    joined: "08 Oct 2026",
    status: "Active",
  },
  {
    id: "FIT-1002",
    name: "Riya Mehta",
    email: "riya@gmail.com",
    phone: "+91 98111 22334",
    plan: "Elite",
    goal: "General Fitness",
    joined: "05 Oct 2026",
    status: "Active",
  },
  {
    id: "FIT-1003",
    name: "Kabir Singh",
    email: "kabir@gmail.com",
    phone: "+91 98989 11223",
    plan: "Basic",
    goal: "Weight Loss",
    joined: "28 Sep 2026",
    status: "Expired",
  },
  {
    id: "FIT-1004",
    name: "Neha Verma",
    email: "neha@gmail.com",
    phone: "+91 97777 66554",
    plan: "Pro",
    goal: "Strength Training",
    joined: "20 Sep 2026",
    status: "Active",
  },
];

const AdminMembers = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [selectedMember, setSelectedMember] = useState(null);

  const [members, setMembers] = useState(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("fitzoneAdminMembers") || "null"
      );

      if (Array.isArray(saved)) {
        return saved;
      }
    } catch {
      // ignore
    }

    return demoMembers;
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
     READ LATEST MEMBERSHIP FROM WEBSITE
  ========================================================= */

  useEffect(() => {
    try {
      const latestMembership = JSON.parse(
        localStorage.getItem("fitzoneMembership")
      );

      if (!latestMembership?.name) return;

      setMembers((previous) => {
        const alreadyExists = previous.some(
          (member) =>
            member.email?.toLowerCase() ===
            latestMembership.email?.toLowerCase()
        );

        if (alreadyExists) {
          return previous;
        }

        const newMember = {
          id:
            latestMembership.id ||
            `FIT-${Date.now().toString().slice(-5)}`,

          name: latestMembership.name || "FITZONE Member",
          email: latestMembership.email || "Not available",
          phone: latestMembership.phone || "Not available",

          plan:
            latestMembership.plan?.name ||
            latestMembership.plan ||
            "Membership",

          goal:
            latestMembership.goal ||
            latestMembership.fitnessGoal ||
            "General Fitness",

          joined:
            latestMembership.displayStartDate ||
            latestMembership.startDate ||
            "Recently Joined",

          status:
            latestMembership.paymentStatus === "Paid"
              ? "Active"
              : "Pending",
        };

        return [newMember, ...previous];
      });
    } catch {
      // ignore invalid localStorage
    }
  }, []);

  /* =========================================================
     SAVE MEMBERS
  ========================================================= */

  useEffect(() => {
    localStorage.setItem(
      "fitzoneAdminMembers",
      JSON.stringify(members)
    );
  }, [members]);

  /* =========================================================
     FILTER
  ========================================================= */

  const filteredMembers = useMemo(() => {
    const value = search.trim().toLowerCase();

    return members.filter((member) => {
      const matchesSearch =
        !value ||
        member.name?.toLowerCase().includes(value) ||
        member.email?.toLowerCase().includes(value) ||
        member.phone?.toLowerCase().includes(value) ||
        member.id?.toLowerCase().includes(value) ||
        member.plan?.toLowerCase().includes(value);

      const matchesStatus =
        status === "All" ||
        member.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [members, search, status]);

  /* =========================================================
     COUNTS
  ========================================================= */

  const activeMembers = members.filter(
    (member) => member.status === "Active"
  ).length;

  const pendingMembers = members.filter(
    (member) => member.status === "Pending"
  ).length;

  /* =========================================================
     DELETE
  ========================================================= */

  const deleteMember = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this member?"
    );

    if (!confirmed) return;

    setMembers((previous) =>
      previous.filter((member) => member.id !== id)
    );

    if (selectedMember?.id === id) {
      setSelectedMember(null);
    }
  };

  /* =========================================================
     EDIT
  ========================================================= */

  const editMember = (member) => {
    const newName = window.prompt(
      "Enter member name:",
      member.name
    );

    if (!newName?.trim()) return;

    const newPhone = window.prompt(
      "Enter phone number:",
      member.phone
    );

    setMembers((previous) =>
      previous.map((item) =>
        item.id === member.id
          ? {
              ...item,
              name: newName.trim(),
              phone: newPhone?.trim() || item.phone,
            }
          : item
      )
    );
  };

  return (
    <main className="admin-members-page">

      {/* HEADER */}

      <header className="admin-members-header">

        <div className="admin-members-title">

          <button
            type="button"
            className="admin-members-back"
            onClick={() =>
              navigate("/admin/dashboard")
            }
          >
            <FiArrowLeft />
          </button>

          <div>
            <span>FITZONE ADMIN</span>

            <h1>
              Manage <strong>Members</strong>
            </h1>

            <p>
              View and manage all registered FITZONE members.
            </p>
          </div>

        </div>

        <button
          type="button"
          className="admin-members-add"
          onClick={() =>
            navigate("/join")
          }
        >
          <FiUserPlus />
          Add Member
        </button>

      </header>


      {/* SUMMARY */}

      <section className="admin-members-summary">

        <article>
          <span>
            <FiUsers />
          </span>

          <div>
            <small>Total Members</small>
            <strong>{members.length}</strong>
          </div>
        </article>

        <article>
          <span>
            <FiUsers />
          </span>

          <div>
            <small>Active Members</small>
            <strong>{activeMembers}</strong>
          </div>
        </article>

        <article>
          <span>
            <FiUsers />
          </span>

          <div>
            <small>Pending Members</small>
            <strong>{pendingMembers}</strong>
          </div>
        </article>

      </section>


      {/* MAIN PANEL */}

      <section className="admin-members-panel">

        <div className="admin-members-panel-head">

          <div>
            <span>MEMBER DIRECTORY</span>
            <h2>All Members</h2>
          </div>

          <div className="admin-members-tools">

            <div className="admin-members-search">
              <FiSearch />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search member..."
              />
            </div>

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
            >
              <option value="All">
                All Status
              </option>

              <option value="Active">
                Active
              </option>

              <option value="Pending">
                Pending
              </option>

              <option value="Expired">
                Expired
              </option>
            </select>

          </div>

        </div>


        {/* TABLE */}

        <div className="admin-members-table-wrap">

          <table className="admin-members-table">

            <thead>
              <tr>
                <th>Member</th>
                <th>Contact</th>
                <th>Plan</th>
                <th>Fitness Goal</th>
                <th>Joined</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredMembers.map((member) => (

                <tr key={member.id}>

                  <td>
                    <div className="admin-member-user">

                      <span>
                        {member.name
                          ?.charAt(0)
                          .toUpperCase()}
                      </span>

                      <div>
                        <strong>
                          {member.name}
                        </strong>

                        <small>
                          {member.id}
                        </small>
                      </div>

                    </div>
                  </td>


                  <td>
                    <div className="admin-member-contact">
                      <span>
                        <FiMail />
                        {member.email}
                      </span>

                      <span>
                        <FiPhone />
                        {member.phone}
                      </span>
                    </div>
                  </td>


                  <td>
                    <strong className="admin-member-plan">
                      {member.plan}
                    </strong>
                  </td>


                  <td>
                    {member.goal}
                  </td>


                  <td>
                    {member.joined}
                  </td>


                  <td>
                    <span
                      className={`admin-member-status ${member.status?.toLowerCase()}`}
                    >
                      {member.status}
                    </span>
                  </td>


                  <td>
                    <div className="admin-member-actions">

                      <button
                        type="button"
                        title="View"
                        onClick={() =>
                          setSelectedMember(member)
                        }
                      >
                        <FiEye />
                      </button>

                      <button
                        type="button"
                        title="Edit"
                        onClick={() =>
                          editMember(member)
                        }
                      >
                        <FiEdit2 />
                      </button>

                      <button
                        type="button"
                        className="delete"
                        title="Delete"
                        onClick={() =>
                          deleteMember(member.id)
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


          {filteredMembers.length === 0 && (
            <div className="admin-members-empty">
              <FiUsers />

              <strong>
                No members found
              </strong>

              <p>
                Try changing your search or status filter.
              </p>
            </div>
          )}

        </div>

      </section>


      {/* VIEW MEMBER MODAL */}

      {selectedMember && (

        <div
          className="admin-member-modal-backdrop"
          onClick={() =>
            setSelectedMember(null)
          }
        >

          <div
            className="admin-member-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              type="button"
              className="admin-member-modal-close"
              onClick={() =>
                setSelectedMember(null)
              }
            >
              <FiX />
            </button>


            <div className="admin-member-modal-avatar">
              {selectedMember.name
                ?.charAt(0)
                .toUpperCase()}
            </div>

            <span>MEMBER PROFILE</span>

            <h2>
              {selectedMember.name}
            </h2>

            <p>
              {selectedMember.id}
            </p>


            <div className="admin-member-modal-grid">

              <div>
                <small>Email</small>
                <strong>
                  {selectedMember.email}
                </strong>
              </div>

              <div>
                <small>Phone</small>
                <strong>
                  {selectedMember.phone}
                </strong>
              </div>

              <div>
                <small>Membership</small>
                <strong>
                  {selectedMember.plan}
                </strong>
              </div>

              <div>
                <small>Fitness Goal</small>
                <strong>
                  {selectedMember.goal}
                </strong>
              </div>

              <div>
                <small>Joined</small>
                <strong>
                  {selectedMember.joined}
                </strong>
              </div>

              <div>
                <small>Status</small>
                <strong>
                  {selectedMember.status}
                </strong>
              </div>

            </div>

          </div>

        </div>
      )}

    </main>
  );
};

export default AdminMembers;