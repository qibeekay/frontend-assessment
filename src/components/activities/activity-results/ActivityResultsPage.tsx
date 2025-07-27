// src/components/activities/activity-results/ActivityResultsPage.tsx
import React from "react";
import AttractionResultsCardProp from "../../props/AttractionResultsCardProp";
import type { Attraction } from "../../../utils/types";

interface ActivityResultsPageProps {
  results: Attraction[];
}

const ActivityResultsPage = ({ results }: ActivityResultsPageProps) => {
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:gap-6">
        {results.length > 0 ? (
          results.map((attraction) => (
            <AttractionResultsCardProp
              key={attraction.id}
              id={attraction.id}
              name={attraction.name}
              desc={attraction.desc}
              date={attraction.date}
              price={attraction.price}
              image={attraction.image}
              remove
            />
          ))
        ) : (
          <p className="text-sm sm:text-base text-gray-600 text-center">
            No attractions found.
          </p>
        )}
      </div>
    </div>
  );
};

export default ActivityResultsPage;
