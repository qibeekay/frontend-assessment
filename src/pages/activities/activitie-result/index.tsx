import React, { useState } from "react";
import type { ActivitySearchParams, Attraction } from "../../../utils/types";
import { searchAttractions, searchLocations } from "../../../api/booking";
import Button from "../../../components/props/Button";
import ActivityFilter from "../../../components/activities/activity-results/ActivityFilter";
import ActivityResultsPage from "../../../components/activities/activity-results/ActivityResultsPage";
import Input from "../../../components/props/formInputs/Input";
import { Link } from "react-router-dom";

const ActivitySearchResults = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Attraction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filterOptions, setFilterOptions] = useState<any>(null);

  const handleSearch = async () => {
    if (!query) {
      setError("Please enter a search query.");
      setSearchResults([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const locationParams: ActivitySearchParams = {
        query,
        languagecode: "en-us",
      };
      const locationResponse = await searchLocations(locationParams);

      if (!locationResponse?.data?.destinations?.length) {
        setError("No locations found for the query.");
        setSearchResults([]);
        return;
      }

      const destination = locationResponse.data.destinations[0];
      if (!destination.ufi) {
        setError("Invalid location data received.");
        setSearchResults([]);
        return;
      }

      const attractionResponse = await searchAttractions({
        id: destination.id,
        sortBy: "trending",
        page: "1",
        currency_code: "USD",
        languagecode: "en-us",
      });

      if (!attractionResponse?.data?.products?.length) {
        setError("No attractions found for the selected location.");
        setSearchResults([]);
        return;
      }

      const attractions: Attraction[] = attractionResponse.data.products.map(
        (item: any) => ({
          id: item.id,
          name: item.name,
          description: item.shortDescription || "No description available",
          image: item.primaryPhoto?.small || "detail.png",
          price: item.representativePrice?.publicAmount || 0,
          currency: item.representativePrice?.currency || "USD",
          date: "N/A",
          location: item.ufiDetails?.bCityName || destination.cityName,
        })
      );

      setSearchResults(attractions);
      setFilterOptions(attractionResponse.data.filterOptions);
    } catch (error: any) {
      console.error("Error fetching attractions:", error);
      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch attractions. Please try again."
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
          <div className="w-full">
            <Input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="e.g., Mumbai..."
              className=""
              label="Location"
            />
          </div>
          <div className="flex justify-end w-full mt-4">
            <div className="w-fit">
              <Button onClick={handleSearch} variant="blue">
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
      {error && (
        <p className="text-red-500 text-sm sm:text-base mb-4">{error}</p>
      )}
      {loading && (
        <p className="text-gray-600 text-sm sm:text-base mb-4">Loading...</p>
      )}
      <div className="flex flex-col lg:flex-row gap-6 mt-5">
        <div className="w-full lg:w-64 xl:w-80 shrink-0">
          <ActivityFilter filterOptions={filterOptions} />
        </div>
        <div className="flex-1">
          <ActivityResultsPage results={searchResults} />
        </div>
      </div>
    </div>
  );
};

export default ActivitySearchResults;
