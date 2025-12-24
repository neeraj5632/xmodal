import React, { useState, useEffect } from "react";

const XModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    dob: "",
  });

  // Form errors for inline error messages (optional, but required for "Please fill out this field." messages)
  const [errors, setErrors] = useState({});

  // Open modal handler
  const openModal = () => {
    setIsModalOpen(true);
    setErrors({});
    setFormData({ username: "", email: "", phone: "", dob: "" });
  };

  // Close modal handler
  const closeModal = () => {
    setIsModalOpen(false);
    setErrors({});
    setFormData({ username: "", email: "", phone: "", dob: "" });
  };

  // Handle clicks outside modal content to close modal
  const handleOutsideClick = (e) => {
    if (e.target.className === "modal") {
      closeModal();
    }
  };

  // Handle form input change
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Validation logic
  const validate = () => {
    const newErrors = {};

    // Check all fields filled
    if (!formData.username.trim())
      newErrors.username = "Please fill out this field.";
    if (!formData.email.trim()) newErrors.email = "Please fill out this field.";
    if (!formData.phone.trim()) newErrors.phone = "Please fill out this field.";
    if (!formData.dob.trim()) newErrors.dob = "Please fill out this field.";

    // If any empty, no need to check further validations here
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }

    // Email must contain '@'
    if (!formData.email.includes("@")) {
      alert("Invalid email. Please check your email address.");
      return false;
    }

    // Phone must be exactly 10 digits and only numbers
    const phoneDigitsOnly = formData.phone.replace(/\D/g, "");
    if (phoneDigitsOnly.length !== 10) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return false;
    }

    // DOB must be past or today, not future
    const today = new Date();
    const dobDate = new Date(formData.dob);
    // To avoid invalid date input, check if dobDate is valid date
    if (isNaN(dobDate.getTime())) {
      alert("Invalid Date of Birth. Please enter a valid past date.");
      return false;
    }
    if (dobDate > today) {
      alert("Invalid Date of Birth. Please enter a valid past date.");
      return false;
    }

    // If all checks pass
    setErrors({});
    return true;
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Reset form and close modal on success
      closeModal();
    }
  };

  return (
    <div>
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
            width: "100vw", // <-- yahan change karna hai
            height: "100vh", // <-- yahan change karna hai
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            className="modal-content"
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
