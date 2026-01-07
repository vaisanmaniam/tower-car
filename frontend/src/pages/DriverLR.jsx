import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import Swal from "sweetalert2";
import { FileText, Calendar, AlertTriangle } from "lucide-react";

export default function DriverLR() {
  const [lr, setLr] = useState({
    doneDate: "",
    dueDate: "",
    schedule: ""
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get("/driver/profile").then(res => {
      setLr(res.data.lrDetails || {});
    });
  }, []);

  const save = async () => {
    if (!lr.doneDate || !lr.dueDate) {
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please fill LR done date and due date",
        confirmButtonColor: "#4f46e5",
      });
      return;
    }

    try {
      setSaving(true);

     await api.put("/driver/profile/lr", { lrDetails: lr });


      Swal.fire({
        icon: "success",
        title: "LR Details Saved",
        text: "Loco Running validity updated successfully",
        timer: 1400,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Save Failed",
        text: "Unable to save LR details. Try again.",
        confirmButtonColor: "#dc2626",
      });
    } finally {
      setSaving(false);
    }
  };

  const isOverdue =
    lr.dueDate && new Date(lr.dueDate) < new Date();

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100 px-4 py-6">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-8">

          {/* HEADER */}
          <div className="text-center mb-6">
            <div className="flex justify-center mb-2">
              <div className="p-3 rounded-full bg-indigo-100">
                <FileText className="text-indigo-700" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-gray-800">
              LR (Loco Running) Details
            </h2>
            <p className="text-sm text-gray-500">
              Maintain mandatory LR compliance
            </p>
          </div>

          {/* STATUS BANNER */}
          {lr.dueDate && (
            <div
              className={`mb-6 p-4 rounded-xl flex items-center gap-3
                ${
                  isOverdue
                    ? "bg-red-50 text-red-700 border border-red-200"
                    : "bg-green-50 text-green-700 border border-green-200"
                }`}
            >
              <AlertTriangle />
              <p className="text-sm font-medium">
                {isOverdue
                  ? "LR overdue. Driver not eligible for duty."
                  : `LR valid till ${lr.dueDate.substring(0, 10)}`}
              </p>
            </div>
          )}

          {/* FORM */}
          <div className="space-y-5">

            {/* DONE DATE */}
            <DateField
              label="LR Done Date"
              icon={<Calendar />}
              value={lr.doneDate?.substring(0, 10) || ""}
              onChange={v => setLr({ ...lr, doneDate: v })}
            />

            {/* DUE DATE */}
            <DateField
              label="LR Due Date"
              icon={<Calendar />}
              value={lr.dueDate?.substring(0, 10) || ""}
              onChange={v => setLr({ ...lr, dueDate: v })}
            />

            {/* SCHEDULE */}
            <InputField
              label="Schedule"
              placeholder="Annual / 6 Months"
              value={lr.schedule || ""}
              onChange={v => setLr({ ...lr, schedule: v })}
            />

            {/* SAVE BUTTON */}
            <button
              onClick={save}
              disabled={saving}
              className={`w-full flex justify-center items-center gap-2 py-2.5 rounded-xl font-semibold text-white transition
                ${
                  saving
                    ? "bg-indigo-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98]"
                }`}
            >
              {saving ? "Saving..." : "Save LR Details"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

/* ------------------ REUSABLE INPUT COMPONENTS ------------------ */

function InputField({ label, value, onChange, placeholder }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">
        {label}
      </label>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        className="w-full px-4 py-2.5 border rounded-lg text-sm
                   focus:ring-2 focus:ring-indigo-600 focus:outline-none"
      />
    </div>
  );
}

function DateField({ label, icon, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-2.5 text-gray-400">
          {icon}
        </span>
        <input
          type="date"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm
                     focus:ring-2 focus:ring-indigo-600 focus:outline-none"
        />
      </div>
    </div>
  );
}
