'use client';
import { useState } from "react";
import './DisasterForm.css';

export default function DisasterForm() {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    description: "",
    tags: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-title">🛰️ Disaster Portal</div>
        <div className="navbar-links">
          <a href="/disasters">Disasters</a>
          <a href="/updates">Updates</a>
        </div>
      </nav>

      {/* Form Section */}
      <div className="form-container">
        <form className="form-card">
          <h2 className="form-title">🛑 Disaster Reporting Form</h2>

          <div className="form-grid">
            <div>
              <label className="form-label">Title</label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Earthquake Alert"
                className="form-input"
              />
            </div>

            <div>
              <label className="form-label">Location</label>
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Himachal Pradesh"
                className="form-input"
              />
            </div>

            <div className="full-width">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Detailed information about the disaster..."
                rows={4}
                className="form-textarea"
              />
            </div>

            <div className="full-width">
              <label className="form-label">
                Tags <span className="form-subtext">(comma-separated)</span>
              </label>
              <input
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="e.g. flood, rescue, emergency"
                className="form-input"
              />
            </div>
          </div>

          <div className="button-container">
            <button type="button" className="submit-button">
              🚨 Submit Report
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
