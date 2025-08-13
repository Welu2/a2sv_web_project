import React from "react";
import { useParams } from "react-router-dom";
import jobsData from "../data/jobs.json";
import {
  PlusIcon,
  FireIcon,
  MapPinIcon,
  CalendarDaysIcon,
  CheckIcon,
 
} from "@heroicons/react/24/outline";

const JobDetail: React.FC = () => {
  const { id } = useParams();
  const jobIndex = parseInt(id || "", 10);
  const job = jobsData.job_postings[jobIndex];

  if (!job) {
    return <div className="text-center text-red-500">Job not found</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white mt-10 grid md:grid-cols-3 gap-8">
      {/* Left: Main Job Info */}
      <div className="md:col-span-2">
        <h2 className="text-2xl font-bold mb-4">Description</h2>
        <p className="mb-4 text-gray-700">{job.description}</p>

        <h2 className="text-2xl font-bold mb-4">Responsibilities</h2>
        <ul className="mb-4 space-y-2">
          {job.responsibilities?.map((r, i) => (
            <li key={i} className="flex items-center space-x-2">
              <span className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-green-500 text-green-500">
                <CheckIcon className="w-3 h-3" />
              </span>
              <span>{r}</span>
            </li>
          ))}
        </ul>

        <h2 className="text-2xl font-bold mb-4">Ideal Candidate we want</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>
              Young {job.ideal_candidate.age} {job.ideal_candidate.gender}{" "}
              {job.title}
            </strong>
          </li>
          {job.ideal_candidate?.traits.map((trait, i) => {
            const [boldPart, ...rest] = trait.split(":");
            return (
              <li key={i}>
                <strong>{boldPart}:</strong> {rest.join(":").trim()}
              </li>
            );
          })}
        </ul>

        <h2 className="text-2xl font-bold mb-4 mt-6">When & Where</h2>
        <p className="mb-4 flex items-center gap-2 text-gray-700">
          <span className="flex items-center justify-center w-6 h-6 bg-white rounded-full shadow">
            <MapPinIcon className="w-4 h-4 text-blue-600" />
          </span>
          {job.when_where}
        </p>
      </div>

      {/* Right: About Section */}
      <div className="bg-white rounded-lg p-6 ">
        <h2 className="text-xl font-bold mb-4">About</h2>
        <ul className="space-y-4 text-sm">
          <li className="flex items-start gap-3">
            <span className="flex items-center justify-center w-8 h-8 bg-white rounded-full shadow text-blue-600">
              <PlusIcon className="w-5 h-5" />
            </span>
            <div>
              <p className="text-gray-500">Posted On</p>
              <p className="text-gray-800 font-medium">{job.about.posted_on}</p>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <span className="flex items-center justify-center w-8 h-8 bg-white rounded-full shadow text-blue-500">
              <FireIcon className="w-5 h-5" />
            </span>
            <div>
              <p className="text-gray-500">Deadline</p>
              <p className="text-gray-800 font-medium">{job.about.deadline}</p>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <span className="flex items-center justify-center w-8 h-8 bg-white rounded-full shadow text-blue-600">
              <MapPinIcon className="w-5 h-5" />
            </span>
            <div>
              <p className="text-gray-500">Location</p>
              <p className="text-gray-800 font-medium">{job.about.location}</p>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <span className="flex items-center justify-center w-8 h-8 bg-white rounded-full shadow text-blue-600">
              <CalendarDaysIcon className="w-5 h-5" />
            </span>
            <div>
              <p className="text-gray-500">Start Date</p>
              <p className="text-gray-800 font-medium">
                {job.about.start_date}
              </p>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <span className="flex items-center justify-center w-8 h-8 bg-white rounded-full shadow text-blue-600">
              <CalendarDaysIcon className="w-5 h-5" />
            </span>
            <div>
              <p className="text-gray-500">End Date</p>
              <p className="text-gray-800 font-medium">{job.about.end_date}</p>
            </div>
          </li>
        </ul>
        <h2 className="text-xl font-semibold mt-6 mb-2">Categories</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {job.about.categories.map((cat, i) => (
            <span
              key={i}
              className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800"
            >
              {cat}
            </span>
          ))}
        </div>
        <h2 className=" text-xl font-semibold mt-6 mb-2">Required Skills</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {job.about.required_skills.map((skill, i) => (
            <span
              key={i}
              className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800 border border-gray-300"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
