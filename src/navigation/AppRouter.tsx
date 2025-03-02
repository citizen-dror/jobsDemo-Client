import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import JobsPage from "../pages/JobsPage";
import AboutPage from '../pages/AboutPage'
import Navbar from "./Navbar";

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
     <Navbar />
      <Routes>
        <Route path="/" element={<h1 className="p-4 text-2xl">Home Page</h1>} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;