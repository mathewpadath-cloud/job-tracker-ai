export type Application = {
  id: string;
  company: string;
  role: string;
  status: "Applied" | "Interview" | "Offer" | "Rejected";
  jobUrl?: string;
  dateApplied?: string; // YYYY-MM-DD
  notes?: string;
};

const KEY = "job-tracker-ai:applications";

export function getApplications(): Application[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as Application[];
  } catch {
    return [];
  }
}

export function saveApplications(apps: Application[]) {
  localStorage.setItem(KEY, JSON.stringify(apps));
}

export function seedIfEmpty() {
  const existing = getApplications();
  if (existing.length > 0) return;

  const starter: Application[] = [
    { id: "1", company: "Capital One", role: "BA Rotational", status: "Applied" },
    { id: "2", company: "IBM", role: "Software Engineer", status: "Interview" },
  ];
  saveApplications(starter);
}