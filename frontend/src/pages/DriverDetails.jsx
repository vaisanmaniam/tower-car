import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import {
  User,
  Building2,
  IdCard,
  ClipboardList,
  Activity,
  FileText
} from "lucide-react";

export default function DriverDetails() {
  const { driverId } = useParams();
  const [data, setData] = useState(null);
  const [logs, setLogs] = useState([]);

useEffect(() => {
  api.get(`/depot/driver/${driverId}`).then(res => {
    setData(res.data);
    setLogs(res.data.logs || []);
  });
}, [driverId]);


  useEffect(() => {
    if (!data?.pfNo) return;

    api.get("/depot/daily-logs")
      .then(res => {
        const driverLogs = res.data.find(d => d.pfNo === data.pfNo);
        if (driverLogs) setLogs(driverLogs.dailyLogs);
      });
  }, [data?.pfNo]);

  if (!data)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading driver details...
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-8">

        {/* HEADER */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            Driver Details
          </h2>
          <p className="text-sm text-gray-500">
            Complete profile & duty records (Read-Only)
          </p>
        </div>

        {/* BASIC INFO */}
        <Section title="Basic Information" icon={<User />}>
          <InfoGrid>
            <InfoCard label="Name" value={data.name} icon={<User />} />
            <InfoCard label="PF Number" value={data.pfNo} icon={<IdCard />} />
            <InfoCard label="Depot" value={data.depotName} icon={<Building2 />} />
          </InfoGrid>
        </Section>

        {/* BIO DATA */}
        <Section title="Bio Data" icon={<ClipboardList />}>
          <InfoGrid>
            <InfoCard
              label="Designation"
              value={data.profile.designation || "-"}
            />
            <InfoCard
              label="Basic Pay"
              value={data.profile.basicPay || "-"}
            />
          </InfoGrid>
        </Section>

        {/* TRAINING */}
        <Section title="Training Details" icon={<Activity />}>
          <InfoGrid>
            <InfoCard
              label="Section"
              value={data.profile.training?.section || "-"}
            />
            <InfoCard
              label="Training Due Date"
              value={
                data.profile.training?.dueDate
                  ? data.profile.training.dueDate.substring(0, 10)
                  : "-"
              }
            />
          </InfoGrid>
        </Section>

        {/* LR DETAILS */}
        <Section title="LR Details" icon={<FileText />}>
          <InfoGrid>
            <InfoCard
              label="LR Due Date"
              value={
                data.profile.lrDetails?.dueDate
                  ? data.profile.lrDetails.dueDate.substring(0, 10)
                  : "-"
              }
            />
          </InfoGrid>
        </Section>

        {/* DAILY LOGS */}
        <Section title="Daily Duty Logs" icon={<ClipboardList />}>
          <div className="overflow-x-auto rounded-xl border">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100 text-gray-700">
                <tr>
                  <TableHead>Date</TableHead>
                  <TableHead>Sign In</TableHead>
                  <TableHead>Sign Out</TableHead>
                  <TableHead>KM</TableHead>
                  <TableHead>Hours</TableHead>
                </tr>
              </thead>
              <tbody>
                {logs.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center py-6 text-gray-500">
                      No duty logs available
                    </td>
                  </tr>
                )}

                {logs.map(log => (
                  <tr
                    key={log._id}
                    className="hover:bg-slate-50 transition"
                  >
                    <TableCell>
                      {log.logDate.substring(0, 10)}
                    </TableCell>
                    <TableCell>
                      {new Date(log.signInTime).toLocaleTimeString()}
                    </TableCell>
                    <TableCell>
                      {log.signOutTime
                        ? new Date(log.signOutTime).toLocaleTimeString()
                        : "-"}
                    </TableCell>
                    <TableCell center>{log.km || "-"}</TableCell>
                    <TableCell center>{log.hours || "-"}</TableCell>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

      </div>
    </div>
  );
}

/* -------------------- REUSABLE UI COMPONENTS -------------------- */

function Section({ title, icon, children }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <div className="text-blue-700">{icon}</div>
        <h3 className="text-lg font-semibold text-gray-800">
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
}

function InfoGrid({ children }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {children}
    </div>
  );
}

function InfoCard({ label, value, icon }) {
  return (
    <div className="bg-slate-50 rounded-xl p-4 shadow-sm">
      <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
        {icon && <span className="text-gray-400">{icon}</span>}
        {label}
      </p>
      <p className="font-semibold text-gray-800">
        {value}
      </p>
    </div>
  );
}

function TableHead({ children }) {
  return (
    <th className="px-3 py-3 border-b text-left font-semibold">
      {children}
    </th>
  );
}

function TableCell({ children, center }) {
  return (
    <td
      className={`px-3 py-2 border-b ${
        center ? "text-center" : "text-left"
      }`}
    >
      {children}
    </td>
  );
}
