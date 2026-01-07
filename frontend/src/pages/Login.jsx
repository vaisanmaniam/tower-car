import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Login() {
  const [pfNo, setPfNo] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await api.post("/auth/login", { pfNo, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      if (res.data.role === "DRIVER") navigate("/driver");
      if (res.data.role === "DEPOT_MANAGER") navigate("/manager");
      if (res.data.role === "SUPER_ADMIN") navigate("/admin");
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
      
      {/* CARD */}
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8">

        {/* HEADER */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Railway Management System
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Secure Login Portal
          </p>
        </div>

        {/* FORM */}
        <div className="space-y-5">

          {/* PF NUMBER */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              PF Number
            </label>
            <input
              type="text"
              placeholder="Enter PF Number"
              value={pfNo}
              onChange={e => setPfNo(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* LOGIN BUTTON */}
          <button
            onClick={login}
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 shadow-md"
          >
            Login
          </button>
        </div>

        {/* FOOTER */}
        <div className="text-center mt-6 text-xs text-gray-400">
          © {new Date().getFullYear()} Indian Railways • Secure Access
        </div>
      </div>
    </div>
  );
}
