import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/authApi";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin() {
    const res = await login({ email, password });

    if (res.token) {
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      navigate("/");
    } else {
      alert(res.message || "Login failed");
    }
  }

  return (
    <div style={styles.container}>
      <h2>Login</h2>

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

      <button style={styles.button} onClick={handleLogin}>
        Login
      </button>

      {/* 🔹 SIGNUP LINK */}
      <p style={styles.text}>
        New here?{" "}
        <span
          style={styles.link}
          onClick={() => navigate("/signup")}
        >
          Sign up
        </span>
      </p>
    </div>
  );
}

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
  },
  text: {
    fontSize: "13px",
    textAlign: "center",
    marginTop: "10px"
  },
  link: {
    color: "#2e7d32",
    cursor: "pointer",
    fontWeight: "bold"
  }
};

export default Login;
