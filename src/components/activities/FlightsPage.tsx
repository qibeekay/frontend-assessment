// src/pages/flights/FlightsPage.tsx
import React from "react";
import { useFlight } from "../../config/FlightContext";
import FlightCard from "../props/FlightCard";
import { getImageSrc } from "../../utils/imageUtils";
import { Link } from "react-router-dom";
import Button from "../props/Button";

const FlightsPage = () => {
  const { flights, removeFlight } = useFlight();

  return (
    <div className="h-full">
      <div className="w-full bg-[#F0F2F5] rounded-[4px] text-white h-full p-[24px]">
        <div className="flex items-center gap-[8px]">
          <div>
            <img src={getImageSrc("fly.svg")} alt="" />
          </div>
          <p className="font-semibold text-sm text-textPrimary">Flights</p>
        </div>
        <div className="mt-10">
          {flights.length === 0 ? (
            <div className="w-full min-h-[274px] rounded-[4px] bg-white text-textPrimary mx-auto px-4 text-sm font-medium flex items-center justify-center">
              <div className="flex flex-col gap-[8px] items-center justify-center">
                <div>
                  <img src={getImageSrc("Eplane.png")} alt="" />
                </div>
                <p>No Request Yet</p>
                <div>
                  <Link to="/flights/results">
                    <Button variant="blue">Add Flights</Button>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {flights.map((flight) => (
                <FlightCard key={flight.id} flight={flight} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlightsPage;
