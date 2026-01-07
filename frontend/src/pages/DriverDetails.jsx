import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

export default function DriverDetails() {
  const { driverId } = useParams();
  const [data, setData] = useState(null);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    api.get(`/depot/driver/${driverId}`)
      .then(res => setData(res.data));

    api.get("/depot/daily-logs")
      .then(res => {
        const driverLogs = res.data.find(d => d.pfNo === data?.pfNo);
        if (driverLogs) setLogs(driverLogs.dailyLogs);
      });
  }, [driverId, data?.pfNo]);

  if (!data)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading driver details...
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-6">

        {/* HEADER */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Driver Details
        </h2>

        {/* BASIC INFO */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-slate-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-semibold">{data.name}</p>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">PF Number</p>
            <p className="font-semibold">{data.pfNo}</p>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Depot</p>
            <p className="font-semibold">{data.depotName}</p>
          </div>
        </div>

        {/* BIO DATA */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Bio Data
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Designation</p>
              <p className="font-medium">
                {data.profile.designation || "-"}
              </p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Basic Pay</p>
              <p className="font-medium">
                {data.profile.basicPay || "-"}
              </p>
            </div>
          </div>
        </div>

        {/* TRAINING */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Training Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Section</p>
              <p className="font-medium">
                {data.profile.training?.section || "-"}
              </p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Due Date</p>
              <p className="font-medium">
                {data.profile.training?.dueDate
                  ? data.profile.training.dueDate.substring(0, 10)
                  : "-"}
              </p>
            </div>
          </div>
        </div>

        {/* LR DETAILS */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            LR Details
          </h3>
          <div className="bg-slate-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Due Date</p>
            <p className="font-medium">
              {data.profile.lrDetails?.dueDate
                ? data.profile.lrDetails.dueDate.substring(0, 10)
                : "-"}
            </p>
          </div>
        </div>

        {/* DAILY LOGS */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Daily Logs
          </h3>

          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-100 text-gray-700 text-sm">
                <tr>
                  <th className="px-3 py-2 border">Date</th>
                  <th className="px-3 py-2 border">Sign In</th>
                  <th className="px-3 py-2 border">Sign Out</th>
                  <th className="px-3 py-2 border">KM</th>
                  <th className="px-3 py-2 border">Hours</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {logs.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-gray-500">
                      No logs found
                    </td>
                  </tr>
                )}

                {logs.map(l => (
                  <tr key={l._id} className="hover:bg-gray-50">
                    <td className="px-3 py-2 border">
                      {l.logDate.substring(0, 10)}
                    </td>
                    <td className="px-3 py-2 border">
                      {new Date(l.signInTime).toLocaleTimeString()}
                    </td>
                    <td className="px-3 py-2 border">
                      {l.signOutTime
                        ? new Date(l.signOutTime).toLocaleTimeString()
                        : "-"}
                    </td>
                    <td className="px-3 py-2 border text-center">
                      {l.km || "-"}
                    </td>
                    <td className="px-3 py-2 border text-center">
                      {l.hours || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}
