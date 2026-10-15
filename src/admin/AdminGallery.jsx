import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiArrowLeft,
  FiEdit2,
  FiEye,
  FiImage,
  FiPlus,
  FiSearch,
  FiTrash2,
  FiX,
} from "react-icons/fi";

import "./AdminGallery.css";

const demoGallery = [
  {
    id: "GAL-101",
    title: "Strength Training",
    category: "Workouts",
    image:
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1000&q=85",
    status: "Published",
  },
  {
    id: "GAL-102",
    title: "Modern Gym Floor",
    category: "Gym Interior",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=85",
    status: "Published",
  },
  {
    id: "GAL-103",
    title: "Yoga & Flexibility",
    category: "Classes",
    image:
      "https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&w=1000&q=85",
    status: "Published",
  },
  {
    id: "GAL-104",
    title: "Cardio Workout",
    category: "Workouts",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1000&q=85",
    status: "Published",
  },
  {
    id: "GAL-105",
    title: "Personal Training",
    category: "Trainers",
    image:
      "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=1000&q=85",
    status: "Published",
  },
  {
    id: "GAL-106",
    title: "Fitness Community",
    category: "Members",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1000&q=85",
    status: "Draft",
  },
];

const emptyForm = {
  title: "",
  category: "Workouts",
  image: "",
  status: "Published",
};

