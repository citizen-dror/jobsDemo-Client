import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { JobPriority, CreateJobDto } from "../types/job";
import { createJob } from "../api/jobApi"; 

interface AddJobDialogProps {
  open: boolean;
  handleClose: () => void;
}

const AddJobDialog: React.FC<AddJobDialogProps> = ({ open, handleClose }) => {
  const [name, setName] = useState("");
  const [priority, setPriority] = useState<JobPriority | "">("");

  const handleSubmit = async () => {
    if (!name || priority === "") {
      console.error("Job name and priority are required.");
      return;
    }

    const jobDto: CreateJobDto = {
      jobName: name,
      priority: Number(priority), // Assuming priority is a number in the CreateJobDto
    };

    try {
      const createdJob = await createJob(jobDto);
      console.log("New Job Created:", createdJob);
      handleClose(); // Close the dialog after successful creation
    } catch (error) {
      console.error("Error creating job:", error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Job</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Job Name"
          variant="outlined"
          margin="dense"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <FormControl fullWidth margin="dense">
          <InputLabel>Priority</InputLabel>
          <Select
            value={priority}
            label="Priority"
            onChange={(e) => setPriority(e.target.value as JobPriority)}
          >
            {Object.entries(JobPriority)
              .filter(([key]) => isNaN(Number(key)))
              .map(([key, value]) => (
                <MenuItem key={key} value={value}>
                  {key}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddJobDialog;
