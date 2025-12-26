import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../api/authApi";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSignup() {
    const res = await signup({ name, email, password });

    if (res.message) {
      alert("Signup successful");
      navigate("/login");
    } else {
      alert("Signup failed");
    }
  }

  return (
    <div style={styles.container}>
      <h2>Signup</h2>

      <input
        style={styles.input}
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />

      <input
        style={styles.input}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />

      <input
        style={styles.input}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
      />

      <button style={styles.button} onClick={handleSignup}>
        Create Account
      </button>
    </div>
  );
}

/* ✅ REQUIRED STYLES OBJECT */
const styles = {
  container: {
    maxWidth: "320px",
    margin: "100px auto",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    borderRadius: "8px",
    background: "#ffffff",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
  },
  input: {
    padding: "10px",
    fontSize: "14px"
  },
  button: {
    padding: "10px",
    fontSize: "15px",
    cursor: "pointer",
    background: "#2e7d32",
    color: "white",
    border: "none",
    borderRadius: "4px"
  }
};

export default Signup;
