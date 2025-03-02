import axios from "axios";
import { Job } from "../types/job";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/jobs`;

export const fetchJobs = async (): Promise<Job[]> => {
  try {
    const response = await axios.get<Job[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
