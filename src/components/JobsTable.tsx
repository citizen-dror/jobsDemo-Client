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
import { Job, JobPriority, JobStatus } from "../types/job/";

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
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {["id", "jobName", "priority", "startTime", "status"].map((field) => (
              <TableCell key={field}>
                <TableSortLabel active={sortBy === field} direction={sortDirection} onClick={() => handleSort(field as keyof Job)}>
                  {field}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {jobs.map((job) => (
            <TableRow key={job.id}>
              <TableCell>{job.id}</TableCell>
              <TableCell>{job.jobName}</TableCell>
              <TableCell>{JobPriority[job.priority]}</TableCell>
              <TableCell>{job.startTime ? new Date(job.startTime).toLocaleString() : "-"}</TableCell>
              <TableCell style={{ color: ["blue", "orange", "green", "red"][job.status] }}>
                {JobStatus[job.status]}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default JobsTable;