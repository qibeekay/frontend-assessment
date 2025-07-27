import React from "react";
import { getImageSrc } from "../../utils/imageUtils";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import DashboardActivities from "../../components/dashboard/DashboardActivities";

const Dashboard = () => {
  return (
    <div className="">
      <DashboardHeader />
      <DashboardActivities />
    </div>
  );
};

export default Dashboard;
