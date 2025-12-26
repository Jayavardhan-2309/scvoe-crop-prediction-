import { createContext, useContext, useEffect, useState } from "react";

const LocationContext = createContext(null);

export function LocationProvider({ children }) {
  const [location, setLocation] = useState(() => {
    const saved = localStorage.getItem("location");
    return saved ? JSON.parse(saved) : {
      state: "",
      region: "",
      rainfallType: "Normal",
      cyclone: false
    };
  });

  // 🔐 Persist location
  useEffect(() => {
    localStorage.setItem("location", JSON.stringify(location));
  }, [location]);

  // 🔁 Reset helper
  function clearLocation() {
    localStorage.removeItem("location");
    setLocation({
      state: "",
      region: "",
      rainfallType: "Normal",
      cyclone: false
    });
  }

  return (
    <LocationContext.Provider value={{ location, setLocation, clearLocation }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocationContext() {
  const ctx = useContext(LocationContext);
  if (!ctx) {
    throw new Error("useLocationContext must be used inside LocationProvider");
  }
  return ctx;
}