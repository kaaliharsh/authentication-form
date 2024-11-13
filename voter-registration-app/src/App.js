import React, { useState } from "react";
import RegistrationForm from "./RegistrationForm";
import LoginPage from "./LoginPage";

function App() {
  const [users, setUsers] = useState([]);

  const handleRegister = (userData) => {
    setUsers([...users, userData]);
  };

  return (
    <div>
      <center><h1>Voter Registration</h1></center>
      <RegistrationForm onRegister={handleRegister} />
      <center><h1>User Login</h1></center>
      <LoginPage users={users} />
    </div>
  );
}

export default App;
