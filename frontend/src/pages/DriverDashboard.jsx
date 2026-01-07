import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../api/axios";
import {
  User,
  HeartPulse,
  FileText,
  ClipboardList,
  AlertTriangle,
} from "lucide-react";
import Swal from "sweetalert2";

export default function DriverDashboard() {
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    api.get("/driver/alerts").then(res => setAlerts(res.data));
  }, []);

  useEffect(() => {
  api.get("/driver/duty-status").then(res => {
    if (res.data.status === "INCOMPLETE") {
      Swal.fire({
        icon: "warning",
        title: "Previous Duty Not Completed",
        text: "Please complete sign-out for yesterday or contact supervisor.",
        confirmButtonColor: "#dc2626"
      });
    }

    if (res.data.status === "COMPLETED") {
      Swal.fire({
        icon: "success",
        title: "Duty Completed",
        text: "Yesterday’s duty was completed successfully.",
        timer: 1500,
        showConfirmButton: false
      });
    }
  });
}, []);

  const hasTrainingAlert = alerts.some(a => a.type === "TRAINING");
  const hasLRAlert = alerts.some(a => a.type === "LR");

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100 px-4 py-6">
        <div className="max-w-6xl mx-auto">

          <h2 className="text-2xl font-bold mb-1">Driver Dashboard</h2>
          <p className="text-sm text-gray-500 mb-6">
            Duty, compliance & records overview
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <StatusCard
              title="Training"
              status={hasTrainingAlert ? "Overdue" : "Valid"}
              color={hasTrainingAlert ? "red" : "green"}
            />
            <StatusCard
              title="LR"
              status={hasLRAlert ? "Overdue" : "Valid"}
              color={hasLRAlert ? "red" : "green"}
            />
            <div className="bg-white p-4 rounded-xl shadow flex gap-3 items-center">
              <AlertTriangle className="text-yellow-500" />
              <div>
                <p className="text-sm text-gray-500">Alerts</p>
                <p className="font-semibold">{alerts.length || "No"} Active</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card title="Bio Data" icon={<User />} onClick={() => navigate("/driver/profile")} />
            <Card title="Health / Training" icon={<HeartPulse />} onClick={() => navigate("/driver/health")} />
            <Card title="LR Details" icon={<FileText />} onClick={() => navigate("/driver/lr")} />
            <Card title="Daily Activity" icon={<ClipboardList />} onClick={() => navigate("/driver/daily")} />
          </div>
        </div>
      </div>
    </>
  );
}

function StatusCard({ title, status, color }) {
  return (
    <div className={`bg-white p-4 rounded-xl shadow border-l-4 border-${color}-600`}>
      <p className="text-sm text-gray-500">{title}</p>
      <p className={`font-semibold text-${color}-700`}>{status}</p>
    </div>
  );
}

function Card({ title, icon, onClick }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-white p-6 rounded-2xl shadow hover:shadow-xl transition"
    >
      <div className="w-12 h-12 bg-blue-100 text-blue-700 flex items-center justify-center rounded-xl">
        {icon}
      </div>
      <h3 className="mt-3 font-semibold">{title}</h3>
    </div>
  );
}
