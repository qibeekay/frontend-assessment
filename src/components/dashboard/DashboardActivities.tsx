import React from "react";
import HotelsPage from "../activities/HotelsPage";
import ActivityPage from "../activities/ActivityPage";
import FlightsPage from "../activities/FlightsPage";

const DashboardActivities = () => {
  return (
    <div className="mt-20">
      <div>
        {/* text */}
        <div>
          <h1 className="text-textPrimary text-[20px] font-semibold">
            Trip itineraries
          </h1>
          <p className="text-sm font-medium text-textSecondary">
            Your trip itineraries are placed here
          </p>
        </div>

        {/* all itineraries */}
        <div className="flex flex-col gap-y-4 mt-10">
          <FlightsPage />
          <HotelsPage />
          <ActivityPage />
        </div>
      </div>
    </div>
  );
};

export default DashboardActivities;
