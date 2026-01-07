import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function AdminDashboard() {
  const [depot, setDepot] = useState("");
  const [managers, setManagers] = useState([]);
  const [drivers, setDrivers] = useState([]);

  const loadUsers = async () => {
    const res = await api.get(
      `/admin/users${depot ? `?depot=${depot}` : ""}`
    );
    setManagers(res.data.managers);
    setDrivers(res.data.drivers);
  };

  useEffect(() => {
    loadUsers();
  }, [depot]);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100 px-4 py-8">
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6">

          {/* HEADER */}
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Super Admin Dashboard
          </h2>

          {/* DEPOT FILTER */}
          <div className="mb-8 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <label className="font-medium text-gray-700">
              Filter by Depot
            </label>

            <select
              value={depot}
              onChange={e => setDepot(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">All Depots</option>
              <option value="CBE">CBE</option>
              <option value="PTJ">PTJ</option>
              <option value="MTP">MTP</option>
            </select>
          </div>

          {/* MANAGERS TABLE */}
          <div className="mb-10">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">
              Depot Managers
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Depot
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {managers.length === 0 && (
                    <tr>
                      <td
                        colSpan="3"
                        className="text-center py-4 text-gray-500"
                      >
                        No managers found
                      </td>
                    </tr>
                  )}

                  {managers.map(m => (
                    <tr
                      key={m._id}
                      className="border-t hover:bg-gray-50"
                    >
                      <td className="px-4 py-3">
                        {m.name || "-"}
                      </td>
                      <td className="px-4 py-3">
                        {m.email}
                      </td>
                      <td className="px-4 py-3">
                        {m.depotName}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* DRIVERS TABLE */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-3">
              Drivers
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      PF No
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Depot
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {drivers.length === 0 && (
                    <tr>
                      <td
                        colSpan="3"
                        className="text-center py-4 text-gray-500"
                      >
                        No drivers found
                      </td>
                    </tr>
                  )}

                  {drivers.map(d => (
                    <tr
                      key={d._id}
                      className="border-t hover:bg-gray-50"
                    >
                      <td className="px-4 py-3 font-medium">
                        {d.pfNo}
                      </td>
                      <td className="px-4 py-3">
                        {d.name}
                      </td>
                      <td className="px-4 py-3">
                        {d.depotName}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
