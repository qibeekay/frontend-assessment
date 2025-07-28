// src/components/hotels/hotel-results/HotelResultsPage.tsx
import React from "react";
import HotelResultsCardProp from "../../props/HotelResultsCardProp";
import type { Attraction } from "../../../utils/types";

interface HotelResultsPageProps {
  results: Attraction[];
}

const HotelResultsPage = ({ results }: HotelResultsPageProps) => {
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:gap-6">
        {results.length > 0 ? (
          results.map((hotel) => (
            <HotelResultsCardProp
              key={hotel.id}
              id={hotel.id}
              name={hotel.name}
              desc={hotel.desc}
              date={hotel.date}
              price={hotel.price}
              image={hotel.image}
            />
          ))
        ) : (
          <p className="text-sm sm:text-base text-gray-600 text-center">
            No hotels found.
          </p>
        )}
      </div>
    </div>
  );
};

export default HotelResultsPage;
