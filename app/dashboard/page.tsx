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

  const [statusFilter, setStatusFilter] = useState<
  "All" | Application["status"]
>("All");

const filteredApplications =
  statusFilter === "All"
    ? applications
    : applications.filter((a) => a.status === statusFilter);

const counts = applications.reduce(
  (acc, a) => {
    acc.total += 1;
    acc[a.status] += 1;
    return acc;
  },
  { total: 0, Applied: 0, Interview: 0, Offer: 0, Rejected: 0 } as {
    total: number;
    Applied: number;
    Interview: number;
    Offer: number;
    Rejected: number;
  }
);

  return (
    <main className="min-h-screen p-10 bg-gray-200">
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

        {/* Stats */}
<div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-6">
  <div className="bg-white rounded-xl shadow p-4">
    <div className="text-sm text-gray-500">Total</div>
    <div className="text-2xl font-bold text-gray-900">{counts.total}</div>
  </div>
  <div className="bg-white rounded-xl shadow p-4">
    <div className="text-sm text-gray-500">Applied</div>
    <div className="text-2xl font-bold text-gray-900">{counts.Applied}</div>
  </div>
  <div className="bg-white rounded-xl shadow p-4">
    <div className="text-sm text-gray-500">Interview</div>
    <div className="text-2xl font-bold text-gray-900">{counts.Interview}</div>
  </div>
  <div className="bg-white rounded-xl shadow p-4">
    <div className="text-sm text-gray-500">Offer</div>
    <div className="text-2xl font-bold text-gray-900">{counts.Offer}</div>
  </div>
  <div className="bg-white rounded-xl shadow p-4">
    <div className="text-sm text-gray-500">Rejected</div>
    <div className="text-2xl font-bold text-gray-900">{counts.Rejected}</div>
  </div>
</div>

{/* Filter */}
<div className="mb-4 flex items-center gap-3">
  <span className="text-sm font-semibold text-gray-800">Filter:</span>
  <select
    className="rounded-lg border border-gray-300 p-2 text-gray-900"
    value={statusFilter}
    onChange={(e) =>
      setStatusFilter(e.target.value as "All" | Application["status"])
    }
  >
    <option value="All">All</option>
    <option value="Applied">Applied</option>
    <option value="Interview">Interview</option>
    <option value="Offer">Offer</option>
    <option value="Rejected">Rejected</option>
  </select>
</div>
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
            {filteredApplications.map((app) => (
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

                <td className="py-3 space-x-4">
                  <Link
                    href={`/edit/${app.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(app.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {filteredApplications.length === 0 && (
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