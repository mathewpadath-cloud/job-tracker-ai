"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Application,
  getApplications,
  seedIfEmpty,
  saveApplications,
} from "../lib/storage";

export default function Dashboard() {
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    seedIfEmpty();
    setApplications(getApplications());
  }, []);

function handleDelete(id: string) {
  const app = applications.find((a) => a.id === id);
  const ok = window.confirm(
    `Delete "${app?.company ?? "this"} - ${app?.role ?? "application"}"? This can't be undone.`
  );
  if (!ok) return;

  const updated = applications.filter((a) => a.id !== id);
  setApplications(updated);
  saveApplications(updated);
}

  return (
    <main className="min-h-screen p-10 bg-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

        <div className="space-x-6">
          <Link href="/" className="text-blue-700 hover:underline">
            Home
          </Link>

          <Link
            href="/new"
            className="px-5 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            + New Application
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <table className="w-full text-left text-gray-800">
          <thead>
            <tr className="border-b-2 border-gray-300">
              <th className="py-3 font-semibold">Company</th>
              <th className="py-3 font-semibold">Role</th>
              <th className="py-3 font-semibold">Status</th>
              <th className="py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr
                key={app.id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3">{app.company}</td>
                <td className="py-3">{app.role}</td>
                <td className="py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      app.status === "Applied"
                        ? "bg-blue-100 text-blue-700"
                        : app.status === "Interview"
                        ? "bg-green-100 text-green-700"
                        : app.status === "Offer"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {app.status}
                  </span>
                </td>
                <td className="py-3">
                  <button
                    onClick={() => handleDelete(app.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {applications.length === 0 && (
              <tr>
                <td className="py-6 text-gray-500" colSpan={4}>
                  No applications yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}