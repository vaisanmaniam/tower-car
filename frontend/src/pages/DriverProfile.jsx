import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import Swal from "sweetalert2";

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
    await api.put("/driver/profile/bio", form);
    Swal.fire("Saved", "Bio data updated", "success");
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-100 p-6">
        <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">Driver Bio Data</h2>

          {Object.keys(form).map(k => (
            <input
              key={k}
              className="w-full border p-2 mb-3"
              placeholder={k}
              value={form[k]}
              onChange={e => setForm({ ...form, [k]: e.target.value })}
            />
          ))}

          <button
            onClick={save}
            className="w-full bg-green-600 text-white py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
}
