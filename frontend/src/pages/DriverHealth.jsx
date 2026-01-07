import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function DriverHealth() {
  const [training, setTraining] = useState({
    section: "",
    doneDate: "",
    dueDate: "",
    schedule: ""
  });

  useEffect(() => {
    api.get("/driver/profile").then(res => {
      setTraining(res.data.training || {});
    });
  }, []);

  const save = async () => {
    await api.put("/driver/profile", { training });
    alert("Training details saved");
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100 px-4 py-8">
        <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-6">

          {/* HEADER */}
          <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
            Health / Training Details
          </h2>

          {/* FORM */}
          <div className="space-y-5">

            {/* SECTION */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Training Section
              </label>
              <input
                type="text"
                placeholder="Enter Section (e.g. Diesel, Electric)"
                value={training.section || ""}
                onChange={e =>
                  setTraining({ ...training, section: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* DONE DATE */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Done Date
              </label>
              <input
                type="date"
                value={training.doneDate?.substring(0, 10) || ""}
                onChange={e =>
                  setTraining({ ...training, doneDate: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* DUE DATE */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Due Date
              </label>
              <input
                type="date"
                value={training.dueDate?.substring(0, 10) || ""}
                onChange={e =>
                  setTraining({ ...training, dueDate: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* SCHEDULE */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Schedule
              </label>
              <input
                type="text"
                placeholder="Enter Schedule (e.g. Annual / 2 Years)"
                value={training.schedule || ""}
                onChange={e =>
                  setTraining({ ...training, schedule: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* SAVE BUTTON */}
            <button
              onClick={save}
              className="w-full bg-emerald-600 text-white py-2.5 rounded-lg font-semibold hover:bg-emerald-700 transition duration-200 shadow-md"
            >
              Save Training Details
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
