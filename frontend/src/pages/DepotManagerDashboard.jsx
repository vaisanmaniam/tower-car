import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function DepotManagerDashboard() {
  const [drivers, setDrivers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/depot/drivers")
      .then(res => setDrivers(res.data))
      .catch(() => alert("Failed to load drivers"));
  }, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100 px-4 py-8">
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6">

          {/* HEADER */}
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Depot Manager Dashboard
          </h2>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-100 text-gray-700 text-sm">
                <tr>
                  <th className="px-4 py-2 border">PF No</th>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Depot</th>
                  <th className="px-4 py-2 border text-center">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {drivers.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center py-6 text-gray-500">
                      No drivers assigned to this depot
                    </td>
                  </tr>
                )}

                {drivers.map(d => (
                  <tr
                    key={d._id}
                    className="hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-2 border">{d.pfNo}</td>
                    <td className="px-4 py-2 border">{d.name}</td>
                    <td className="px-4 py-2 border">{d.depotName}</td>
                    <td className="px-4 py-2 border text-center">
                      <button
                        onClick={() =>
                          navigate(`/manager/driver/${d._id}`)
                        }
                        className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-blue-700 transition"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </>
  );
}
