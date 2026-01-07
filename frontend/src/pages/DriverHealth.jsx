import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import Swal from "sweetalert2";
import { HeartPulse, Calendar, ClipboardCheck } from "lucide-react";

export default function DriverHealth() {
  const [training, setTraining] = useState({
    section: "",
    doneDate: "",
    dueDate: "",
    schedule: ""
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get("/driver/profile").then(res => {
      setTraining(res.data.training || {});
    });
  }, []);

  const save = async () => {
    if (!training.section || !training.doneDate || !training.dueDate) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Details",
        text: "Please fill all mandatory training fields",
        confirmButtonColor: "#2563eb",
      });
      return;
    }

    try {
      setSaving(true);

      await api.put("/driver/profile/training", { training });


      Swal.fire({
        icon: "success",
        title: "Training Details Saved",
        text: "Your training compliance has been updated",
        timer: 1400,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Save Failed",
        text: "Unable to save training details. Please try again.",
        confirmButtonColor: "#dc2626",
      });
    } finally {
      setSaving(false);
    }
  };

  const isOverdue =
    training.dueDate &&
    new Date(training.dueDate) < new Date();

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100 px-4 py-6">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-8">

          {/* HEADER */}
          <div className="mb-6 text-center">
            <div className="flex justify-center mb-2">
              <div className="p-3 rounded-full bg-emerald-100">
                <HeartPulse className="text-emerald-700" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-gray-800">
              Health / Training Details
            </h2>
            <p className="text-sm text-gray-500">
              Maintain mandatory training compliance
            </p>
          </div>

          {/* STATUS BANNER */}
          {training.dueDate && (
            <div
              className={`mb-6 p-4 rounded-xl flex items-center gap-3
                ${
                  isOverdue
                    ? "bg-red-50 text-red-700 border border-red-200"
                    : "bg-green-50 text-green-700 border border-green-200"
                }`}
            >
              <ClipboardCheck />
              <p className="text-sm font-medium">
                {isOverdue
                  ? "Training overdue. Immediate action required."
                  : `Training valid till ${training.dueDate.substring(0, 10)}`}
              </p>
            </div>
          )}

          {/* FORM */}
          <div className="space-y-5">

            {/* SECTION */}
            <InputField
              label="Training Section"
              icon={<ClipboardCheck />}
              placeholder="Diesel / Electric / EMU"
              value={training.section || ""}
              onChange={v => setTraining({ ...training, section: v })}
            />

            {/* DONE DATE */}
            <DateField
              label="Training Done Date"
              icon={<Calendar />}
              value={training.doneDate?.substring(0, 10) || ""}
              onChange={v => setTraining({ ...training, doneDate: v })}
            />

            {/* DUE DATE */}
            <DateField
              label="Next Due Date"
              icon={<Calendar />}
              value={training.dueDate?.substring(0, 10) || ""}
              onChange={v => setTraining({ ...training, dueDate: v })}
            />

            {/* SCHEDULE */}
            <InputField
              label="Schedule"
              icon={<ClipboardCheck />}
              placeholder="Annual / 2 Years"
              value={training.schedule || ""}
              onChange={v => setTraining({ ...training, schedule: v })}
            />

            {/* SAVE BUTTON */}
            <button
              onClick={save}
              disabled={saving}
              className={`w-full flex justify-center items-center gap-2 py-2.5 rounded-xl font-semibold text-white transition
                ${
                  saving
                    ? "bg-emerald-400 cursor-not-allowed"
                    : "bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98]"
                }`}
            >
              {saving ? "Saving..." : "Save Training Details"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

/* ------------------ REUSABLE INPUT COMPONENTS ------------------ */

function InputField({ label, icon, value, onChange, placeholder }) {
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
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={e => onChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm
                     focus:ring-2 focus:ring-emerald-600 focus:outline-none"
        />
      </div>
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
                     focus:ring-2 focus:ring-emerald-600 focus:outline-none"
        />
      </div>
    </div>
  );
}
