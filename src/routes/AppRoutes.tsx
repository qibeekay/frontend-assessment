// src/routes/AppRoutes.tsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/dashboard";
import Activities from "../pages/activities";
import ActivitySearchResults from "../pages/activities/activitie-result";
import { AttractionProvider } from "../config/AttractionContext";
import HotelSearchResults from "../pages/hotels/hotels-result";
import { HotelProvider } from "../config/HotelContext";
import Hotels from "../pages/hotels";
import { FlightProvider } from "../config/FlightContext";
import Flights from "../pages/flights";
import FlightSearchResults from "../pages/flights/flights-result";

const AppRoutes = () => {
  return (
    <AttractionProvider>
      <HotelProvider>
        <FlightProvider>
          <Routes>
            <Route element={<DashboardLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/activities" element={<Activities />} />
              <Route path="/hotels" element={<Hotels />} />
              <Route path="/flights" element={<Flights />} />
              <Route
                path="/activities/results"
                element={<ActivitySearchResults />}
              />
              <Route path="/hotels/results" element={<HotelSearchResults />} />
              <Route
                path="/flights/results"
                element={<FlightSearchResults />}
              />
            </Route>
          </Routes>
        </FlightProvider>
      </HotelProvider>
    </AttractionProvider>
  );
};

export default AppRoutes;
