import axios from "axios";
import { Job, CreateJobDto } from "../types/job";

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

export const createJob = async (jobDto: CreateJobDto) => {
  try {
    const response = await axios.post(API_URL, jobDto);
    return response.data; 
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const stopJob = async (jobId: number) => {
  try {
    await axios.put(`${API_URL}/${jobId}/stop`);
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const restartJob = async (jobId: number) => {
  try {
    await axios.put(`${API_URL}/${jobId}/restart`);
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
