import { useState } from "react";
import { Job } from "../types/job";

const usePaginationJobs = (jobs: Job[], initialRowsPerPage = 5) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);

  const paginatedJobs = jobs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return {
    page,
    rowsPerPage,
    paginatedJobs,
    handleChangePage,
    handleChangeRowsPerPage,
  };
};

export default usePaginationJobs;