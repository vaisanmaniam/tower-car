import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function DriverLR() {
  const [lr, setLr] = useState({
    doneDate: "",
    dueDate: "",
    schedule: ""
  });

  useEffect(() => {
    api.get("/driver/profile").then(res => {
      setLr(res.data.lrDetails || {});
    });
  }, []);

  const save = async () => {
    await api.put("/driver/profile", { lrDetails: lr });
    alert("LR details saved");
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100 px-4 py-8">
        <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-6">

          {/* HEADER */}
          <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
            LR Details
          </h2>

          {/* FORM */}
          <div className="space-y-5">

            {/* DONE DATE */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Done Date
              </label>
              <input
                type="date"
                value={lr.doneDate?.substring(0, 10) || ""}
                onChange={e =>
                  setLr({ ...lr, doneDate: e.target.value })
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
                value={lr.dueDate?.substring(0, 10) || ""}
                onChange={e =>
                  setLr({ ...lr, dueDate: e.target.value })
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
                placeholder="Enter Schedule (e.g. Annual / 6 Months)"
                value={lr.schedule || ""}
                onChange={e =>
                  setLr({ ...lr, schedule: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* SAVE BUTTON */}
            <button
              onClick={save}
              className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200 shadow-md"
            >
              Save LR Details
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
