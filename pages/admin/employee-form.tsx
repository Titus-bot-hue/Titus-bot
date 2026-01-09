import { useState } from "react";
import { useRouter } from "next/router";

/**
 * NOTE: This page should be protected by authentication (NextAuth)
 * and role-based checks (EMPLOYEE or ADMIN). For brevity this example
 * shows a simple form that posts to /api/admin/employee-submission
 */
export default function EmployeeFormPage() {
  const [formData, setFormData] = useState({ subject: "", notes: "" });
  const [status, setStatus] = useState("");
  const router = useRouter();

  const submit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    const res = await fetch("/api/admin/employee-submission", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "general", payload: formData }),
    });
    if (res.ok) {
      setStatus("Submitted successfully");
      setFormData({ subject: "", notes: "" });
    } else {
      const err = await res.json();
      setStatus("Error: " + (err?.error || res.status));
    }
  };

  return (
    <div style={{ maxWidth: 720, margin: "2rem auto", padding: 20 }}>
      <h1>Employee Submission</h1>
      <form onSubmit={submit}>
        <label>
          Subject
          <input
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            required
            style={{ width: "100%", padding: 8, marginTop: 6 }}
          />
        </label>
        <label style={{ display: "block", marginTop: 12 }}>
          Notes
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            required
            rows={6}
            style={{ width: "100%", padding: 8, marginTop: 6 }}
          />
        </label>

        <div style={{ marginTop: 12 }}>
          <button type="submit">Send</button>
        </div>
      </form>

      {status && <p style={{ marginTop: 12 }}>{status}</p>}
    </div>
  );
}
