import { useState } from "react";
import { Job } from "../types/job/";

const useSortedJobs = (jobs: Job[]) => {
  const [sortBy, setSortBy] = useState<keyof Job>("id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (property: keyof Job) => {
      const isAsc = sortBy === property && sortDirection === "asc";
      setSortDirection(isAsc ? "desc" : "asc");
      setSortBy(property);
    };

 const sortedJobs = [...jobs].sort((a, b) => {
        let comparison = 0;
        if (sortBy === "id" || sortBy === "priority" || sortBy === "status") {
          comparison = (a[sortBy] > b[sortBy] ? 1 : -1) * (sortDirection === "asc" ? 1 : -1);
        } else if (sortBy === "createdTime") {
          comparison = ((a.createdTime || "") > (b.createdTime || "") ? 1 : -1) * (sortDirection === "asc" ? 1 : -1);
        }
        return comparison;
  });

  return { sortedJobs, handleSort, sortBy, sortDirection };
};

export default useSortedJobs;