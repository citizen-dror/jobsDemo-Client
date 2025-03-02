// src/pages/JobsPage.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../stores/store";
import { loadJobs } from "../stores/jobSlice";
import { Job } from "../types/job";

const JobsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { jobs, loading, error } = useSelector((state: RootState) => state.jobs);

  useEffect(() => {
    dispatch(loadJobs());
  }, [dispatch]);

  return (
    <div>
      <h1>Jobs</h1>
      {loading && <p>Loading jobs...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {/* Ensure jobs is an array before using .map() */}
        {Array.isArray(jobs) && jobs.length > 0 ? (
          jobs.map((job: Job) => (
            <li key={job.id}>
              <strong>{job.jobName}</strong> - Progress: {job.progress}% - Status: {job.status}
            </li>
          ))
        ) : (
          <p>No jobs available.</p>
        )}
      </ul>
    </div>
  );
};

export default JobsPage;
