import React from 'react';
import { Link } from 'react-router-dom';
import JobListItem from './JobListItem';

const RelatedJobs = ({ relatedJobs }) => {
  return (
    <div>
      <h3 className="bg-green-600 text-white p-2 font-bold rounded-t-md">
        Công việc gợi ý liên quan
      </h3>
      <div className="bg-white/90 backdrop-blur-sm rounded-b-md shadow-lg p-4">
        {relatedJobs.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {relatedJobs.map((job, index) => (
              <Link
                to={`/job/${job.id}`}
                key={job.id}
                className="block opacity-0 animate-fadeIn"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <JobListItem
                  logo={job.logo}
                  company={job.company}
                  title={job.title}
                  salary={job.salary}
                  location={job.location}
                />
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">Không có công việc liên quan nào.</p>
        )}
      </div>
    </div>
  );
};

export default RelatedJobs;