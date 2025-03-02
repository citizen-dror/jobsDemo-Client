export interface Job {
    id: number;
    jobName: string;
    priority: number;
    status: number;
    startTime: string | null;
    endTime: string | null;
    progress: number;
}

export interface CreateJobDto {
    jobName: string;
    priority: number;
}