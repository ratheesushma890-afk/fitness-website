import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiArrowLeft,
  FiCheckCircle,
  FiClock,
  FiCreditCard,
  FiDollarSign,
  FiEye,
  FiSearch,
  FiTrash2,
  FiX,
} from "react-icons/fi";

import "./AdminPayments.css";

const demoPayments = [
  {
    id: "PAY-1001",
    member: "Aarav Sharma",
    email: "aarav@gmail.com",
    plan: "Pro",
    amount: 8544,
    method: "UPI",
    date: "08 Oct 2026",
    status: "Paid",
  },
  {
    id: "PAY-1002",
    member: "Riya Mehta",
    email: "riya@gmail.com",
    plan: "Elite",
    amount: 26989,
    method: "Card",
    date: "05 Oct 2026",
    status: "Paid",
  },
  {
    id: "PAY-1003",
    member: "Kabir Singh",
    email: "kabir@gmail.com",
    plan: "Basic",
    amount: 999,
    method: "UPI",
    date: "28 Sep 2026",
    status: "Paid",
  },
  {
    id: "PAY-1004",
    member: "Neha Verma",
    email: "neha@gmail.com",
    plan: "Pro",
    amount: 4497,
    method: "Net Banking",
    date: "20 Sep 2026",
    status: "Pending",
  },
];

const formatMoney = (amount) => {
  return `₹${Number(amount || 0).toLocaleString("en-IN")}`;
};

