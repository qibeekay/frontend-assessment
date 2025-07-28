import { getImageSrc } from "../../utils/imageUtils";
import Button from "./Button";
import { Link } from "react-router-dom";
import { useAttraction } from "../../config/AttractionContext";
import type { Attraction } from "../../utils/types";

interface AttractionResultsCardPropProps extends Attraction {
  remove?: boolean;
}

const AttractionResultsCardProp = ({
  id,
  name,
  desc,
  date,
  price,
  image,
  remove = false,
}: AttractionResultsCardPropProps) => {
  const { addAttraction, removeAttraction, attractions } = useAttraction();

  // Check if the attraction is already in the itinerary
  const isAdded = attractions.some((attraction) => attraction.id === id);

  const handleAddToItinerary = () => {
    addAttraction({
      id,
      name,
      desc,
      image,
      price,
      date,
    });
  };

  return (
    <div>
      <div className="shadow-md bg-white rounded-md flex flex-col md:flex-row min-h-64 w-full text-textPrimary">
        <div className="py-[12px] pl-[12px]">
          <div className="w-full md:w-[232px] overflow-hidden h-full rounded-[4px]">
            <img
              className="w-full h-full object-cover"
              src={image || "detail.png"}
              alt={name}
            />
          </div>
        </div>
        <div className="flex-1">
          <div className="h-full flex flex-col justify-between">
            <div className="px-[24px] pt-[12px]">
              <div className="flex items-center justify-between gap-10 flex-wrap sm:flex-nowrap">
                <h1 className="text-sm blg:text-[20px] font-semibold">
                  {name}
                </h1>
                <p className="blg:text-[28px] font-semibold leading-[36px] flex items-center gap-[4px]">
                  <p>$</p>
                  <span>{price.toFixed(1)}</span>
                </p>
              </div>
              <div className="flex flex-wrap sm:flex-nowrap justify-between text-base font-medium">
                <p className="font-medium leading-[24px] max-w-[445px]">
                  {desc}
                </p>
                <p>{date}</p>
              </div>
              <div className="flex items-center gap-[16px] mt-2 flex-wrap sm:flex-nowrap">
                <div className="flex items-center gap-[4px]">
                  <img src={getImageSrc("MapPin.png")} alt="" />
                  <p className="text-primary text-xs blg:text-[16px] font-medium">
                    Directions
                  </p>
                </div>
              </div>
            </div>
            <div className="border-t border-b border-[#E4E7EC] py-2 px-[24px]">
              <div className="flex justify-between flex-wrap sm:flex-nowrap">
                <div className="flex items-center gap-[4px] text-[18px] font-medium text-textSecondary flex-wrap blg:flex-nowrap">
                  <p className="text-xs blg:text-base">
                    What's Included: Admission to {name}
                  </p>
                  <Link
                    className="text-sm blg:text-[18px] font-medium text-primary"
                    to=""
                  >
                    See more
                  </Link>
                </div>
              </div>
            </div>
            <div>
              <div className="px-[24px] pb-[12px]">
                <div className="flex items-center justify-between flex-wrap sm:flex-nowrap">
                  <div className="flex items-center gap-[24px] flex-wrap sm:flex-nowrap">
                    <Link
                      className="text-xs blg:text-[18px] font-medium text-primary"
                      to=""
                    >
                      Activity details
                    </Link>
                    <Link
                      className="text-xs blg:text-[18px] font-medium text-primary"
                      to=""
                    >
                      Price details
                    </Link>
                  </div>
                  <div className="relative">
                    {isAdded ? (
                      <Link
                        to={""}
                        className="text-xs sm:text-base text-primary hover:underline font-medium"
                      >
                        Edit Details
                      </Link>
                    ) : (
                      <Button variant="blue" onClick={handleAddToItinerary}>
                        Add to Itinerary
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={() => removeAttraction(id)}
          className={`${
            remove ? "" : "hidden"
          } w-[46px] cursor-pointer grid place-items-center bg-[#FBEAE9]`}
        >
          <div>
            <img src={getImageSrc("x.svg")} alt="Remove" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default AttractionResultsCardProp;
