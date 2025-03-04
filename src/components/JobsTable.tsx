import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { Job, JobPriority, JobStatus } from "../types/job";
import { useSignalR } from "../providers/SignalRProvider"; 
import { statusColorMap } from "../constants/jobStatusColors";

interface JobsTableProps {
  jobs: Job[];
  sortBy: string;
  sortDirection: "asc" | "desc";
  handleSort: (field: keyof Job) => void;
}

const JobsTable: React.FC<JobsTableProps> = ({
  jobs,
  sortBy,
  sortDirection,
  handleSort,
}) => {
  const { updatedJob } = useSignalR(); // Get job updates from SignalR

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {["id", "jobName", "priority", "createdTime", "status", "progress"].map((field) => (
              <TableCell key={field}>
                <TableSortLabel
                  active={sortBy === field}
                  direction={sortDirection}
                  onClick={() => handleSort(field as keyof Job)}
                >
                  {field}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {jobs.map((job) => {
            const isUpdated = updatedJob && job.id === updatedJob.id;

            return (
              <TableRow key={job.id}>
                <TableCell>{job.id}</TableCell>
                <TableCell>{job.jobName}</TableCell>
                <TableCell>{JobPriority[job.priority]}</TableCell>
                <TableCell>
                  {job.createdTime ? new Date(job.createdTime).toLocaleString() : "-"}
                </TableCell>
                <TableCell style={{ color: statusColorMap[isUpdated ? updatedJob.status : job.status] }}>
                    {JobStatus[isUpdated ? updatedJob.status : job.status]}
                </TableCell>
                <TableCell>
                    {isUpdated ? `${updatedJob.progress}%` : `${job.progress}%`}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default JobsTable;
