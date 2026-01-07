import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function DriverDashboard() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100 px-4 py-8">
        <div className="max-w-4xl mx-auto">

          {/* HEADER */}
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            Driver Dashboard
          </h2>

          {/* DASHBOARD GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/* BIO DATA */}
            <div
              onClick={() => navigate("/driver/profile")}
              className="cursor-pointer bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition"
            >
              <div className="text-4xl mb-3">🧑‍✈️</div>
              <h3 className="text-lg font-semibold text-gray-800">
                Bio Data
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                View and update personal details
              </p>
            </div>

            {/* HEALTH / TRAINING */}
            <div
              onClick={() => navigate("/driver/health")}
              className="cursor-pointer bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition"
            >
              <div className="text-4xl mb-3">🩺</div>
              <h3 className="text-lg font-semibold text-gray-800">
                Health / Training
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Medical & training records
              </p>
            </div>

            {/* LR DETAILS */}
            <div
              onClick={() => navigate("/driver/lr")}
              className="cursor-pointer bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition"
            >
              <div className="text-4xl mb-3">📄</div>
              <h3 className="text-lg font-semibold text-gray-800">
                LR Details
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Learning & route certifications
              </p>
            </div>

            {/* DAILY ACTIVITY */}
            <div
              onClick={() => navigate("/driver/daily")}
              className="cursor-pointer bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition"
            >
              <div className="text-4xl mb-3">📝</div>
              <h3 className="text-lg font-semibold text-gray-800">
                Daily Activity
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Sign-in, sign-out & duty logs
              </p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
