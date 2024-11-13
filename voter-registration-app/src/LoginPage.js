import React, { useState } from "react";

const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    userId: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Get saved credentials from "database" (localStorage)
    const savedUserId = localStorage.getItem("userId");
    const savedPassword = localStorage.getItem("password");

    // Validate credentials
    if (loginData.userId === savedUserId && loginData.password === savedPassword) {
      setIsLoggedIn(true);
      setError("");
    } else {
      setError("Invalid User ID or Password.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      
      {isLoggedIn ? (
        <div>
          <h3>Login Successful!</h3>
          <p>Welcome back!</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>User ID:</label>
            <input
              type="text"
              name="userId"
              value={loginData.userId}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Login</button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      )}
    </div>
  );
};

export default LoginForm;
