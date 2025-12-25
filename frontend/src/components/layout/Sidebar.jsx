function Sidebar({ collapsed }) {
  return (
    <div style={{
      ...styles.sidebar,
      width: collapsed ? "60px" : "220px"
    }}>
      <div style={styles.item}>📊</div>
      <div style={styles.item}>🌾</div>
      <div style={styles.item}>🧠</div>
      <div style={styles.item}>⚙</div>
    </div>
  );
}

const styles = {
  sidebar: {
    background: "#2e7d32",
    color: "white",
    height: "calc(100vh - 60px)",
    position: "fixed",
    top: "60px",
    left: 0,
    padding: "0.5rem",
    transition: "width 0.3s"
  },
  item: {
    padding: "0.8rem",
    cursor: "pointer",
    textAlign: "center"
  }
};

export default Sidebar;
