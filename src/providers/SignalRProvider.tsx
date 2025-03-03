// src/providers/SignalRProvider.tsx
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { Job } from '../types/job'; // Import Job type

interface SignalRContextType {
  updatedJob: Job | null; // Store the latest job update
}

const SignalRContext = createContext<SignalRContextType | undefined>(undefined);

interface SignalRProviderProps {
  children: ReactNode;
}

export const SignalRProvider: React.FC<SignalRProviderProps> = ({ children }) => {
  const [updatedJob, setUpdatedJob] = useState<Job | null>(null);

  useEffect(() => {
    const API_URL = `${import.meta.env.VITE_API_BASE_URL}/jobHub`;
    const connection = new HubConnectionBuilder().withUrl(API_URL).build();

    connection
      .start()
      .then(() => console.log('Connected to SignalR hub'))
      .catch((err) => console.error('Connection failed: ', err));

    connection.on('ReceiveJobUpdate', (job: Job) => {
      console.log('Job update received:', job);
      setUpdatedJob(job);
    });

    return () => {
      connection.stop();
    };
  }, []);

  return (
    <SignalRContext.Provider value={{ updatedJob }}>
      {children}
    </SignalRContext.Provider>
  );
};

export const useSignalR = (): SignalRContextType => {
  const context = useContext(SignalRContext);
  if (!context) {
    throw new Error('useSignalR must be used within a SignalRProvider');
  }
  return context;
};
