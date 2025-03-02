import React from "react";
import { Grid, TextField, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { JobPriority, JobStatus } from "../types/job/";

interface JobsFiltersProps {
  searchTerm: string;
  selectedStatus: JobStatus | null;
  selectedPriority: JobPriority | null;
  setSearchTerm: (value: string) => void;
  setSelectedStatus: (value: JobStatus | null) => void;
  setSelectedPriority: (value: JobPriority | null) => void;
}

const JobsFilters: React.FC<JobsFiltersProps> = ({
  searchTerm,
  selectedStatus,
  selectedPriority,
  setSearchTerm,
  setSelectedStatus,
  setSelectedPriority,
}) => {
  return (
    <Grid container spacing={2} mb={2}>
      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          label="Search Job Name"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            value={selectedStatus || ""}
            label="Status"
            onChange={(e) => setSelectedStatus(e.target.value === "" ? null : (e.target.value as JobStatus))}
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {Object.entries(JobStatus)
              .filter(([key]) => isNaN(Number(key)))
              .map(([key, value]) => (
                <MenuItem key={key} value={value}>
                  {key}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={4}>
        <FormControl fullWidth>
          <InputLabel>Priority</InputLabel>
          <Select
            value={selectedPriority || ""}
            label="Priority"
            onChange={(e) => setSelectedPriority(e.target.value === "" ? null : (e.target.value as JobPriority))}
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {Object.entries(JobPriority)
              .filter(([key]) => isNaN(Number(key)))
              .map(([key, value]) => (
                <MenuItem key={key} value={value}>
                  {key}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default JobsFilters;