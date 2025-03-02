import React, { useEffect, useState } from "react";
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

const JobsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { jobs, loading, error } = useSelector((state: RootState) => state.jobs);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(jobs);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [sortBy, setSortBy] = useState<keyof Job>("id");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<JobStatus | "" | null>(null);
  const [selectedPriority, setSelectedPriority] = useState<JobPriority | "" | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    dispatch(loadJobs());
  }, [dispatch]);

  const handleSort = (property: keyof Job) => {
    const isAsc = sortBy === property && sortDirection === "asc";
    setSortDirection(isAsc ? "desc" : "asc");
    setSortBy(property);
  };

  useEffect(() => {
    const filtered = jobs.filter((job) => {
      const matchesSearchTerm = job.jobName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = selectedStatus !== undefined && selectedStatus !== null
        ? job.status === selectedStatus
        : true;
        const matchesPriority = selectedPriority !== undefined && selectedPriority !== null
        ? job.priority === selectedPriority
        : true;
      return matchesSearchTerm && matchesStatus && matchesPriority;
    });
    setFilteredJobs(filtered);
  }, [searchTerm, selectedStatus, selectedPriority, jobs]);

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    let comparison = 0;
    if (sortBy === "id" || sortBy === "priority" || sortBy === "status") {
      comparison = (a[sortBy] > b[sortBy] ? 1 : -1) * (sortDirection === "asc" ? 1 : -1);
    } else if (sortBy === "startTime") {
      comparison = ((a.startTime || "") > (b.startTime || "") ? 1 : -1) * (sortDirection === "asc" ? 1 : -1);
    }
    return comparison;
  });

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
            <Select value={selectedStatus} label="Status"
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
            <Select value={selectedPriority} label="Priority"
              onChange={(e) => setSelectedPriority(e.target.value === "" ? null : e.target.value as JobPriority)}
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
            {sortedJobs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((job) => (
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
