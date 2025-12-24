import React, { useState } from "react";

const XModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    dob: "",
  });

  const openModal = () => {
    setIsModalOpen(true);
    setFormData({ username: "", email: "", phone: "", dob: "" });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ username: "", email: "", phone: "", dob: "" });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const validate = () => {
    const { username, email, phone, dob } = formData;

    if (!username.trim()) {
      alert("Please fill out the Username field.");
      return false;
    }
    if (!email.trim()) {
      alert("Please fill out the Email field.");
      return false;
    }
    if (!phone.trim()) {
      alert("Please fill out the Phone field.");
      return false;
    }
    if (!dob.trim()) {
      alert("Please fill out the Date of Birth field.");
      return false;
    }

    if (!email.includes("@")) {
      alert("Invalid email. Please check your email address.");
      return false;
    }

    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length !== 10) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return false;
    }

    const dobDate = new Date(dob);
    if (dobDate > new Date()) {
      alert("Invalid date of birth. Please enter a valid past date.");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) closeModal();
  };

  const handleOutsideClick = (e) => {
    if (e.target.className === "modal") closeModal();
  };

  return (
    <div id="root" style={{ minHeight: "100vh", padding: "50px" }}>
      {!isModalOpen && <button onClick={openModal}>Open Form</button>}

      {isModalOpen && (
        <div
          className="modal"
          onClick={handleOutsideClick}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
              width: "350px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
            }}
          >
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
              User Details
            </h2>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "10px" }}>
                <label htmlFor="username">Username:</label>
                <input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  style={{ width: "100%", padding: "5px" }}
                />
              </div>

              <div style={{ marginBottom: "10px" }}>
                <label htmlFor="email">Email:</label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={{ width: "100%", padding: "5px" }}
                />
              </div>

              <div style={{ marginBottom: "10px" }}>
                <label htmlFor="phone">Phone:</label>
                <input
                  id="phone"
                  type="text"
                  value={formData.phone}
                  onChange={handleChange}
                  style={{ width: "100%", padding: "5px" }}
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label htmlFor="dob">Date of Birth:</label>
                <input
                  id="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleChange}
                  style={{ width: "100%", padding: "5px" }}
                />
              </div>

              <div style={{ textAlign: "center" }}>
                <button type="submit" className="submit-button">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default XModal;
