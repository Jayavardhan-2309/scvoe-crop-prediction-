import { useNavigate, useLocation } from "react-router-dom";

function Sidebar({ collapsed }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      style={{
        ...styles.sidebar,
        width: collapsed ? "60px" : "220px"
      }}
    >
      <SidebarItem
        icon="📊"
        label="Dashboard"
        collapsed={collapsed}
        active={location.pathname === "/"}
        onClick={() => navigate("/")}
      />

      <SidebarItem
        icon="🌾"
        label="Crops"
        collapsed={collapsed}
        active={location.pathname === "/crops"}
        onClick={() => navigate("/crops")}
      />

      <SidebarItem
        icon="🧠"
        label="Insights"
        collapsed={collapsed}
        active={location.pathname === "/insights"}
        onClick={() => navigate("/insights")}
      />

      <SidebarItem
        icon="⚙"
        label="Settings"
        collapsed={collapsed}
        active={location.pathname === "/settings"}
        onClick={() => navigate("/settings")}
      />
    </div>
  );
}

function SidebarItem({ icon, label, collapsed, onClick, active }) {
  return (
    <div
      onClick={onClick}
      style={{
        ...styles.item,
        justifyContent: collapsed ? "center" : "flex-start",
        background: active ? "#1b5e20" : "transparent"
      }}
    >
      <span style={styles.icon}>{icon}</span>
      {!collapsed && <span style={styles.label}>{label}</span>}
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
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "0.8rem",
    cursor: "pointer",
    borderRadius: "6px"
  },
  icon: {
    fontSize: "18px",
    minWidth: "24px",
    textAlign: "center"
  },
  label: {
    whiteSpace: "nowrap",
    fontSize: "14px"
  }
};

export default Sidebar;
