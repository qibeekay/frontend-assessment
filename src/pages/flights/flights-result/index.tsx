// src/pages/flights/FlightSearchResults.tsx
import React, { useState } from "react";
import type { Flight, FlightSearchParams } from "../../../utils/types";
import { searchFlightDestinations, searchFlights } from "../../../api/booking";
import FlightResultsPage from "../../../components/activities/flight-results/FlightSearchResultsPage";
import Button from "../../../components/props/Button";

const FlightSearchResults = () => {
  const [fromQuery, setFromQuery] = useState("");
  const [toQuery, setToQuery] = useState("");
  const [departDate, setDepartDate] = useState(
    new Date().toISOString().split("T")[0] // 2025-07-27
  );
  const [returnDate, setReturnDate] = useState(
    new Date(new Date().setDate(new Date().getDate() + 1))
      .toISOString()
      .split("T")[0] // 2025-07-28
  );
  const [adults, setAdults] = useState("1");
  const [children, setChildren] = useState("0");
  const [stops, setStops] = useState("none");
  const [sort, setSort] = useState("BEST");
  const [cabinClass, setCabinClass] = useState("ECONOMY");
  const [searchResults, setSearchResults] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!fromQuery || !toQuery) {
      setError("Please enter both departure and arrival destinations.");
      setSearchResults([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      // Step 1: Search for departure destination
      const fromResponse = await searchFlightDestinations({
        query: fromQuery,
        languagecode: "en-us",
      });
      if (!fromResponse?.data?.length) {
        setError("No departure destination found.");
        setSearchResults([]);
        return;
      }
      const fromDest = fromResponse.data[0];
      if (!fromDest.id) {
        setError("Invalid departure destination data.");
        setSearchResults([]);
        return;
      }

      // Step 2: Search for arrival destination
      const toResponse = await searchFlightDestinations({
        query: toQuery,
        languagecode: "en-us",
      });
      if (!toResponse?.data?.length) {
        setError("No arrival destination found.");
        setSearchResults([]);
        return;
      }
      const toDest = toResponse.data[0];
      if (!toDest.id) {
        setError("Invalid arrival destination data.");
        setSearchResults([]);
        return;
      }

      // Step 3: Search for flights
      const flightParams: FlightSearchParams = {
        fromId: fromDest.id,
        toId: toDest.id,
        departDate,
        returnDate,
        stops,
        pageNo: "1",
        adults,
        children,
        sort,
        cabinClass,
        currency_code: "AED",
      };
      const flightResponse = await searchFlights(flightParams);

      // Log the full response to verify structure
      console.log("Flight Response:", flightResponse.data);

      // Check if flightOffers exists and is an array
      if (!flightResponse?.data?.flightOffers?.length) {
        setError(
          "No flights found for the selected route or invalid response structure."
        );
        setSearchResults([]);
        return;
      }

      const flights: Flight[] = flightResponse.data.flightOffers.map(
        (offer: any) => {
          const segment = offer.segments[0]; // Use the first segment
          const leg = segment.legs[0]; // Use the first leg

          return {
            id:
              offer.token || `${segment.departureTime}-${segment.arrivalTime}`, // Fallback ID
            token:
              offer.token || `${segment.departureTime}-${segment.arrivalTime}`,
            departureAirport: segment.departureAirport.code,
            arrivalAirport: segment.arrivalAirport.code,
            departureTime: new Date(segment.departureTime).toLocaleTimeString(
              "en-US",
              { hour: "2-digit", minute: "2-digit" }
            ),
            arrivalTime: new Date(segment.arrivalTime).toLocaleTimeString(
              "en-US",
              { hour: "2-digit", minute: "2-digit" }
            ),
            price:
              offer.priceBreakdown?.total?.units +
                offer.priceBreakdown?.total?.nanos / 1e9 || 0, // Fallback to 0 if no price
            currency: offer.priceBreakdown?.total?.currencyCode || "AED",
            image: leg.carriersData?.[0]?.logo || "detail.png",
            duration: segment.totalTime / 3600, // Hours
            airlineName: leg.carriersData?.[0]?.name || "Unknown Airline",
            flightNumber: leg.flightInfo?.flightNumber?.toString() || "N/A",
            flightClass: leg.cabinClass || "ECONOMY",
            departureDate: new Date(segment.departureTime).toLocaleDateString(
              "en-US",
              { year: "numeric", month: "short", day: "numeric" }
            ),
            arrivalDate: new Date(segment.arrivalTime).toLocaleDateString(
              "en-US",
              { year: "numeric", month: "short", day: "numeric" }
            ),
            connectionType:
              offer.segments.length === 1
                ? "Non-Stop"
                : `${offer.segments.length - 1} Stop(s)`,
            baggageAllowance: segment.travellerCheckedLuggage?.[0]
              ?.luggageAllowance?.maxPiece
              ? `${
                  segment.travellerCheckedLuggage[0].luggageAllowance.maxPiece
                } x ${
                  segment.travellerCheckedLuggage[0].luggageAllowance
                    .maxTotalWeight ||
                  segment.travellerCheckedLuggage[0].luggageAllowance
                    .maxWeightPerPiece
                } ${
                  segment.travellerCheckedLuggage[0].luggageAllowance.massUnit
                }`
              : "N/A",
            cabinBaggageAllowance: segment.travellerCabinLuggage?.[0]
              ?.luggageAllowance?.maxPiece
              ? `${segment.travellerCabinLuggage[0].luggageAllowance.maxPiece} x ${segment.travellerCabinLuggage[0].luggageAllowance.maxWeightPerPiece} ${segment.travellerCabinLuggage[0].luggageAllowance.massUnit}`
              : "N/A",
            hasEntertainment:
              leg.flightInfo?.facilities?.includes("ENTERTAINMENT") || false,
            hasMeal: leg.flightInfo?.facilities?.includes("MEAL") || false,
            hasUsbPort: leg.flightInfo?.facilities?.includes("USB") || false,
          };
        }
      );

      setSearchResults(flights);
    } catch (error: any) {
      console.error("Error fetching flights:", error);
      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch flights. Please try again."
      );
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-4 flex flex-col gap-3">
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-5 gap-2 w-full">
          <input
            type="text"
            value={fromQuery}
            onChange={(e) => setFromQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="From (e.g., Mumbai)..."
            className="w-full p-2 sm:p-3 border rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 col-span-1 sm:col-span-2"
          />
          <input
            type="text"
            value={toQuery}
            onChange={(e) => setToQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="To (e.g., New Delhi)..."
            className="w-full p-2 sm:p-3 border rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 col-span-1 sm:col-span-2"
          />
          <input
            type="date"
            value={departDate}
            onChange={(e) => setDepartDate(e.target.value)}
            className="w-full p-2 sm:p-3 border rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 col-span-1 sm:col-span-1"
          />
          <input
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            className="w-full p-2 sm:p-3 border rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 col-span-1 sm:col-span-1"
          />
          <div className="flex gap-2 col-span-1 sm:col-span-1">
            <select
              value={adults}
              onChange={(e) => setAdults(e.target.value)}
              className="w-full p-2 sm:p-3 border rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="1">1 Adult</option>
              <option value="2">2 Adults</option>
              <option value="3">3 Adults</option>
              <option value="4">4 Adults</option>
            </select>
            <select
              value={children}
              onChange={(e) => setChildren(e.target.value)}
              className="w-full p-2 sm:p-3 border rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="0">0 Children</option>
              <option value="1,17">1 Child</option>
              <option value="2,17">2 Children</option>
            </select>
          </div>
          <select
            value={stops}
            onChange={(e) => setStops(e.target.value)}
            className="w-full p-2 sm:p-3 border rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 col-span-1 sm:col-span-1"
          >
            <option value="none">Any Stops</option>
            <option value="0">Non-Stop</option>
            <option value="1">1 Stop</option>
            <option value="2">2 Stops</option>
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full p-2 sm:p-3 border rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 col-span-1 sm:col-span-1"
          >
            <option value="BEST">Best</option>
            <option value="CHEAPEST">Cheapest</option>
            <option value="FASTEST">Fastest</option>
          </select>
          <select
            value={cabinClass}
            onChange={(e) => setCabinClass(e.target.value)}
            className="w-full p-2 sm:p-3 border rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 col-span-1 sm:col-span-1"
          >
            <option value="ECONOMY">Economy</option>
            <option value="PREMIUM_ECONOMY">Premium Economy</option>
            <option value="BUSINESS">Business</option>
            <option value="FIRST">First</option>
          </select>
        </div>
        <div>
          <Button onClick={handleSearch} variant="blue">
            Search
          </Button>
        </div>
      </div>
      {error && (
        <p className="text-red-500 text-sm sm:text-base mb-4">{error}</p>
      )}
      {loading && (
        <p className="text-gray-600 text-sm sm:text-base mb-4">Loading...</p>
      )}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-64 xl:w-80 shrink-0">
          {/* Add flight filters here if needed */}
        </div>
        <div className="flex-1">
          <FlightResultsPage results={searchResults} />
        </div>
      </div>
    </div>
  );
};

export default FlightSearchResults;
