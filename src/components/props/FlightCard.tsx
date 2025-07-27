// src/components/flights/FlightCard.tsx
import React, { useState } from "react";
import { getImageSrc } from "../../utils/imageUtils";
import Button from "../props/Button";
import { Link } from "react-router-dom";
import { useFlight } from "../../config/FlightContext";
import { AiOutlineClose } from "react-icons/ai";
import { MdOutlineTv } from "react-icons/md";
import { BsUsb } from "react-icons/bs";
import type { Flight } from "../../utils/types";

interface FlightCardProps {
  flight: Flight;
}

const FlightCard = ({ flight }: FlightCardProps) => {
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
      <div className="shadow-md bg-white rounded-md flex flex-col md:flex-row min-h-64 w-full text-textPrimary">
        <div className="w-full">
          {/* Header Section */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 relative">
            <div className="flex items-center space-x-4">
              {/* Airline Logo and Info */}
              <img
                src={
                  flight.image.startsWith("http")
                    ? flight.image
                    : getImageSrc(flight.image || "detail.png")
                }
                alt={`${flight.airlineName} Logo`}
                className="w-10 h-10 rounded-full"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src =
                    "https://placehold.co/40x40/E0E7FF/4F46E5?text=AA";
                }}
              />
              <div>
                <p className="text-lg font-semibold text-gray-800">
                  {flight.airlineName}
                </p>
                <p className="text-sm text-gray-500">
                  {flight.flightNumber}{" "}
                  <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                    {flight.flightClass}
                  </span>
                </p>
              </div>
            </div>

            {/* Flight Times and Duration */}
            <div className="flex items-center space-x-6 sm:space-x-10">
              <div className="text-center">
                <p className="text-xl font-bold text-gray-800">
                  {flight.departureTime}
                </p>
                <p className="text-sm text-gray-500">{flight.departureDate}</p>
              </div>

              <div className="flex flex-col items-center">
                <p className="text-sm text-gray-500 mb-1">
                  Duration: {Math.floor(flight.duration)}h{" "}
                  {Math.round((flight.duration % 1) * 60)}m
                </p>
                <div className="flex items-center w-32 sm:w-48">
                  <span className="text-gray-600 font-medium mr-2">
                    {flight.departureAirport}
                  </span>
                  <div className="flex-grow h-1 bg-gray-200 rounded-full relative">
                    <div className="absolute left-0 top-0 h-full bg-blue-500 rounded-full w-1/2"></div>
                    <div className="absolute left-1/2 -translate-x-1/2 -top-2 text-gray-600 text-xs px-2 py-1 bg-white rounded-full shadow">
                      {flight.connectionType}
                    </div>
                  </div>
                  <span className="text-gray-600 font-medium ml-2">
                    {flight.arrivalAirport}
                  </span>
                </div>
              </div>

              <div className="text-center">
                <p className="text-xl font-bold text-gray-800">
                  {flight.arrivalTime}
                </p>
                <p className="text-sm text-gray-500">{flight.arrivalDate}</p>
              </div>
            </div>

            {/* Price */}
            <div className="text-right ml-4">
              <p className="text-2xl font-bold text-gray-800">
                ₦{" "}
                {priceInNGN.toLocaleString("en-NG", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>

            {/* Close Button */}
            <button
              onClick={() => removeFlight(flight.id)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <AiOutlineClose size={20} />
            </button>
          </div>

          {/* Facilities Section */}
          <div className="p-6 border-b border-gray-200">
            <p className="text-gray-600 font-medium mb-3">Facilities:</p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-gray-700 text-sm">
              <div className="flex items-center space-x-2">
                {/* <FaBaggageClaim size={18} className="text-gray-500" /> */}
                <span>
                  Baggage: {flight.baggageAllowance}, Cabin Baggage:{" "}
                  {flight.cabinBaggageAllowance}
                </span>
              </div>
              {flight.hasEntertainment && (
                <div className="flex items-center space-x-2">
                  <MdOutlineTv size={18} className="text-gray-500" />
                  <span>In flight entertainment</span>
                </div>
              )}
              {flight.hasMeal && (
                <div className="flex items-center space-x-2">
                  {/* <GiCutlery size={18} className="text-gray-500" /> */}
                  <span>In flight meal</span>
                </div>
              )}
              {flight.hasUsbPort && (
                <div className="flex items-center space-x-2">
                  <BsUsb size={18} className="text-gray-500" />
                  <span>USB Port</span>
                </div>
              )}
            </div>
          </div>

          {/* Footer Section */}
          <div className="flex justify-between items-center p-6">
            <div className="flex space-x-6">
              <Link to="" className="text-blue-600 hover:underline font-medium">
                Flight details
              </Link>
              <Link to="" className="text-blue-600 hover:underline font-medium">
                Price details
              </Link>
            </div>
            <div className="relative">
              {isAdded ? (
                <Button
                  variant="blue"
                  onClick={handleEditDetails}
                  className="w-full sm:w-auto"
                >
                  Edit Details
                </Button>
              ) : (
                <Button
                  variant="blue"
                  onClick={handleAddToBooking}
                  className="w-full sm:w-auto"
                >
                  Add to Itinerary
                </Button>
              )}
              {showConfirmation && (
                <span className="absolute top-[-2rem] right-0 bg-green-500 text-white text-xs px-2 py-1 rounded">
                  Flight Added
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;
