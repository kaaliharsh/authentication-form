import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    voterId: "",
    firstName: "",
    lastName: "",
    fathersName: "",
    gender: "",
    dob: "",
  });

  const [errors, setErrors] = useState({});
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  // Generate a 32-character alphanumeric User ID
  const generateUserId = () => uuidv4().replace(/-/g, "") + uuidv4().replace(/-/g, "").slice(0, 8);

  // Generate a 12-character alphanumeric Password
  const generatePassword = () => uuidv4().replace(/-/g, "").slice(0, 12);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate form data
  const validateForm = () => {
    let formErrors = {};

    if (!/^[a-zA-Z0-9]{10}$/.test(formData.voterId)) {
      formErrors.voterId = "Voter ID must be 10 alphanumeric characters.";
    }

    if (!formData.firstName) formErrors.firstName = "First name is required.";
    if (!formData.lastName) formErrors.lastName = "Last name is required.";
    if (!formData.fathersName) formErrors.fathersName = "Father's name is required.";
    if (!formData.gender) formErrors.gender = "Gender is required.";

    if (!formData.dob) {
      formErrors.dob = "Date of Birth is required.";
    } else {
      const today = new Date();
      const dob = new Date(formData.dob);
      const age = today.getFullYear() - dob.getFullYear();
      const m = today.getMonth() - dob.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        age--;
      }

      if (age < 18) {
        formErrors.dob = "You must be 18 years or older to register.";
      }
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    
    e.preventDefault();
    if (validateForm()) {
      const newUserId = generateUserId();
      const newPassword = generatePassword();
      setUserId(newUserId);
      setPassword(newPassword);
      setIsRegistered(true);
// Save userId and password to "database" (localStorage) on successful registration
localStorage.setItem("userId", newUserId);
localStorage.setItem("password", newPassword);

      // Simulate saving to database
      console.log("User Registered:", {
        userId: newUserId,
        password: newPassword,
      });
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
    
      {isRegistered ? (
        <div>
          <h3>Registration Successful!</h3>
          <p><strong>User ID:</strong> {userId}</p>
          <p><strong>Password:</strong> {password}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Voter ID (10 characters):</label>
            <input
              type="text"
              name="voterId"
              value={formData.voterId}
              onChange={handleChange}
            />
            {errors.voterId && <p style={{ color: "red" }}>{errors.voterId}</p>}
          </div>
          <div>
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
            {errors.firstName && <p style={{ color: "red" }}>{errors.firstName}</p>}
          </div>
          <div>
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
            {errors.lastName && <p style={{ color: "red" }}>{errors.lastName}</p>}
          </div>
          <div>
            <label>Father's Name:</label>
            <input
              type="text"
              name="fathersName"
              value={formData.fathersName}
              onChange={handleChange}
            />
            {errors.fathersName && <p style={{ color: "red" }}>{errors.fathersName}</p>}
          </div>
          <div>
            <label>Gender:</label>
            <select name="gender" value={formData.gender} onChange={handleChange}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <p style={{ color: "red" }}>{errors.gender}</p>}
          </div>
          <div>
            <label>Date of Birth:</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
            />
            {errors.dob && <p style={{ color: "red" }}>{errors.dob}</p>}
          </div>
          <button type="submit">Register</button>
        </form>
      )}
    </div>
  );
};

export default RegistrationForm;
