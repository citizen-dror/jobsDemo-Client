import React, { useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Button,
  TablePagination,
} from "@mui/material";
import { loadJobs } from "../stores/jobSlice";
import { RootState } from "../stores/store";
import type { AppDispatch } from "../stores/store";
import useFilteredJobs from "../hooks/useFilteredJobs";
import useSortedJobs from "../hooks/useSortedJobs";
import usePaginationJobs from "../hooks/usePaginationJobs";
import JobsFilters from "../components/JobsFilters";
import JobsTable from "../components/JobsTable";
import AddJobDialog from "../components/AddJobDialog";

const JobsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { jobs, loading, error } = useSelector((state: RootState) => state.jobs);
  const [openDialog, setOpenDialog] = useState(false);
  useEffect(() => {
    dispatch(loadJobs());
  }, [dispatch]);

  const { filteredJobs, searchTerm, selectedStatus, selectedPriority, setSearchTerm, setSelectedStatus, setSelectedPriority } = useFilteredJobs(jobs);
  const { sortedJobs, handleSort, sortBy, sortDirection } = useSortedJobs(filteredJobs);
  const { paginatedJobs, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePaginationJobs(sortedJobs);
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <h2>Jobs</h2>
      <Button variant="contained" color="primary" onClick={handleOpenDialog}>
        Add Job
      </Button>
      <JobsFilters
        searchTerm={searchTerm}
        selectedStatus={selectedStatus}
        selectedPriority={selectedPriority}
        setSearchTerm={setSearchTerm}
        setSelectedStatus={setSelectedStatus}
        setSelectedPriority={setSelectedPriority}
      />
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      <JobsTable
        jobs={paginatedJobs}
        sortBy={sortBy}
        sortDirection={sortDirection}
        handleSort={handleSort}
      />
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={sortedJobs.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <AddJobDialog open={openDialog} handleClose={handleCloseDialog} />
    </Box>
  );
};

export default JobsPage;
