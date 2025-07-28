// src/pages/hotels/hotel-result.tsx
import React, { useState } from "react";
import type { Attraction, HotelSearchParams } from "../../../utils/types";
import { searchDestinations, searchHotels } from "../../../api/booking";
import Button from "../../../components/props/Button";
import ActivityFilter from "../../../components/activities/activity-results/ActivityFilter";
import HotelResultsPage from "../../../components/activities/hotel-result/HotelResultsPage";
import PassengerDropdown from "../../../components/activities/flight-results/PassengerDropdown";
import Select from "../../../components/props/formInputs/Select";
import Input from "../../../components/props/formInputs/Input";
import { Link } from "react-router-dom";

const roomOptions = [
  { value: "1", label: "1 Room" },
  { value: "2", label: "2 Room" },
  { value: "3", label: "3 Room" },
  { value: "4", label: "4 Room" },
];

const HotelSearchResults = () => {
  const [query, setQuery] = useState("");
  const [checkInDate, setCheckInDate] = useState(
    new Date().toISOString().split("T")[0] // 2025-07-27
  );
  const [checkOutDate, setCheckOutDate] = useState(
    new Date(new Date().setDate(new Date().getDate() + 1))
      .toISOString()
      .split("T")[0] // 2025-07-28
  );
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState("1");
  const [searchResults, setSearchResults] = useState<Attraction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filterOptions, setFilterOptions] = useState<any>(null);

  const handleSearch = async () => {
    if (!query) {
      setError("Please enter a destination.");
      setSearchResults([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const destinationResponse = await searchDestinations({
        query,
        languagecode: "en-us",
      });

      if (!destinationResponse?.data?.length) {
        setError("No destinations found for the query.");
        setSearchResults([]);
        return;
      }

      const destination = destinationResponse.data[0];
      if (!destination.dest_id) {
        setError("Invalid destination data received.");
        setSearchResults([]);
        return;
      }

      const hotelParams: HotelSearchParams = {
        dest_id: destination.dest_id,
        search_type: "CITY",
        adults: adults.toString(),
        children_age: children > 0 ? `${children},17` : "0",
        room_qty: rooms,
        page_number: "1",
        units: "metric",
        temperature_unit: "c",
        languagecode: "en-us",
        currency_code: "USD",
        arrival_date: checkInDate,
        departure_date: checkOutDate,
      };
      const hotelResponse = await searchHotels(hotelParams);

      if (!hotelResponse?.data?.hotels?.length) {
        setError("No hotels found for the selected destination.");
        setSearchResults([]);
        return;
      }

      const hotels: Attraction[] = hotelResponse.data.hotels.map(
        (item: any) => ({
          id: item.property.id.toString(),
          name: item.property.name,
          description: item.accessibilityLabel || "No description available",
          image: item.property.photoUrls[0] || "detail.png",
          price: item.property.priceBreakdown.grossPrice.value || 0,
          currency: item.property.priceBreakdown.grossPrice.currency || "USD",
          date: `${checkInDate} to ${checkOutDate}`,
          location: item.property.wishlistName || destination.city_name,
        })
      );

      setSearchResults(hotels);
      setFilterOptions({
        typeFilters: [
          {
            name: "Hotels",
            tagname: "hotel",
            productCount: hotelResponse.data.hotels.length,
          },
          { name: "Apartments", tagname: "apartment", productCount: 0 },
        ],
        priceFilters: [
          { name: "Under $100", tagname: "under_100", productCount: 0 },
          { name: "$100-$200", tagname: "100_200", productCount: 0 },
        ],
      });
    } catch (error: any) {
      console.error("Error fetching hotels:", error);
      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch hotels. Please try again."
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
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-4 w-fit">
        <Link to={"/"}>
          <Button variant="lightBlue">Home</Button>
        </Link>
      </div>
      <div className="mb-4 flex flex-col gap-3 bg-blue-950 rounded-[4px] p-4">
        <div className="flex items-center flex-wrap gap-x-7">
          <PassengerDropdown
            adults={adults}
            setAdults={setAdults}
            children={children}
            setChildren={setChildren}
          />

          <Select
            value={rooms}
            onChange={(e) => setRooms(e.target.value)}
            options={roomOptions}
            className="col-span-1 sm:col-span-1"
          />
        </div>
        <div className="flex-1 flex flex-col lg:flex-row gap-2 w-full">
          <div className="w-full">
            <Input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="e.g., Mumbai..."
              className=""
              label="Destination"
            />
          </div>

          <Input
            type="date"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            className=""
            label="Check in"
          />

          <Input
            type="date"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            className=""
            label="Check out"
          />
        </div>
        <div className="flex justify-end w-full">
          <div className="w-fit">
            <Button onClick={handleSearch} variant="blue">
              Search
            </Button>
          </div>
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
          <ActivityFilter filterOptions={filterOptions} />
        </div>
        <div className="flex-1">
          <HotelResultsPage results={searchResults} />
        </div>
      </div>
    </div>
  );
};

export default HotelSearchResults;
