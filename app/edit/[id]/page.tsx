"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Application, getApplications, saveApplications } from "../../lib/storage";

export default function EditApplication() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [jobUrl, setJobUrl] = useState("");
  const [status, setStatus] = useState<Application["status"]>("Applied");
  const [dateApplied, setDateApplied] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const apps = getApplications();
    const found = apps.find((a) => a.id === id);

    if (!found) return;

    setCompany(found.company ?? "");
    setRole(found.role ?? "");
    setJobUrl(found.jobUrl ?? "");
    setStatus(found.status ?? "Applied");
    setDateApplied(found.dateApplied ?? "");
    setNotes(found.notes ?? "");
  }, [id]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!company.trim() || !role.trim()) {
      alert("Company and Role are required.");
      return;
    }

    const apps = getApplications();
    const updated = apps.map((a) =>
      a.id === id
        ? {
            ...a,
            company: company.trim(),
            role: role.trim(),
            jobUrl: jobUrl.trim() || undefined,
            status,
            dateApplied: dateApplied || undefined,
            notes: notes.trim() || undefined,
          }
        : a
    );

    saveApplications(updated);
    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen p-10 bg-gray-200">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Edit Application</h1>
          <div className="space-x-4">
            <Link href="/dashboard" className="text-blue-700 hover:underline">
              ← Dashboard
            </Link>
            <Link href="/" className="text-blue-700 hover:underline">
              Home
            </Link>
          </div>
        </div>

        <form onSubmit={onSubmit} className="bg-white rounded-xl shadow-lg p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-800">Company *</label>
            <input
              className="mt-1 w-full rounded-lg border border-gray-300 p-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g., Capital One"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800">Role *</label>
            <input
              className="mt-1 w-full rounded-lg border border-gray-300 p-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g., Software Engineer"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800">Job URL</label>
            <input
              className="mt-1 w-full rounded-lg border border-gray-300 p-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
              value={jobUrl}
              onChange={(e) => setJobUrl(e.target.value)}
              placeholder="https://..."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-800">Status</label>
              <select
                className="mt-1 w-full rounded-lg border border-gray-300 p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
                value={status}
                onChange={(e) => setStatus(e.target.value as Application["status"])}
              >
                <option>Applied</option>
                <option>Interview</option>
                <option>Offer</option>
                <option>Rejected</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800">Date Applied</label>
              <input
                type="date"
                className="mt-1 w-full rounded-lg border border-gray-300 p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
                value={dateApplied}
                onChange={(e) => setDateApplied(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800">Notes</label>
            <textarea
              className="mt-1 w-full rounded-lg border border-gray-300 p-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Optional notes..."
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-black text-white py-3 hover:bg-gray-800 transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </main>
  );
}