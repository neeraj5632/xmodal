import React, { useState } from "react";

const XModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    dob: "",
  });
  const [errors, setErrors] = useState({});

  const openModal = () => {
    setIsModalOpen(true);
    setErrors({});
    setFormData({ username: "", email: "", phone: "", dob: "" });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setErrors({});
    setFormData({ username: "", email: "", phone: "", dob: "" });
  };

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("modal")) {
      closeModal();
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim())
      newErrors.username = "Please fill out the Username field.";
    if (!formData.email.trim())
      newErrors.email = "Please fill out the Email field.";
    if (!formData.phone.trim())
      newErrors.phone = "Please fill out the Phone field.";
    if (!formData.dob.trim())
      newErrors.dob = "Please fill out the Date of Birth field.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }

    if (!formData.email.includes("@")) {
      alert("Invalid email. Please check your email address.");
      return false;
    }

    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (phoneDigits.length !== 10) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return false;
    }

    const dobDate = new Date(formData.dob);
    if (isNaN(dobDate.getTime()) || dobDate > new Date()) {
      alert("Invalid date of birth. Please enter a valid past date.");
      return false;
    }

    setErrors({});
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) closeModal();
  };

  return (
    <div id="root" style={{ minHeight: "100vh" }}>
      {!isModalOpen && (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <h2>User Details Modal</h2>
          <button onClick={openModal}>Open Form</button>
        </div>
      )}

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
              width: "300px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
            }}
          >
            <h3 style={{ textAlign: "center" }}>Fill Details</h3>
            <form onSubmit={handleSubmit} noValidate>
              {/* Username */}
              <div style={{ marginBottom: "12px" }}>
                <label htmlFor="username">Username:</label>
                <br />
                <input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  style={{ width: "100%", padding: "6px" }}
                />
                {errors.username && (
                  <div
                    style={{
                      color: "orange",
                      fontSize: "12px",
                      marginTop: "4px",
                    }}
                  >
                    {errors.username}
                  </div>
                )}
              </div>

              {/* Email */}
              <div style={{ marginBottom: "12px" }}>
                <label htmlFor="email">Email Address:</label>
                <br />
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={{ width: "100%", padding: "6px" }}
                />
                {errors.email && (
                  <div
                    style={{
                      color: "orange",
                      fontSize: "12px",
                      marginTop: "4px",
                    }}
                  >
                    {errors.email}
                  </div>
                )}
              </div>

              {/* Phone */}
              <div style={{ marginBottom: "12px" }}>
                <label htmlFor="phone">Phone Number:</label>
                <br />
                <input
                  id="phone"
                  type="text"
                  value={formData.phone}
                  onChange={handleChange}
                  style={{ width: "100%", padding: "6px" }}
                />
                {errors.phone && (
                  <div
                    style={{
                      color: "orange",
                      fontSize: "12px",
                      marginTop: "4px",
                    }}
                  >
                    {errors.phone}
                  </div>
                )}
              </div>

              {/* DOB */}
              <div style={{ marginBottom: "12px" }}>
                <label htmlFor="dob">Date of Birth:</label>
                <br />
                <input
                  id="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleChange}
                  style={{ width: "100%", padding: "6px" }}
                />
                {errors.dob && (
                  <div
                    style={{
                      color: "orange",
                      fontSize: "12px",
                      marginTop: "4px",
                    }}
                  >
                    {errors.dob}
                  </div>
                )}
              </div>

              <div style={{ textAlign: "center" }}>
                <button
                  type="submit"
                  className="submit-button"
                  style={{ padding: "8px 16px" }}
                >
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
