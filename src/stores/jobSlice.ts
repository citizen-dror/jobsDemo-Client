import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Job, JobStatus } from "../types/job";
import { fetchJobs, stopJob, restartJob } from "../api/jobApi";

// Define an initial state for jobs
interface JobState {
  jobs: Job[];
  loading: boolean;
  error: string | null;
}

// Initial state for the slice
const initialState: JobState = {
  jobs: [],
  loading: false,
  error: null,
};

// Create async thunks
export const loadJobs = createAsyncThunk("jobs/loadJobs", async () => {
  const jobs = await fetchJobs();
  return jobs;
});

export const stopJobAction = createAsyncThunk("jobs/stopJob", async (jobId: number) => {
  await stopJob(jobId);
  return jobId;
});

export const restartJobAction = createAsyncThunk("jobs/restartJob", async (jobId: number) => {
  await restartJob(jobId);
  return jobId;
});

// Create the slice
const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadJobs.fulfilled, (state, action) => {
        state.jobs = action.payload;
        state.loading = false;
      })
      .addCase(loadJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load jobs.";
      })
      .addCase(stopJobAction.fulfilled, (state, action) => {
        const job = state.jobs.find((j) => j.id === action.payload);
        if (job) job.status = JobStatus.Pending;
      })
      .addCase(restartJobAction.fulfilled, (state, action) => {
        const job = state.jobs.find((j) => j.id === action.payload);
        if (job) job.status = JobStatus.InProgress;
      });
  },
});

// Export the async thunks and reducer
export default jobSlice.reducer;