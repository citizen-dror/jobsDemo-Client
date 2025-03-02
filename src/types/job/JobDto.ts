import { JobPriority } from "./JobPriority";
import { JobStatus } from "./JobStatus";

export interface Job {
    id: number;
    jobName: string;
    priority: JobPriority;
    status: JobStatus;
    startTime: string | null;
    endTime: string | null;
    progress: number;
}
