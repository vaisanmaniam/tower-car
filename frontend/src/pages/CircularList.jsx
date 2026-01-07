import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function CircularList() {
  const [circulars, setCirculars] = useState([]);

  useEffect(() => {
    api.get("/admin/circulars").then(res => setCirculars(res.data));
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-100 p-6">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">Official Circulars</h2>

          {circulars.length === 0 && (
            <p className="text-gray-500">No circulars available</p>
          )}

          <ul className="space-y-3">
            {circulars.map(c => (
              <li
                key={c._id}
                className="flex justify-between items-center border p-3 rounded"
              >
                <span className="font-medium">{c.title}</span>
<a
  href={c.pdfUrl}
  target="_blank"
  rel="noopener noreferrer"
  className="text-indigo-600 underline"
>
  View / Download
</a>

              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
