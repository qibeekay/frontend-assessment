import type React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="md:flex flex-1 px-5 max-w-[1920px] gap-[24px] pt-7 pb-7">
        <Sidebar />
        <main className="w-full md:flex-1 rounded-[4px] bg-white p-4 md:p-[24px]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
