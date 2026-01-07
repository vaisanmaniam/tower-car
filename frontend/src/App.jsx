import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import DriverDashboard from "./pages/DriverDashboard";
// import BioData from "./pages/BioData";
import DailyActivity from "./pages/DailyActivity";
import DepotManagerDashboard from "./pages/DepotManagerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import DriverLR from "./pages/DriverLR";
import DriverHealth from "./pages/DriverHealth";
import DriverProfile from "./pages/DriverProfile";
import DriverDetails from "./pages/DriverDetails";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/driver" element={
        <ProtectedRoute role="DRIVER">
          <DriverDashboard />
        </ProtectedRoute>
      } />

      {/* <Route path="/driver/profile" element={
        <ProtectedRoute role="DRIVER">
          <BioData />
        </ProtectedRoute> */}
      {/* } /> */}

      <Route path="/driver/daily" element={
        <ProtectedRoute role="DRIVER">
          <DailyActivity />
        </ProtectedRoute>
      } />

      <Route path="/manager/driver/:driverId" element={
  <ProtectedRoute role="DEPOT_MANAGER">
    <DriverDetails />
  </ProtectedRoute>
} />


      <Route path="/manager" element={
        <ProtectedRoute role="DEPOT_MANAGER">
          <DepotManagerDashboard />
        </ProtectedRoute>
      } />

      <Route path="/admin" element={
        <ProtectedRoute role="SUPER_ADMIN">
          <AdminDashboard />
        </ProtectedRoute>
      } />


      <Route path="/driver/profile" element={
  <ProtectedRoute role="DRIVER">
    <DriverProfile />
  </ProtectedRoute>
} />

<Route path="/driver/health" element={
  <ProtectedRoute role="DRIVER">
    <DriverHealth />
  </ProtectedRoute>
} />

<Route path="/driver/lr" element={
  <ProtectedRoute role="DRIVER">
    <DriverLR />
  </ProtectedRoute>
} />


    </Routes>

  );
}
