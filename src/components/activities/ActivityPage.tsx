import { getImageSrc } from "../../utils/imageUtils";
import Button from "../props/Button";
import { Link } from "react-router-dom";
import { useAttraction } from "../../config/AttractionContext";
import type { Attraction } from "../../utils/types";
import AttractionResultsCardProp from "../props/AttractionResultsCardProp";

const ActivityPage = () => {
  const { attractions } = useAttraction();

  return (
    <div className="h-full">
      <div className="w-full bg-primary rounded-[4px] text-white h-full p-[24px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[8px]">
            <div>
              <img src={getImageSrc("road.png")} alt="" />
            </div>
            <p className="font-semibold text-sm">Activities</p>
          </div>

          {attractions.length > 0 && (
            <Link to="/activities/results">
              <Button variant="white">Add Activities</Button>
            </Link>
          )}
        </div>
        <div className="mt-10">
          {attractions.length === 0 ? (
            <div className="w-full min-h-[274px] rounded-[4px] bg-white text-textPrimary mx-auto px-4 text-sm font-medium flex items-center justify-center">
              <div className="flex flex-col gap-[8px] items-center justify-center">
                <div>
                  <img src={getImageSrc("files.png")} alt="" />
                </div>
                <p>No Request Yet</p>
                <div>
                  <Link to="/activities/results">
                    <Button variant="blue">Add Activities</Button>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {attractions.map((attraction: Attraction) => (
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
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityPage;
