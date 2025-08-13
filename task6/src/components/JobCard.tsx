import React from "react";
import { Link } from "react-router-dom";

interface JobCardProps {
  id: number;
  title: string;
  organization: string;
  location: string;
  description: string;
  tags: string[];
  avatar: string;
}

function getDirectDriveUrl(viewUrl: string) {
  const match = viewUrl.match(/\/d\/(.+?)\//);
  if (match && match[1]) {
    return `https://drive.google.com/uc?export=view&id=${match[1]}`;
  }
  return viewUrl;
}

const JobCard: React.FC<JobCardProps> = ({
  id,
  title,
  organization,
  location,
  description,
  tags,
  avatar,
}) => {
  const directAvatar = getDirectDriveUrl(avatar);

  return (
    <Link to={`/jobs/${id}`} className="block hover:shadow-lg transition">
      <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-3xl cursor-pointer">
        <div className="flex items-start gap-4">
          <img
            src={directAvatar}
            alt={`${organization} profile`}
            className="w-14 h-14 rounded-full object-cover shadow-md"
          />
          <div>
            <h2 className="text-lg font-semibold text-black">{title}</h2>
            <p className="text-sm text-gray-600">
              {organization} • {location}
            </p>
            <p className="text-sm text-black mt-3 line-clamp-3">
              {description}
            </p>

            <div className="flex gap-2 flex-wrap mt-2">
              <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
                In Person
              </span>
              <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-700">
                Education
              </span>
              <span className="text-xs px-2 py-1 rounded-full border border-black text-gray-800">
                IT
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
