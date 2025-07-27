// src/components/activities/activity-results/ActivityFilter.tsx
import React, { useState } from "react";

interface FilterOptions {
  typeFilters?: { name: string; tagname: string; productCount: number }[];
  labelFilters?: { name: string; tagname: string; productCount: number }[];
  priceFilters?: { name: string; tagname: string; productCount: number }[];
}

interface ActivityFilterProps {
  filterOptions: FilterOptions | null;
}

const ActivityFilter = ({ filterOptions }: ActivityFilterProps) => {
  // State to manage the open/closed status of the entire filter menu
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(true); // Start with filters open by default

  const toggleFilterMenu = () => {
    setIsFilterMenuOpen(!isFilterMenuOpen);
  };

  return (
    <div className="p-4 bg-white rounded-md shadow-md">
      <button
        className="flex justify-between items-center w-full py-2 text-base sm:text-lg font-semibold text-gray-800 hover:text-blue-600 focus:outline-none mb-3 sm:mb-4"
        onClick={toggleFilterMenu}
      >
        <h3>Filters</h3>
        {/* Arrow icon to indicate dropdown state */}
        <svg
          className={`w-5 h-5 transition-transform duration-200 ${
            isFilterMenuOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>

      {isFilterMenuOpen && // Conditionally render the entire filter content
        (filterOptions ? (
          <div className="space-y-4">
            {filterOptions.typeFilters && (
              <div>
                <h4 className="font-medium text-sm sm:text-base mb-2">Type</h4>
                <div className="space-y-2">
                  {filterOptions.typeFilters.map((filter) => (
                    <div
                      key={filter.tagname}
                      className="flex items-center gap-2"
                    >
                      <input
                        type="checkbox"
                        id={filter.tagname}
                        className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <label
                        htmlFor={filter.tagname}
                        className="text-sm sm:text-base text-gray-700"
                      >
                        {filter.name} ({filter.productCount})
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {filterOptions.priceFilters && (
              <div>
                <h4 className="font-medium text-sm sm:text-base mb-2">
                  Price Range
                </h4>
                <div className="space-y-2">
                  {filterOptions.priceFilters.map((filter) => (
                    <div
                      key={filter.tagname}
                      className="flex items-center gap-2"
                    >
                      <input
                        type="checkbox"
                        id={filter.tagname}
                        className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <label
                        htmlFor={filter.tagname}
                        className="text-sm sm:text-base text-gray-700"
                      >
                        {filter.name} ({filter.productCount})
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {filterOptions.labelFilters && (
              <div>
                <h4 className="font-medium text-sm sm:text-base mb-2">
                  Labels
                </h4>
                <div className="space-y-2">
                  {filterOptions.labelFilters.map((filter) => (
                    <div
                      key={filter.tagname}
                      className="flex items-center gap-2"
                    >
                      <input
                        type="checkbox"
                        id={filter.tagname}
                        className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <label
                        htmlFor={filter.tagname}
                        className="text-sm sm:text-base text-gray-700"
                      >
                        {filter.name} ({filter.productCount})
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className="text-sm sm:text-base text-gray-600">
            No filters available.
          </p>
        ))}
    </div>
  );
};

export default ActivityFilter;
