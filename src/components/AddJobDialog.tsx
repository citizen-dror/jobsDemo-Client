import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";
import { JobPriority, CreateJobDto } from "../types/job";
import { createJob } from "../api/jobApi";

interface AddJobDialogProps {
  open: boolean;
  handleClose: () => void;
}

const AddJobDialog: React.FC<AddJobDialogProps> = ({ open, handleClose }) => {
  const [name, setName] = useState("");
  const [priority, setPriority] = useState<JobPriority>(JobPriority.Regular);
  const [errors, setErrors] = useState<{ name?: string; priority?: string }>({});
  const [isValid, setIsValid] = useState(false);
  const [isNameTouched, setIsNameTouched] = useState(false); // Track if name field has been touched
  const [nameTimeout, setNameTimeout] = useState<number | null>(null);

  // ✅ Live validation when inputs change
  useEffect(() => {
    validate();
  }, [name, priority]);

  const validate = () => {
    const newErrors: typeof errors = {};

    // ✅ JobName validation (Required + Length)
    if (!name.trim()) {
      newErrors.name = "Job Name is required.";
    } else if (name.trim().length < 4 || name.trim().length > 255) {
      newErrors.name = "Job Name must be between 4 and 255 characters.";
    }

    // ✅ JobPriority validation
    if (![JobPriority.Regular, JobPriority.High].includes(priority)) {
      newErrors.priority = "Invalid Job Priority. Allowed values: Regular (10) or High (20).";
    }

    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);

    // ✅ Debounce logic: wait 500ms after typing before running validation
    if (nameTimeout) clearTimeout(nameTimeout);
    setNameTimeout(
      window.setTimeout(() => {
        validate();
      }, 500)
    );
  };

  const handleSubmit = async () => {
    if (!isValid) return;

    const jobDto: CreateJobDto = {
      jobName: name.trim(),
      priority,
    };

    try {
      const createdJob = await createJob(jobDto);
      console.log("New Job Created:", createdJob);
      handleClose();
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
          onChange={handleNameChange}
          error={isNameTouched && !!errors.name} // Show error only after the user interacts
          onBlur={() => setIsNameTouched(true)} // Mark field as touched
          helperText={isNameTouched && errors.name} // Show error only after the field is touched
        />
        
        <FormControlLabel
          control={
            <Checkbox
              checked={priority === JobPriority.High}
              onChange={(e) => setPriority(e.target.checked ? JobPriority.High : JobPriority.Regular)}
            />
          }
          label="High Priority"
        />
        
        {errors.priority && (
          <Typography variant="body2" color="error" style={{ marginTop: 5 }}>
            {errors.priority}
          </Typography>
        )}
      </DialogContent>
      
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          disabled={!isValid}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddJobDialog;
