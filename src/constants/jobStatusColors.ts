import { JobStatus } from "../types/job";

export const statusColorMap: Record<JobStatus, string> = {
  [JobStatus.Pending]: "blue",
  [JobStatus.Scheduled]: "purple",
  [JobStatus.InProgress]: "orange",
  [JobStatus.Completed]: "green",
  [JobStatus.Failed]: "red",
  [JobStatus.Retrying]: "gold",
  [JobStatus.Cancelled]: "gray",
};