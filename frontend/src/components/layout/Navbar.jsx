function Navbar({ onToggle }) {
  return (
    <div style={styles.navbar}>
      <button onClick={onToggle} style={styles.toggle}>☰</button>
      <h2 style={{ margin: 0 }}>🌱 SCVOE</h2>
      <div>User</div>
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
    gap: "1rem",
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
  }
};

export default Navbar;