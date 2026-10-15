import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiActivity,
  FiArrowLeft,
  FiCheckCircle,
  FiClock,
  FiCreditCard,
  FiEdit2,
  FiEye,
  FiSearch,
  FiTrash2,
  FiX,
} from "react-icons/fi";

import "./AdminMemberships.css";

const demoMemberships = [
  {
    id: "MEM-1001",
    member: "Aarav Sharma",
    email: "aarav@gmail.com",
    plan: "Pro",
    duration: "6 Months",
    amount: "₹8,544",
    startDate: "08 Oct 2026",
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
    startDate: "05 Oct 2026",
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
    startDate: "28 Sep 2026",
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
    startDate: "20 Sep 2026",
    payment: "Pending",
    status: "Pending",
  },
];

const AdminMemberships = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [selected, setSelected] = useState(null);

  const [memberships, setMemberships] = useState(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem(
          "fitzoneAdminMemberships"
        ) || "null"
      );

      if (Array.isArray(saved)) {
        return saved;
      }
    } catch {
      // ignore
    }

    return demoMemberships;
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
     READ LATEST MEMBERSHIP
  ========================================================= */

  useEffect(() => {
    try {
      const latest = JSON.parse(
        localStorage.getItem("fitzoneMembership")
      );

      if (!latest?.name) return;

      setMemberships((previous) => {
        const exists = previous.some(
          (item) =>
            item.email?.toLowerCase() ===
              latest.email?.toLowerCase() &&
            item.plan ===
              (latest.plan?.name ||
                latest.plan)
        );

        if (exists) {
          return previous;
        }

        const newMembership = {
          id:
            latest.id ||
            `MEM-${Date.now()
              .toString()
              .slice(-5)}`,

          member: latest.name,

          email:
            latest.email ||
            "Not available",

          plan:
            latest.plan?.name ||
            latest.plan ||
            "Membership",

          duration:
            latest.duration?.label ||
            latest.duration ||
            "1 Month",

          amount:
            latest.formattedTotal ||
            latest.total ||
            "₹0",

          startDate:
            latest.displayStartDate ||
            latest.startDate ||
            "Recently",

          payment:
            latest.paymentStatus ||
            "Pending",

          status:
            latest.paymentStatus === "Paid"
              ? "Active"
              : "Pending",
        };

        return [newMembership, ...previous];
      });
    } catch {
      // ignore
    }
  }, []);

  /* =========================================================
     SAVE
  ========================================================= */

  useEffect(() => {
    localStorage.setItem(
      "fitzoneAdminMemberships",
      JSON.stringify(memberships)
    );
  }, [memberships]);

  /* =========================================================
     FILTER
  ========================================================= */

  const filteredMemberships = useMemo(() => {
    const value = search
      .trim()
      .toLowerCase();

    return memberships.filter((item) => {
      const matchesSearch =
        !value ||
        item.member
          ?.toLowerCase()
          .includes(value) ||
        item.email
          ?.toLowerCase()
          .includes(value) ||
        item.id
          ?.toLowerCase()
          .includes(value) ||
        item.plan
          ?.toLowerCase()
          .includes(value);

      const matchesStatus =
        status === "All" ||
        item.status === status;

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [memberships, search, status]);

  /* =========================================================
     COUNTS
  ========================================================= */

  const active = memberships.filter(
    (item) =>
      item.status === "Active"
  ).length;

  const pending = memberships.filter(
    (item) =>
      item.status === "Pending"
  ).length;

  const expired = memberships.filter(
    (item) =>
      item.status === "Expired"
  ).length;

  /* =========================================================
     DELETE
  ========================================================= */

  const deleteMembership = (id) => {
    const confirmed = window.confirm(
      "Delete this membership?"
    );

    if (!confirmed) return;

    setMemberships((previous) =>
      previous.filter(
        (item) => item.id !== id
      )
    );

    if (selected?.id === id) {
      setSelected(null);
    }
  };

  /* =========================================================
     CHANGE STATUS
  ========================================================= */

  const editMembership = (item) => {
    const newStatus = window.prompt(
      "Enter status: Active, Pending or Expired",
      item.status
    );

    if (!newStatus) return;

    const formatted =
      newStatus
        .trim()
        .charAt(0)
        .toUpperCase() +
      newStatus
        .trim()
        .slice(1)
        .toLowerCase();

    if (
      ![
        "Active",
        "Pending",
        "Expired",
      ].includes(formatted)
    ) {
      window.alert(
        "Please enter Active, Pending or Expired."
      );
      return;
    }

    setMemberships((previous) =>
      previous.map((membership) =>
        membership.id === item.id
          ? {
              ...membership,
              status: formatted,
            }
          : membership
      )
    );
  };

  return (
    <main className="admin-memberships-page">

      {/* HEADER */}

      <header className="admin-memberships-header">

        <div className="admin-memberships-title">

          <button
            type="button"
            onClick={() =>
              navigate("/admin/dashboard")
            }
          >
            <FiArrowLeft />
          </button>

          <div>
            <span>FITZONE ADMIN</span>

            <h1>
              Manage{" "}
              <strong>
                Memberships
              </strong>
            </h1>

            <p>
              Track membership plans, payments and active status.
            </p>
          </div>

        </div>

      </header>


      {/* STATS */}

      <section className="admin-memberships-stats">

        <article>
          <div>
            <FiActivity />
          </div>

          <span>
            Total Memberships
          </span>

          <strong>
            {memberships.length}
          </strong>

          <p>
            All membership records
          </p>
        </article>


        <article>
          <div>
            <FiCheckCircle />
          </div>

          <span>
            Active
          </span>

          <strong>
            {active}
          </strong>

          <p>
            Currently active plans
          </p>
        </article>


        <article>
          <div>
            <FiClock />
          </div>

          <span>
            Pending
          </span>

          <strong>
            {pending}
          </strong>

          <p>
            Waiting for activation
          </p>
        </article>


        <article>
          <div>
            <FiX />
          </div>

          <span>
            Expired
          </span>

          <strong>
            {expired}
          </strong>

          <p>
            Expired memberships
          </p>
        </article>

      </section>


      {/* PANEL */}

      <section className="admin-memberships-panel">

        <div className="admin-memberships-panel-head">

          <div>
            <span>
              MEMBERSHIP DIRECTORY
            </span>

            <h2>
              All Memberships
            </h2>
          </div>


          <div className="admin-memberships-tools">

            <div className="admin-memberships-search">
              <FiSearch />

              <input
                type="text"
                placeholder="Search membership..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
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

        <div className="admin-memberships-table-wrap">

          <table className="admin-memberships-table">

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

              {filteredMemberships.map(
                (item) => (

                  <tr key={item.id}>

                    <td>
                      <div className="admin-membership-user">

                        <span>
                          {item.member
                            ?.charAt(0)
                            .toUpperCase()}
                        </span>

                        <div>
                          <strong>
                            {item.member}
                          </strong>

                          <small>
                            {item.email}
                          </small>

                          <small>
                            {item.id}
                          </small>
                        </div>

                      </div>
                    </td>


                    <td>
                      <span className="admin-membership-plan">
                        {item.plan}
                      </span>
                    </td>


                    <td>
                      {item.duration}
                    </td>


                    <td>
                      <strong className="admin-membership-price">
                        {item.amount}
                      </strong>
                    </td>


                    <td>
                      {item.startDate}
                    </td>


                    <td>
                      <span
                        className={`admin-payment-status ${item.payment
                          ?.toLowerCase()
                          .replaceAll(" ", "-")}`}
                      >
                        <FiCreditCard />
                        {item.payment}
                      </span>
                    </td>


                    <td>
                      <span
                        className={`admin-membership-status ${item.status?.toLowerCase()}`}
                      >
                        {item.status}
                      </span>
                    </td>


                    <td>
                      <div className="admin-membership-actions">

                        <button
                          type="button"
                          title="View"
                          onClick={() =>
                            setSelected(item)
                          }
                        >
                          <FiEye />
                        </button>

                        <button
                          type="button"
                          title="Edit Status"
                          onClick={() =>
                            editMembership(item)
                          }
                        >
                          <FiEdit2 />
                        </button>

                        <button
                          type="button"
                          className="delete"
                          title="Delete"
                          onClick={() =>
                            deleteMembership(
                              item.id
                            )
                          }
                        >
                          <FiTrash2 />
                        </button>

                      </div>
                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>


          {filteredMemberships.length === 0 && (
            <div className="admin-memberships-empty">

              <FiActivity />

              <strong>
                No memberships found
              </strong>

              <p>
                Try changing your search or status filter.
              </p>

            </div>
          )}

        </div>

      </section>


      {/* DETAIL MODAL */}

      {selected && (

        <div
          className="admin-membership-modal-backdrop"
          onClick={() =>
            setSelected(null)
          }
        >

          <div
            className="admin-membership-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              type="button"
              className="admin-membership-modal-close"
              onClick={() =>
                setSelected(null)
              }
            >
              <FiX />
            </button>


            <div className="admin-membership-modal-icon">
              <FiActivity />
            </div>

            <span>
              MEMBERSHIP DETAILS
            </span>

            <h2>
              {selected.member}
            </h2>

            <p>
              {selected.id}
            </p>


            <div className="admin-membership-modal-grid">

              <div>
                <small>Plan</small>
                <strong>
                  {selected.plan}
                </strong>
              </div>

              <div>
                <small>Duration</small>
                <strong>
                  {selected.duration}
                </strong>
              </div>

              <div>
                <small>Total Amount</small>
                <strong>
                  {selected.amount}
                </strong>
              </div>

              <div>
                <small>Start Date</small>
                <strong>
                  {selected.startDate}
                </strong>
              </div>

              <div>
                <small>Payment</small>
                <strong>
                  {selected.payment}
                </strong>
              </div>

              <div>
                <small>Status</small>
                <strong>
                  {selected.status}
                </strong>
              </div>

            </div>

          </div>

        </div>
      )}

    </main>
  );
};

export default AdminMemberships;