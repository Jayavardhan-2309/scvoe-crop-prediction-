import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function DashboardLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div>
      <Navbar onToggle={() => setCollapsed(!collapsed)} />
      <Sidebar collapsed={collapsed} />

      <div style={{
        ...styles.content,
        marginLeft: collapsed ? "60px" : "220px"
      }}>
        {children}
      </div>
    </div>
  );
}

const styles = {
  content: {
    marginTop: "60px",
    padding: "1.5rem",
    background: "#f5f7fa",
    minHeight: "100vh",
    transition: "margin-left 0.3s"
  }
};

export default DashboardLayout;