import { getImageSrc } from "../../utils/imageUtils";
import Button from "../props/Button";
import { Link } from "react-router-dom";
import { useAttraction } from "../../config/AttractionContext";
import type { Attraction } from "../../utils/types";
import AttractionResultsCardProp from "../props/AttractionResultsCardProp";
import HotelResultsCardProp from "../props/HotelResultsCardProp";
import { useHotel } from "../../config/HotelContext";

const HotelsPage = () => {
  const { hotels, removeHotel } = useHotel();

  return (
    <div className="h-full">
      <div className="w-full bg-[#344054] rounded-[4px] text-white h-full p-[24px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[8px]">
            <div>
              <img src={getImageSrc("warehouse.png")} alt="" />
            </div>
            <p className="font-semibold text-sm">Hotels</p>
          </div>

          <div>
            <Button>Add Hotels</Button>
          </div>
        </div>
        <div className="mt-10">
          {hotels.length === 0 ? (
            <div className="w-full min-h-[274px] rounded-[4px] bg-white text-textPrimary mx-auto px-4 text-sm font-medium flex items-center justify-center">
              <div className="flex flex-col gap-[8px] items-center justify-center">
                <div>
                  <img src={getImageSrc("Ehotel.png")} alt="" />
                </div>
                <p>No Request Yet</p>
                <div>
                  <Link to="/hotels/results">
                    <Button variant="blue">Add Hotel</Button>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {hotels.map((attraction: Attraction) => (
                <HotelResultsCardProp
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

export default HotelsPage;