const AdminGallery = () => {
  const navigate = useNavigate();

  const [gallery, setGallery] = useState(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("fitzoneAdminGallery") || "null"
      );

      if (Array.isArray(saved)) {
        return saved;
      }
    } catch {
      // ignore
    }

    return demoGallery;
  });

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [preview, setPreview] = useState(null);

  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState(emptyForm);

  /* AUTH */

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

  /* SAVE */

  useEffect(() => {
    localStorage.setItem(
      "fitzoneAdminGallery",
      JSON.stringify(gallery)
    );
  }, [gallery]);

  /* FILTER */

  const filteredGallery = useMemo(() => {
    const value = search.trim().toLowerCase();

    return gallery.filter((item) => {
      const matchesSearch =
        !value ||
        item.title
          ?.toLowerCase()
          .includes(value) ||
        item.category
          ?.toLowerCase()
          .includes(value);

      const matchesCategory =
        category === "All" ||
        item.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [gallery, search, category]);

  const published = gallery.filter(
    (item) => item.status === "Published"
  ).length;

  const drafts = gallery.filter(
    (item) => item.status === "Draft"
  ).length;

  /* ADD */

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setFormOpen(true);
  };

  /* EDIT */

  const openEdit = (item) => {
    setEditingId(item.id);

    setForm({
      title: item.title,
      category: item.category,
      image: item.image,
      status: item.status,
    });

    setFormOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.title.trim() ||
      !form.image.trim()
    ) {
      window.alert(
        "Please enter image title and image URL."
      );

      return;
    }

    if (editingId) {
      setGallery((previous) =>
        previous.map((item) =>
          item.id === editingId
            ? {
                ...item,
                ...form,
              }
            : item
        )
      );
    } else {
      setGallery((previous) => [
        {
          id: `GAL-${Date.now()
            .toString()
            .slice(-5)}`,
          ...form,
        },
        ...previous,
      ]);
    }

    setFormOpen(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  /* DELETE */

  const deleteImage = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this gallery image?"
    );

    if (!confirmed) return;

    setGallery((previous) =>
      previous.filter(
        (item) => item.id !== id
      )
    );

    if (preview?.id === id) {
      setPreview(null);
    }
  };

  return (
    <main className="admin-gallery-page">

      {/* HEADER */}

      <header className="admin-gallery-header">

        <div className="admin-gallery-title">

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
              Manage <strong>Gallery</strong>
            </h1>

            <p>
              Add, edit and manage images shown in your FITZONE gallery.
            </p>
          </div>

        </div>

        <button
          type="button"
          className="admin-gallery-add"
          onClick={openAdd}
        >
          <FiPlus />
          Add Image
        </button>

      </header>


      {/* STATS */}

      <section className="admin-gallery-stats">

        <article>
          <div>
            <FiImage />
          </div>

          <span>Total Images</span>
          <strong>{gallery.length}</strong>
          <p>All gallery items</p>
        </article>

        <article>
          <div>
            <FiEye />
          </div>

          <span>Published</span>
          <strong>{published}</strong>
          <p>Visible on website</p>
        </article>

        <article>
          <div>
            <FiEdit2 />
          </div>

          <span>Draft Images</span>
          <strong>{drafts}</strong>
          <p>Hidden from website</p>
        </article>

      </section>


      {/* TOOLBAR */}

      <section className="admin-gallery-panel">

        <div className="admin-gallery-panel-head">

          <div>
            <span>MEDIA LIBRARY</span>
            <h2>Gallery Images</h2>
          </div>


          <div className="admin-gallery-tools">

            <div className="admin-gallery-search">
              <FiSearch />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search image..."
              />
            </div>

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
            >
              <option>All</option>
              <option>Gym Interior</option>
              <option>Workouts</option>
              <option>Classes</option>
              <option>Members</option>
              <option>Trainers</option>
            </select>

          </div>

        </div>


        {/* GALLERY GRID */}

        <div className="admin-gallery-grid">

          {filteredGallery.map((item) => (

            <article
              className="admin-gallery-card"
              key={item.id}
            >

              <div className="admin-gallery-image">

                <img
                  src={item.image}
                  alt={item.title}
                />

                <span
                  className={`admin-gallery-status ${item.status.toLowerCase()}`}
                >
                  {item.status}
                </span>

                <div className="admin-gallery-overlay">

                  <button
                    type="button"
                    title="Preview"
                    onClick={() =>
                      setPreview(item)
                    }
                  >
                    <FiEye />
                  </button>

                  <button
                    type="button"
                    title="Edit"
                    onClick={() =>
                      openEdit(item)
                    }
                  >
                    <FiEdit2 />
                  </button>

                  <button
                    type="button"
                    className="delete"
                    title="Delete"
                    onClick={() =>
                      deleteImage(item.id)
                    }
                  >
                    <FiTrash2 />
                  </button>

                </div>

              </div>


              <div className="admin-gallery-card-content">

                <span>
                  {item.category}
                </span>

                <h3>
                  {item.title}
                </h3>

                <small>
                  {item.id}
                </small>

              </div>

            </article>
          ))}


          {filteredGallery.length === 0 && (
            <div className="admin-gallery-empty">

              <FiImage />

              <strong>
                No gallery images found
              </strong>

              <p>
                Add a new image or change your filter.
              </p>

            </div>
          )}

        </div>

      </section>


      {/* PREVIEW */}

      {preview && (

        <div
          className="admin-gallery-modal-backdrop"
          onClick={() =>
            setPreview(null)
          }
        >

          <div
            className="admin-gallery-preview"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              type="button"
              className="admin-gallery-close"
              onClick={() =>
                setPreview(null)
              }
            >
              <FiX />
            </button>

            <img
              src={preview.image}
              alt={preview.title}
            />

            <div>
              <span>
                {preview.category}
              </span>

              <h2>
                {preview.title}
              </h2>

              <p>
                {preview.status} • {preview.id}
              </p>
            </div>

          </div>

        </div>
      )}


      {/* ADD / EDIT */}

      {formOpen && (

        <div
          className="admin-gallery-modal-backdrop"
          onClick={() =>
            setFormOpen(false)
          }
        >

          <form
            className="admin-gallery-form"
            onSubmit={handleSubmit}
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              type="button"
              className="admin-gallery-close"
              onClick={() =>
                setFormOpen(false)
              }
            >
              <FiX />
            </button>

            <span>
              {editingId
                ? "EDIT GALLERY"
                : "NEW GALLERY IMAGE"}
            </span>

            <h2>
              {editingId
                ? "Update Image"
                : "Add New Image"}
            </h2>


            <label>
              <span>Image Title</span>

              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Strength Training"
              />
            </label>


            <label>
              <span>Category</span>

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
              >
                <option>Gym Interior</option>
                <option>Workouts</option>
                <option>Classes</option>
                <option>Members</option>
                <option>Trainers</option>
              </select>
            </label>


            <label>
              <span>Image URL</span>

              <input
                type="text"
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="https://..."
              />
            </label>


            {form.image && (
              <div className="admin-gallery-form-preview">
                <img
                  src={form.image}
                  alt="Preview"
                />
              </div>
            )}


            <label>
              <span>Status</span>

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option>Published</option>
                <option>Draft</option>
              </select>
            </label>


            <button
              type="submit"
              className="admin-gallery-save"
            >
              {editingId
                ? "SAVE CHANGES"
                : "ADD IMAGE"}
            </button>

          </form>

        </div>
      )}

    </main>
  );
};

export default AdminGallery;