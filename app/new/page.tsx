"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Application, getApplications, saveApplications } from "../lib/storage";

export default function NewApplication() {
  const router = useRouter();

  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [jobUrl, setJobUrl] = useState("");
  const [status, setStatus] = useState<Application["status"]>("Applied");
  const [dateApplied, setDateApplied] = useState("");
  const [notes, setNotes] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!company.trim() || !role.trim()) {
      alert("Please enter Company and Role.");
      return;
    }

    const newApp: Application = {
      id: crypto.randomUUID(),
      company: company.trim(),
      role: role.trim(),
      status,
      jobUrl: jobUrl.trim() || undefined,
      dateApplied: dateApplied || undefined,
      notes: notes.trim() || undefined,
    };

    const existing = getApplications();
    saveApplications([newApp, ...existing]);

    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen p-10 bg-gray-200">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">New Application</h1>
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
            <label className="block text-sm font-medium text-gray-700">Company *</label>
            <input
              className="mt-1 w-full rounded-lg border border-gray-300 p-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g., Capital One"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Role *</label>
            <input
              className="mt-1 w-full rounded-lg border border-gray-300 p-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g., Software Engineer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Job URL</label>
            <input
              className="mt-1 w-full rounded-lg border border-gray-300 p-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
              value={jobUrl}
              onChange={(e) => setJobUrl(e.target.value)}
              placeholder="https://..."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                className="mt-1 w-full rounded-lg border border-gray-300 p-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
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
              <label className="block text-sm font-medium text-gray-700">Date Applied</label>
              <input
                type="date"
                className="mt-1 w-full rounded-lg border border-gray-300 p-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
                value={dateApplied}
                onChange={(e) => setDateApplied(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Notes</label>
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
            Save Application
          </button>
        </form>
      </div>
    </main>
  );
}