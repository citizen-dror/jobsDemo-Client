import { useState, useEffect } from "react";
import { Job, JobPriority, JobStatus } from "../types/job/";

const useFilteredJobs = (jobs: Job[]) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<JobStatus | null>(null);
  const [selectedPriority, setSelectedPriority] = useState<JobPriority | null>(null);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);

  useEffect(() => {
    setFilteredJobs(
      jobs.filter((job) => {
        const matchesSearchTerm = job.jobName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = selectedStatus !== undefined && selectedStatus !== null
        ? job.status === selectedStatus
        : true;
        const matchesPriority = selectedPriority !== undefined && selectedPriority !== null
        ? job.priority === selectedPriority
        : true;
        return matchesSearchTerm && matchesStatus && matchesPriority;
      })
    );
  }, [searchTerm, selectedStatus, selectedPriority, jobs]);

  return {
    filteredJobs,
    searchTerm,
    selectedStatus,
    selectedPriority,
    setSearchTerm,
    setSelectedStatus,
    setSelectedPriority,
  };
};

export default useFilteredJobs;