const AdminPayments = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedPayment, setSelectedPayment] = useState(null);

  const [payments, setPayments] = useState(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("fitzoneAdminPayments") || "null"
      );

      if (Array.isArray(saved)) {
        return saved;
      }
    } catch {
      // ignore
    }

    return demoPayments;
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
     GET LATEST PAYMENT FROM WEBSITE
  ========================================================= */

  useEffect(() => {
    try {
      const latestPayment = JSON.parse(
        localStorage.getItem("fitzonePayment")
      );

      if (!latestPayment) return;

      setPayments((previous) => {
        const latestId =
          latestPayment.paymentId ||
          latestPayment.id;

        const alreadyExists = previous.some(
          (item) => item.id === latestId
        );

        if (alreadyExists) {
          return previous;
        }

        const rawAmount =
          latestPayment.amount ??
          latestPayment.total ??
          0;

        const numericAmount =
          typeof rawAmount === "number"
            ? rawAmount
            : Number(
                String(rawAmount)
                  .replace(/[₹,\s]/g, "")
              ) || 0;

        const newPayment = {
          id:
            latestId ||
            `PAY-${Date.now()
              .toString()
              .slice(-6)}`,

          member:
            latestPayment.member ||
            latestPayment.name ||
            "FITZONE Member",

          email:
            latestPayment.email ||
            "Not available",

          plan:
            latestPayment.plan ||
            "Membership",

          amount: numericAmount,

          method:
            latestPayment.paymentMethod ||
            latestPayment.method ||
            "Online",

          date: latestPayment.paidAt
            ? new Date(
                latestPayment.paidAt
              ).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
            : "Recently",

          status:
            latestPayment.status ||
            "Paid",
        };

        return [newPayment, ...previous];
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
      "fitzoneAdminPayments",
      JSON.stringify(payments)
    );
  }, [payments]);

  /* =========================================================
     FILTER
  ========================================================= */

  const filteredPayments = useMemo(() => {
    const value = search.trim().toLowerCase();

    return payments.filter((payment) => {
      const matchesSearch =
        !value ||
        payment.member
          ?.toLowerCase()
          .includes(value) ||
        payment.email
          ?.toLowerCase()
          .includes(value) ||
        payment.plan
          ?.toLowerCase()
          .includes(value) ||
        payment.method
          ?.toLowerCase()
          .includes(value) ||
        payment.id
          ?.toLowerCase()
          .includes(value);

      const matchesStatus =
        statusFilter === "All" ||
        payment.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [payments, search, statusFilter]);

  /* =========================================================
     STATS
  ========================================================= */

  const paidPayments = payments.filter(
    (item) => item.status === "Paid"
  );

  const pendingPayments = payments.filter(
    (item) => item.status === "Pending"
  );

  const totalRevenue = paidPayments.reduce(
    (total, item) =>
      total + Number(item.amount || 0),
    0
  );

  /* =========================================================
     DELETE
  ========================================================= */

  const deletePayment = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this payment record?"
    );

    if (!confirmed) return;

    setPayments((previous) =>
      previous.filter(
        (payment) => payment.id !== id
      )
    );

    if (selectedPayment?.id === id) {
      setSelectedPayment(null);
    }
  };

  return (
    <main className="admin-payments-page">

      {/* HEADER */}

      <header className="admin-payments-header">

        <div className="admin-payments-title">

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
              Manage <strong>Payments</strong>
            </h1>

            <p>
              Track membership payments,
              revenue and transaction status.
            </p>
          </div>

        </div>

      </header>


      {/* STATS */}

      <section className="admin-payments-stats">

        <article>
          <div>
            <FiDollarSign />
          </div>

          <span>Total Revenue</span>

          <strong>
            {formatMoney(totalRevenue)}
          </strong>

          <p>Successfully received</p>
        </article>


        <article>
          <div>
            <FiCreditCard />
          </div>

          <span>Total Payments</span>

          <strong>
            {payments.length}
          </strong>

          <p>All transactions</p>
        </article>


        <article>
          <div>
            <FiCheckCircle />
          </div>

          <span>Paid Payments</span>

          <strong>
            {paidPayments.length}
          </strong>

          <p>Completed transactions</p>
        </article>


        <article>
          <div>
            <FiClock />
          </div>

          <span>Pending</span>

          <strong>
            {pendingPayments.length}
          </strong>

          <p>Waiting for payment</p>
        </article>

      </section>


      {/* PANEL */}

      <section className="admin-payments-panel">

        <div className="admin-payments-panel-head">

          <div>
            <span>PAYMENT HISTORY</span>
            <h2>All Transactions</h2>
          </div>


          <div className="admin-payments-tools">

            <div className="admin-payments-search">
              <FiSearch />

              <input
                type="text"
                placeholder="Search payment..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
            >
              <option value="All">
                All Status
              </option>

              <option value="Paid">
                Paid
              </option>

              <option value="Pending">
                Pending
              </option>

              <option value="Failed">
                Failed
              </option>
            </select>

          </div>

        </div>


        {/* TABLE */}

        <div className="admin-payments-table-wrap">

          <table className="admin-payments-table">

            <thead>
              <tr>
                <th>Transaction</th>
                <th>Member</th>
                <th>Plan</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>


            <tbody>

              {filteredPayments.map(
                (payment) => (

                  <tr key={payment.id}>

                    <td>
                      <strong className="admin-payment-id">
                        {payment.id}
                      </strong>
                    </td>


                    <td>
                      <div className="admin-payment-member">

                        <span>
                          {payment.member
                            ?.charAt(0)
                            .toUpperCase()}
                        </span>

                        <div>
                          <strong>
                            {payment.member}
                          </strong>

                          <small>
                            {payment.email}
                          </small>
                        </div>

                      </div>
                    </td>


                    <td>
                      <span className="admin-payment-plan">
                        {payment.plan}
                      </span>
                    </td>


                    <td>
                      <strong className="admin-payment-amount">
                        {formatMoney(
                          payment.amount
                        )}
                      </strong>
                    </td>


                    <td>
                      <div className="admin-payment-method">
                        <FiCreditCard />
                        {payment.method}
                      </div>
                    </td>


                    <td>
                      {payment.date}
                    </td>


                    <td>
                      <span
                        className={`admin-payment-badge ${payment.status
                          ?.toLowerCase()}`}
                      >
                        {payment.status}
                      </span>
                    </td>


                    <td>
                      <div className="admin-payment-actions">

                        <button
                          type="button"
                          title="View"
                          onClick={() =>
                            setSelectedPayment(
                              payment
                            )
                          }
                        >
                          <FiEye />
                        </button>

                        <button
                          type="button"
                          className="delete"
                          title="Delete"
                          onClick={() =>
                            deletePayment(
                              payment.id
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


          {filteredPayments.length === 0 && (
            <div className="admin-payments-empty">
              <FiCreditCard />

              <strong>
                No payments found
              </strong>

              <p>
                Try another search or
                payment status.
              </p>
            </div>
          )}

        </div>

      </section>


      {/* PAYMENT DETAIL MODAL */}

      {selectedPayment && (

        <div
          className="admin-payment-modal-backdrop"
          onClick={() =>
            setSelectedPayment(null)
          }
        >

          <div
            className="admin-payment-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              type="button"
              className="admin-payment-modal-close"
              onClick={() =>
                setSelectedPayment(null)
              }
            >
              <FiX />
            </button>


            <div className="admin-payment-modal-icon">
              <FiCreditCard />
            </div>

            <span>
              PAYMENT DETAILS
            </span>

            <h2>
              {selectedPayment.member}
            </h2>

            <p>
              {selectedPayment.id}
            </p>


            <div className="admin-payment-modal-grid">

              <div>
                <small>Email</small>
                <strong>
                  {selectedPayment.email}
                </strong>
              </div>

              <div>
                <small>Plan</small>
                <strong>
                  {selectedPayment.plan}
                </strong>
              </div>

              <div>
                <small>Amount</small>
                <strong>
                  {formatMoney(
                    selectedPayment.amount
                  )}
                </strong>
              </div>

              <div>
                <small>Payment Method</small>
                <strong>
                  {selectedPayment.method}
                </strong>
              </div>

              <div>
                <small>Payment Date</small>
                <strong>
                  {selectedPayment.date}
                </strong>
              </div>

              <div>
                <small>Status</small>
                <strong>
                  {selectedPayment.status}
                </strong>
              </div>

            </div>

          </div>

        </div>
      )}

    </main>
  );
};

export default AdminPayments;