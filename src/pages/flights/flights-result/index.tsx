import React, { useState } from "react";
import type { Flight, FlightSearchParams } from "../../../utils/types";
import { searchFlightDestinations, searchFlights } from "../../../api/booking";
import Button from "../../../components/props/Button";
import Input from "../../../components/props/formInputs/Input";
import PassengerDropdown from "../../../components/activities/flight-results/PassengerDropdown";
import Select from "../../../components/props/formInputs/Select";
import FlightResultsPage from "../../../components/activities/flight-results/FlightSearchResultsPage";

const FlightSearchResults: React.FC = () => {
  // State for search form inputs
  const [fromQuery, setFromQuery] = useState("");
  const [toQuery, setToQuery] = useState("");
  const [departDate, setDepartDate] = useState(
    new Date().toISOString().split("T")[0] // e.g., 2025-07-28
  );
  const [returnDate, setReturnDate] = useState(
    new Date(new Date().setDate(new Date().getDate() + 1))
      .toISOString()
      .split("T")[0] // e.g., 2025-07-29
  );
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [stops, setStops] = useState("none");
  const [sort, setSort] = useState("BEST");
  const [cabinClass, setCabinClass] = useState("ECONOMY");

  // State for search results and UI
  const [searchResults, setSearchResults] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Options for select dropdowns
  const stopsOptions = [
    { value: "none", label: "Any Stops" },
    { value: "0", label: "Non-Stop" },
    { value: "1", label: "1 Stop" },
    { value: "2", label: "2 Stops" },
  ];

  const sortOptions = [
    { value: "BEST", label: "Best" },
    { value: "CHEAPEST", label: "Cheapest" },
    { value: "FASTEST", label: "Fastest" },
  ];

  const cabinClassOptions = [
    { value: "ECONOMY", label: "Economy" },
    { value: "PREMIUM_ECONOMY", label: "Economy +" },
    { value: "BUSINESS", label: "Business" },
    { value: "FIRST", label: "First" },
  ];

  // Handle flight search
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
        adults: adults.toString(),
        children: children > 0 ? `${children},17` : "0",
        sort,
        cabinClass,
        currency_code: "AED",
      };
      const flightResponse = await searchFlights(flightParams);

      if (!flightResponse?.data?.flightOffers?.length) {
        setError(
          "No flights found for the selected route or invalid response structure."
        );
        setSearchResults([]);
        return;
      }

      // Map flight offers to Flight type
      const flights: Flight[] = flightResponse.data.flightOffers.map(
        (offer: any) => {
          const segment = offer.segments[0];
          const leg = segment.legs[0];
          return {
            id:
              offer.token || `${segment.departureTime}-${segment.arrivalTime}`,
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
              (offer.priceBreakdown?.total?.units || 0) +
              (offer.priceBreakdown?.total?.nanos || 0) / 1e9,
            currency: offer.priceBreakdown?.total?.currencyCode || "AED",
            image: leg.carriersData?.[0]?.logo || "detail.png",
            duration: segment.totalTime / 3600,
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

  // Handle Enter key for search
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="mx-auto mt-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-4 flex flex-col gap-3 bg-blue-950 rounded-[4px] p-4">
        <div className="flex items-center flex-wrap gap-x-7">
          <PassengerDropdown
            adults={adults}
            setAdults={setAdults}
            children={children}
            setChildren={setChildren}
          />
          <Select
            value={stops}
            onChange={(e) => setStops(e.target.value)}
            options={stopsOptions}
            className="col-span-1 sm:col-span-1"
          />
          <Select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            options={sortOptions}
            className="col-span-1 sm:col-span-1"
          />
          <Select
            value={cabinClass}
            onChange={(e) => setCabinClass(e.target.value)}
            options={cabinClassOptions}
            className="col-span-1 sm:col-span-1"
          />
        </div>
        {/* Search Form */}
        <div className="flex-1 flex flex-col lg:flex-row gap-2 w-full">
          <div className="w-full">
            <Input
              type="text"
              value={fromQuery}
              onChange={(e) => setFromQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="e.g., Mumbai..."
              className=""
              label="From"
            />
          </div>
          <div className="w-full">
            <Input
              type="text"
              value={toQuery}
              onChange={(e) => setToQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="(e.g. New Delhi..."
              className=""
              label="To"
            />
          </div>
          <Input
            type="date"
            value={departDate}
            onChange={(e) => setDepartDate(e.target.value)}
            className=""
            label="Departure"
          />
          <Input
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            className=""
            label="Return"
          />
        </div>
        <div>
          <Button onClick={handleSearch} variant="blue">
            Search
          </Button>
        </div>
      </div>

      {/* Error and Loading States */}
      {error && (
        <p className="text-red-500 text-sm sm:text-base mb-4">{error}</p>
      )}
      {loading && (
        <p className="text-gray-600 text-sm sm:text-base mb-4">Loading...</p>
      )}

      {/* Results */}
      <div className="w-full">
        <div className="w-full">
          <FlightResultsPage results={searchResults} />
        </div>
      </div>
    </div>
  );
};

export default FlightSearchResults;
