import React from 'react';
import { Link } from 'react-router-dom';
import JobListItem from './JobListItem';

const JobList = React.memo(({ jobs, pagination }) => {
  return (
    <div className="col-span-1 md:col-span-2">
      <h2 className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 font-bold rounded-t-xl text-xl shadow-md">
        Việc làm mới nhất
      </h2>
      <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-b-xl shadow-lg p-4">
        {jobs.map((job, index) => (
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
        {pagination && pagination}
      </div>
    </div>
  );
});

export default JobList;