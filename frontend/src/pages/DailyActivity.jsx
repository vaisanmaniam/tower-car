import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import Swal from "sweetalert2";
import {
  LogIn,
  LogOut,
  Clock,
  Route,
  Gauge,
  AlertTriangle,
  MapPin
} from "lucide-react";

export default function DailyActivity() {
  const [station, setStation] = useState("");
  const [hours, setHours] = useState("");
  const [km, setKm] = useState("");
  const [mileage, setMileage] = useState("");
  const [alcoholConsumed, setAlcoholConsumed] = useState(false);
  const [loading, setLoading] = useState(false);

  /* ================= GET CURRENT LOCATION ================= */

  const fetchCurrentLocation = async () => {
    if (!navigator.geolocation) {
      Swal.fire("Error", "Geolocation not supported", "error");
      return;
    }

    Swal.fire({
      title: "Fetching Location",
      text: "Please wait while we detect your current station",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );

          const data = await res.json();

          const locationName =
            data.address?.railway ||
            data.address?.station ||
            data.address?.city ||
            data.display_name;

          setStation(locationName);
          Swal.close();
        } catch {
          Swal.fire("Error", "Unable to resolve location name", "error");
        }
      },
      () => {
        Swal.fire(
          "Permission Denied",
          "Location access is required for duty sign-in",
          "error"
        );
      },
      { enableHighAccuracy: true }
    );
  };

  useEffect(() => {
    fetchCurrentLocation();
  }, []);

  /* ================= SIGN IN ================= */

  const signIn = async () => {
    if (!station) {
      Swal.fire("Location Missing", "Unable to detect station", "warning");
      return;
    }

    try {
      setLoading(true);
      await api.post("/driver/signin", { station });

      Swal.fire({
        icon: "success",
        title: "Signed In",
        text: `Signed in at ${station}`,
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (e) {
      Swal.fire("Error", e.response?.data?.msg || "Sign-in failed", "error");
    } finally {
      setLoading(false);
    }
  };

  /* ================= SIGN OUT ================= */

  const signOut = async () => {
    if (!hours || !km) {
      Swal.fire("Missing Data", "Hours and KM are mandatory", "warning");
      return;
    }

    const confirm = await Swal.fire({
      icon: "warning",
      title: "Confirm Sign Out",
      html: alcoholConsumed
        ? "<b style='color:red'>Alcohol consumption marked as YES</b>"
        : "Alcohol consumption marked as NO",
      showCancelButton: true,
      confirmButtonText: "Confirm Sign Out",
    });

    if (!confirm.isConfirmed) return;

    try {
      setLoading(true);

      await api.post("/driver/signout", {
        station,
        hours,
        km,
        mileage,
        alcoholConsumed
      });

      Swal.fire("Signed Out", "Duty completed successfully", "success");

      setHours("");
      setKm("");
      setMileage("");
      setAlcoholConsumed(false);
    } catch (e) {
      Swal.fire("Error", e.response?.data?.msg || "Sign-out failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100 px-4 py-6">
        <div className="max-w-3xl mx-auto space-y-6">

          <h2 className="text-2xl font-bold text-center">
            Daily Activity
          </h2>

          {/* CURRENT LOCATION */}
          <div className="bg-white p-4 rounded-xl shadow flex items-center gap-3">
            <MapPin className="text-blue-600" />
            <div>
              <p className="text-sm text-gray-500">Current Station</p>
              <p className="font-semibold text-gray-800">
                {station || "Detecting location..."}
              </p>
            </div>
          </div>

          {/* SIGN IN */}
          <ActionCard title="Sign In" icon={<LogIn />} color="blue">
            <ActionButton label="Sign In" onClick={signIn} loading={loading} />
          </ActionCard>

          {/* SIGN OUT */}
          <ActionCard title="Sign Out" icon={<LogOut />} color="red">
            <Input label="Total Hours" value={hours} onChange={setHours} icon={<Clock />} />
            <Input label="Total KM" value={km} onChange={setKm} icon={<Route />} />
            <Input label="Mileage" value={mileage} onChange={setMileage} icon={<Gauge />} />

            <div className="flex items-center gap-2 mt-3 p-3 border rounded-lg bg-red-50">
              <AlertTriangle className="text-red-600" />
              <label className="flex items-center gap-2 text-sm font-semibold">
                <input
                  type="checkbox"
                  checked={alcoholConsumed}
                  onChange={e => setAlcoholConsumed(e.target.checked)}
                />
                Alcohol Consumed During Duty
              </label>
            </div>

            <ActionButton label="Sign Out" onClick={signOut} loading={loading} color="red" />
          </ActionCard>

        </div>
      </div>
    </>
  );
}

/* ================= UI COMPONENTS ================= */

function ActionCard({ title, icon, children }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex items-center gap-2 mb-4 font-semibold">
        {icon}
        {title}
      </div>
      {children}
    </div>
  );
}

function Input({ label, value, onChange, icon }) {
  return (
    <div className="mb-3">
      <label className="text-sm font-semibold">{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-2.5 text-gray-400">{icon}</span>
        <input
          type="number"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg"
        />
      </div>
    </div>
  );
}

function ActionButton({ label, onClick, loading, color = "green" }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`w-full mt-4 py-2 rounded-lg text-white font-semibold transition
        ${color === "red" ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}
        ${loading && "opacity-60 cursor-not-allowed"}`}
    >
      {loading ? "Processing..." : label}
    </button>
  );
}
