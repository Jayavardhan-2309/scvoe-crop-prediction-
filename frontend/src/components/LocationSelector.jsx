import { useLocationContext } from "../context/LocationContext";

const STATES = {
  Karnataka: ["South", "North"],
  Telangana: ["South", "Central"],
  Maharashtra: ["West", "Vidarbha"]
};

function LocationSelector() {
  const { location, setLocation } = useLocationContext();

  function handleStateChange(e) {
    setLocation({
      ...location,
      state: e.target.value,
      region: ""
    });
  }

  function handleRegionChange(e) {
    setLocation({
      ...location,
      region: e.target.value
    });
  }

  return (
    <div style={styles.box}>
      <h3>📍 Select Your Location</h3>

      <select value={location.state} onChange={handleStateChange}>
        <option value="">Select State</option>
        {Object.keys(STATES).map((state) => (
          <option key={state} value={state}>{state}</option>
        ))}
      </select>

      <select
        value={location.region}
        onChange={handleRegionChange}
        disabled={!location.state}
      >
        <option value="">Select Region</option>
        {location.state &&
          STATES[location.state].map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
      </select>
    </div>
  );
}

const styles = {
  box: {
    background: "#fff",
    padding: "16px",
    borderRadius: "8px",
    marginBottom: "20px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    display: "flex",
    gap: "12px",
    alignItems: "center"
  }
};

export default LocationSelector;
