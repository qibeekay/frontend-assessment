import React, { useState } from "react";
import { getImageSrc } from "../../utils/imageUtils";
import Button from "../props/Button";
import { Link } from "react-router-dom";
import { useFlight } from "../../config/FlightContext";
import type { Flight } from "../../utils/types";
import { BaggageClaim, Tv, Usb, Utensils } from "lucide-react";

interface FlightCardProps {
  flight: Flight;
  remove?: boolean;
}

const FlightCard = ({ flight, remove = false }: FlightCardProps) => {
  const { addFlight, removeFlight, flights } = useFlight();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const isAdded = flights.some((f) => f.id === flight.id);
  const exchangeRate = 270; // 1 AED = 270 NGN (approximate for July 2025)
  const priceInNGN = flight.price * exchangeRate;

  const handleAddToBooking = () => {
    addFlight(flight);
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 3000);
  };

  const handleEditDetails = () => {
    // Implement edit functionality here (e.g., open a modal or navigate to an edit page)
    console.log("Edit details for flight:", flight.id);
    // Placeholder: You can add navigation or a state change to edit the flight
  };

  return (
    <div>
      <div className=" bg-white flex flex-col md:flex-row justify-center shadow overflow-hidden rounded w-full">
        <div className="w-full">
          {/* Header Section */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 relative">
            <div className="flex items-center space-x-4">
              {/* Airline Logo and Info */}
              <img
                src="https://placehold.co/40x40/E0E7FF/4F46E5?text=AA" // Placeholder for American Airlines logo
                alt={`${flight.airlineName} Logo`}
                className="w-10 h-10 rounded-full"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src =
                    "https://placehold.co/40x40/E0E7FF/4F46E5?text=AA"; // Fallback
                }}
              />
              <div className="">
                <p className="text-sm blg:text-[20px] font-semibold text-textPrimary">
                  {flight.airlineName}
                </p>
                <p className="text-sm text-textSecondary flex items-center gap-2 flex-wrap">
                  {flight.flightNumber}
                  <span className="px-2 py-1 rounded bg-[#0A369D] text-[10px] sm:text-xs font-medium text-white">
                    {flight.flightClass}
                  </span>
                </p>
              </div>
            </div>

            {/* Flight Times and Duration */}
            <div className="flex items-center justify-center flex-col lg:flex-row w-full lg:w-fit lg:space-x-10">
              <div className="text-center flex gap-2 w-full lg:w-fit flex-row items-center lg:flex-col">
                <p className="blg:text-[24px] font-semibold text-textPrimary">
                  {flight.departureTime}
                </p>
                <p className="text-xs blg:text-sm text-textSecondary">
                  {flight.departureDate}
                </p>
              </div>

              <div className="flex flex-col items-center w-full lg:w-[387px] my-4 sm:my-0">
                <div className="flex items-center justify-between w-full ">
                  <img src={getImageSrc("takeoff.svg")} alt="" />
                  <p className="text-sm text-gray-500 mb-1">
                    <span className="hidden sm:block">Duration:</span>{" "}
                    {Math.floor(flight.duration)}h{" "}
                    {Math.round((flight.duration % 1) * 60)}m
                  </p>
                  <img src={getImageSrc("landing.svg")} alt="" />
                </div>

                {/* progress bar */}
                <div className="w-full h-2 bg-gray-200 rounded-full relative my-1">
                  <div className="absolute left-1/2 -translate-x-1/2 top-0 h-full bg-primary rounded-full w-[30%]"></div>
                </div>

                <div className="flex items-center w-full justify-between">
                  <span className="text-gray-600 font-semibold">
                    {flight.departureAirport}
                  </span>
                  <div className=" text-textSecondary font-medium">
                    {flight.connectionType}
                  </div>
                  <span className="text-textPrimary font-semibold">
                    {flight.arrivalAirport}
                  </span>
                </div>
              </div>

              <div className="text-center flex gap-2 mt-2 lg:mt-0 w-full lg:w-fit flex-row items-center justify-end lg:flex-col">
                <p className="blg:text-[24px] font-semibold text-textPrimary">
                  {flight.arrivalTime}
                </p>
                <p className="text-xs blg:text-sm text-textSecondary">
                  {flight.arrivalDate}
                </p>
              </div>
            </div>

            {/* Price */}
            <div className="text-right">
              <p className="text-[20px] blg:text-2xl font-bold text-gray-800">
                ₦
                {priceInNGN.toLocaleString("en-NG", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
          </div>

          {/* Facilities Section */}
          <div className="p-6 text-textSecondary border-b border-gray-200 flex flex-wrap items-center gap-2">
            <p className="font-medium">Facilities:</p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-gray-700 text-sm">
              <div className="text-xs sm:text-base flex items-center space-x-2">
                <BaggageClaim size={18} className="" />
                <span>
                  Baggage: {flight.baggageAllowance}, Cabin Baggage:{" "}
                  {flight.cabinBaggageAllowance}
                </span>
              </div>
              {flight.hasEntertainment && (
                <div className="text-xs sm:text-base flex items-center space-x-2">
                  <Tv size={18} className="" />
                  <span>In flight entertainment</span>
                </div>
              )}
              {flight.hasMeal && (
                <div className="text-xs sm:text-base flex items-center space-x-2">
                  <Utensils size={18} className="" />
                  <span>In flight meal</span>
                </div>
              )}
              {flight.hasUsbPort && (
                <div className=" text-xs sm:text-base flex items-center space-x-2">
                  <Usb size={18} className="" />
                  <span>USB Port</span>
                </div>
              )}
            </div>
          </div>

          {/* Footer Section */}
          <div className="flex justify-between items-center p-6">
            <div className="flex space-x-6">
              <Link
                to=""
                className="text-xs sm:text-base text-primary hover:underline font-medium"
              >
                Flight details
              </Link>
              <Link
                to=""
                className="text-xs sm:text-base text-primary hover:underline font-medium"
              >
                Price details
              </Link>
            </div>
            <div className="relative">
              {isAdded ? (
                <Link
                  to={""}
                  className="text-xs sm:text-base text-primary hover:underline font-medium"
                >
                  Edit Details
                </Link>
              ) : (
                <Button variant="blue" onClick={handleAddToBooking}>
                  Add to Itinerary
                </Button>
              )}
            </div>
          </div>
        </div>
        <button
          onClick={() => removeFlight(flight.id)}
          className={`
                ${remove ? "" : "hidden"}
                 w-full p-4 md:p-0 md:w-[46px] cursor-pointer grid place-items-center bg-[#FBEAE9]`}
        >
          <div>
            <img src={getImageSrc("x.svg")} alt="Remove" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default FlightCard;
