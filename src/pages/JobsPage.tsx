import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TablePagination,
} from "@mui/material";
import { loadJobs } from "../stores/jobSlice";
import { RootState } from "../stores/store";
import type { AppDispatch } from "../stores/store";
import { Job, JobPriority, JobStatus } from "../types/job/";
import useFilteredJobs from "../hooks/useFilteredJobs";
import useSortedJobs from "../hooks/useSortedJobs";
import usePaginationJobs from "../hooks/usePaginationJobs";

const JobsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { jobs, loading, error } = useSelector((state: RootState) => state.jobs);
  useEffect(() => {
    dispatch(loadJobs());
  }, [dispatch]);

  const { filteredJobs, searchTerm, selectedStatus, selectedPriority, setSearchTerm, setSelectedStatus, setSelectedPriority } = useFilteredJobs(jobs);
  const { sortedJobs, handleSort, sortBy, sortDirection } = useSortedJobs(filteredJobs);
  const { paginatedJobs, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePaginationJobs(sortedJobs);

  return (
    <Box sx={{ padding: 2 }}>
      <h2>Jobs</h2>
      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} md={4}>
          <TextField fullWidth label="Search Job Name" variant="outlined" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select value={selectedStatus} label="Status" onChange={(e) => setSelectedStatus(e.target.value === "" ? null : (e.target.value as JobStatus))}>
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
            <Select value={selectedPriority} label="Priority" onChange={(e) => setSelectedPriority(e.target.value === "" ? null : e.target.value as JobPriority)}>
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
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
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
            {paginatedJobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell>{job.id}</TableCell>
                <TableCell>{job.jobName}</TableCell>
                <TableCell>{JobPriority[job.priority]}</TableCell>
                <TableCell>{job.startTime ? new Date(job.startTime).toLocaleString() : "-"}</TableCell>
                <TableCell style={{ color: ["blue", "orange", "green", "red"][job.status] }}>{JobStatus[job.status]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={sortedJobs.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default JobsPage;
