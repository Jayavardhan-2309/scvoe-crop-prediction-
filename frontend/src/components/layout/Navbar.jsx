import { useNavigate } from "react-router-dom";

function Navbar({ onToggle }) {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div style={styles.navbar}>
      <button onClick={onToggle} style={styles.toggle}>☰</button>

      <h2 style={{ margin: 0 }}>🌱 SCVOE</h2>

      <div style={styles.right}>
        {user && <span style={styles.user}>👤 {user.name}</span>}
        <button onClick={handleLogout} style={styles.logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

const styles = {
  navbar: {
    height: "60px",
    background: "#1b5e20",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 1.5rem",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000
  },
  toggle: {
    fontSize: "18px",
    background: "transparent",
    color: "white",
    border: "none",
    cursor: "pointer"
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "1rem"
  },
  user: {
    fontSize: "14px"
  },
  logout: {
    background: "#c62828",
    border: "none",
    color: "white",
    padding: "6px 10px",
    borderRadius: "4px",
    cursor: "pointer"
  }
};

export default Navbar;