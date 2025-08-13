// src/pages/Dashboard.tsx (or wherever your Dashboard is)

import React, { useEffect, useState } from "react";
import JobList from "../components/list";
import jobsData from "../data/jobs.json";
import { ChevronDownIcon} from "@heroicons/react/24/outline";


interface JobType {
  title: string;
  description: string;
  company: string;
  image: string;
  about: {
    location: string;
    categories: string[];
    required_skills: string[];
  };
  // Add other fields from your JSON if needed
}

const Dashboard: React.FC = () => {
  const [jobs, setJobs] = useState<JobType[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      // jobsData is an object { job_postings: JobType[] }
      setJobs(jobsData.job_postings);
    } catch (err) {
      console.error("Failed to load jobs:", err);
      setError("Could not load job data.");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex flex-col items-center">
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Opportunities</h1>
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm text-gray-500">Showing 73 results</p>
          <div className="text-sm text-gray-600 ml-4">
            Sort by:{" "}
            <span className="font-medium">
              <strong className="inline-flex items-center space-x-1">
                <span>Most relevant</span>
                <ChevronDownIcon className="w-4 h-4 text-black" />
              </strong>
            </span>
          </div>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {jobs.length === 0 && !error ? (
          <p className="text-center text-gray-500">Loading opportunities...</p>
        ) : (
          <JobList jobs={jobs} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
