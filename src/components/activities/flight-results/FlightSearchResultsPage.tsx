// src/components/flights/FlightResultsPage.tsx
import React from "react";
import FlightCard from "../../props/FlightCard";
import type { Flight } from "../../../utils/types";

interface FlightResultsPageProps {
  results: Flight[];
}

const FlightResultsPage = ({ results }: FlightResultsPageProps) => {
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:gap-6">
        {results.length > 0 ? (
          results.map((flight) => (
            <FlightCard key={flight.id} flight={flight} />
          ))
        ) : (
          <p className="text-sm sm:text-base text-gray-600 text-center">
            No flights found.
          </p>
        )}
      </div>
    </div>
  );
};

export default FlightResultsPage;
