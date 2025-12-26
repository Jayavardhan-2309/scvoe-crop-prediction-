// import { useEffect, useState } from "react";
// import DashboardLayout from "./components/layout/DashboardLayout";
// import RecommendationCards from "./components/RecommendationCards";
// import { getRecommendations } from "./api/recommendApi";
// import YieldChart from "./components/YieldChart";


// function App() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     getRecommendations().then(res => {
//       console.log("Chart data:", res.recommendations);
//       setData(res.recommendations);
//     });
//   }, []);


//   useEffect(() => {
//     getRecommendations().then(res => {
//       setData(res.recommendations);
//     });
//   }, []);

//   return (
//     <DashboardLayout>
//       <h1>Crop Recommendations</h1>
//       <RecommendationCards data={data} />
//       <YieldChart data={data} />
//     </DashboardLayout>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import DashboardLayout from "./components/layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Crops from "./pages/Crops";
import Insights from "./pages/Insights";




function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected app routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Settings />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/crops"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Crops />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/insights"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Insights />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
