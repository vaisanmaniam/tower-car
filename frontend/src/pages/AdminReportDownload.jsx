import { useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function AdminReportDownload() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [depot, setDepot] = useState("");

  const download = () => {
    window.open(
      `http://localhost:5000/api/admin/reports/download?from=${from}&to=${to}&depot=${depot}`,
      "_blank"
    );
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-100 p-6">
        <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">Download Admin Report</h2>

          <input type="date" onChange={e => setFrom(e.target.value)} className="w-full mb-3" />
          <input type="date" onChange={e => setTo(e.target.value)} className="w-full mb-3" />

          <select onChange={e => setDepot(e.target.value)} className="w-full mb-4">
            <option value="">All Depots</option>
            <option value="CBE">CBE</option>
            <option value="PTJ">PTJ</option>
          </select>

          <button
            onClick={download}
            className="w-full bg-indigo-600 text-white py-2 rounded"
          >
            Download CSV
          </button>
        </div>
      </div>
    </>
  );
}
