import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function DriverProfile() {
  const [form, setForm] = useState({
    designation: "",
    basicPay: "",
    dateOfEntry: "",
    dateOfAppointment: ""
  });

  useEffect(() => {
    api.get("/driver/profile").then(res => {
      setForm({
        designation: res.data.designation || "",
        basicPay: res.data.basicPay || "",
        dateOfEntry: res.data.dateOfEntry?.substring(0, 10) || "",
        dateOfAppointment: res.data.dateOfAppointment?.substring(0, 10) || ""
      });
    });
  }, []);

  const save = async () => {
    await api.put("/driver/profile", form);
    alert("Bio Data Saved");
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100 px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6">

          {/* HEADER */}
          <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
            Driver Bio Data
          </h2>

          {/* FORM */}
          <div className="space-y-5">

            {/* DESIGNATION */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Designation
              </label>
              <input
                type="text"
                placeholder="Enter Designation"
                value={form.designation}
                onChange={e =>
                  setForm({ ...form, designation: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* BASIC PAY */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Basic Pay
              </label>
              <input
                type="number"
                placeholder="Enter Basic Pay"
                value={form.basicPay}
                onChange={e =>
                  setForm({ ...form, basicPay: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* DATE OF ENTRY */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date of Entry
              </label>
              <input
                type="date"
                value={form.dateOfEntry}
                onChange={e =>
                  setForm({ ...form, dateOfEntry: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* DATE OF APPOINTMENT */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date of Appointment
              </label>
              <input
                type="date"
                value={form.dateOfAppointment}
                onChange={e =>
                  setForm({ ...form, dateOfAppointment: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* SAVE BUTTON */}
            <button
              onClick={save}
              className="w-full bg-green-600 text-white py-2.5 rounded-lg font-semibold hover:bg-green-700 transition duration-200 shadow-md"
            >
              Save Bio Data
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
