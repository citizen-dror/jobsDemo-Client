import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Job } from "../types/job";
import { fetchJobs } from "../api/jobApi";

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

// Create an async thunk to fetch jobs
export const loadJobs = createAsyncThunk("jobs/loadJobs", async () => {
  const jobs = await fetchJobs();
  return jobs;
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
      });
  },
});

// Export the async thunk and reducer
export default jobSlice.reducer;