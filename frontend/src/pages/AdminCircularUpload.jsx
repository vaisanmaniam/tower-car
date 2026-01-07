import { useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import Swal from "sweetalert2";

export default function AdminCircularUpload() {
  const [title, setTitle] = useState("");
  const [pdf, setPdf] = useState(null);
  const [loading, setLoading] = useState(false);

  const upload = async () => {
    if (!title || !pdf) {
      Swal.fire("Missing Data", "Title and PDF required", "warning");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("pdf", pdf);

    try {
      setLoading(true);
      await api.post("/admin/circulars", formData);
      Swal.fire("Uploaded", "Circular uploaded successfully", "success");
      setTitle("");
      setPdf(null);
    } catch {
      Swal.fire("Error", "Upload failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-100 p-6">
        <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">Upload Circular (PDF)</h2>

          <input
            type="text"
            placeholder="Circular Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full border p-2 mb-3"
          />

          <input
            type="file"
            accept="application/pdf"
            onChange={e => setPdf(e.target.files[0])}
            className="w-full mb-4"
          />

          <button
            onClick={upload}
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded"
          >
            {loading ? "Uploading..." : "Upload Circular"}
          </button>
        </div>
      </div>
    </>
  );
}
