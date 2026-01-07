import { useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function DailyActivity() {
  const [station, setStation] = useState("");
  const [hours, setHours] = useState("");
  const [km, setKm] = useState("");
  const [mileage, setMileage] = useState("");

  const signIn = async () => {
    try {
      await api.post("/driver/signin", { station });
      alert("Signed in");
    } catch (e) {
      alert(e.response.data.msg);
    }
  };

  const signOut = async () => {
    try {
      await api.post("/driver/signout", { station, hours, km, mileage });
      alert("Signed out");
    } catch (e) {
      alert(e.response.data.msg);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100 px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6">

          {/* HEADER */}
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Daily Activity
          </h2>

          {/* SIGN IN SECTION */}
          <div className="mb-8 border-b pb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Sign In
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Station
                </label>
                <input
                  type="text"
                  placeholder="Enter Station Name"
                  value={station}
                  onChange={e => setStation(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <button
                onClick={signIn}
                className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md"
              >
                Sign In
              </button>
            </div>
          </div>

          {/* SIGN OUT SECTION */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Sign Out
            </h3>

            <div className="space-y-4">

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Total Hours
                </label>
                <input
                  type="number"
                  placeholder="Enter Hours"
                  value={hours}
                  onChange={e => setHours(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Total KM
                </label>
                <input
                  type="number"
                  placeholder="Enter KM"
                  value={km}
                  onChange={e => setKm(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Mileage
                </label>
                <input
                  type="number"
                  placeholder="Enter Mileage"
                  value={mileage}
                  onChange={e => setMileage(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <button
                onClick={signOut}
                className="w-full bg-emerald-600 text-white py-2.5 rounded-lg font-semibold hover:bg-emerald-700 transition shadow-md"
              >
                Sign Out
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
