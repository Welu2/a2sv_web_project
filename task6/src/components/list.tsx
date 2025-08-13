import React from "react";
import JobCard from "./JobCard";

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
}

interface JobListProps {
  jobs: JobType[];
}

const JobList: React.FC<JobListProps> = ({ jobs }) => {
  return (
    <div className="flex flex-col items-center space-y-6">
      {jobs.map((job, index) => (
        <JobCard
          key={index}
          id={index} // ✅ Pass the index as the job ID
          title={job.title}
          organization={job.company}
          location={job.about.location}
          description={job.description}
          tags={[...job.about.categories, ...job.about.required_skills]}
          avatar={job.image}
        />
      ))}
    </div>
  );
};

export default JobList;
