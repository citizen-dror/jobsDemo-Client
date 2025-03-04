import React from "react";
import { useDispatch } from "react-redux";
import { stopJobAction, restartJobAction } from "../stores/jobSlice";
import { AppDispatch } from "../stores/store";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  IconButton,
} from "@mui/material";
import { Stop, Replay } from "@mui/icons-material";
import { Job, JobPriority, JobStatus } from "../types/job";
import { useSignalR } from "../providers/SignalRProvider";
import { statusColorMap } from "../constants/jobStatusColors";

interface JobsTableProps {
  jobs: Job[];
  sortBy: string;
  sortDirection: "asc" | "desc";
  handleSort: (field: keyof Job) => void;
}

const JobsTable: React.FC<JobsTableProps> = ({ jobs, sortBy, sortDirection, handleSort }) => {
  const { updatedJob } = useSignalR();
  const dispatch = useDispatch<AppDispatch>(); 
  const handleStopJob = (id: number) => {
    dispatch(stopJobAction(id));
  };
  
  const handleRestartJob = (id: number) => {
    dispatch(restartJobAction(id));
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {["id", "jobName", "priority", "createdTime", "status", "progress", "actions"].map((field) => (
              <TableCell key={field}>
                {field !== "actions" ? (
                  <TableSortLabel
                    active={sortBy === field}
                    direction={sortDirection}
                    onClick={() => handleSort(field as keyof Job)}
                  >
                    {field}
                  </TableSortLabel>
                ) : (
                  "Actions"
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {jobs.map((job) => {
            const isUpdated = updatedJob && job.id === updatedJob.id;
            const jobStatus = isUpdated ? updatedJob.status : job.status;

            return (
              <TableRow key={job.id}>
                <TableCell>{job.id}</TableCell>
                <TableCell>{job.jobName}</TableCell>
                <TableCell>{JobPriority[job.priority]}</TableCell>
                <TableCell>{job.createdTime ? new Date(job.createdTime).toLocaleString() : "-"}</TableCell>
                <TableCell style={{ color: statusColorMap[jobStatus] }}>
                  {JobStatus[jobStatus]}
                </TableCell>
                <TableCell>{isUpdated ? `${updatedJob.progress}%` : `${job.progress}%`}</TableCell>
                <TableCell>
                  {jobStatus === JobStatus.InProgress && (
                    <IconButton color="error" onClick={() => handleStopJob(job.id)}>
                      <Stop />
                    </IconButton>
                  )}
                  {(jobStatus === JobStatus.Pending || jobStatus === JobStatus.Failed) && (
                    <IconButton color="primary" onClick={() => handleRestartJob(job.id)}>
                      <Replay />
                    </IconButton>
                  )}
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
