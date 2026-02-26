import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md text-center">
        <h1 className="text-3xl font-bold mb-4">
          Job Tracker AI
        </h1>
        <p className="text-gray-600 mb-6">
          Track applications. Stay organized. Reduce stress.
        </p>

        <Link
          href="/dashboard"
          className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
        >
          Go to Dashboard
        </Link>
      </div>
    </main>
  );
}