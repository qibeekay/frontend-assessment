// src/components/props/HotelResultsCardProp.tsx
import React from "react";
import { getImageSrc } from "../../utils/imageUtils";
import Button from "./Button";
import { Link } from "react-router-dom";
import { useHotel } from "../../config/HotelContext";
import type { Attraction } from "../../utils/types";

interface HotelResultsCardPropProps extends Attraction {
  remove?: boolean;
}

const HotelResultsCardProp = ({
  id,
  name,
  desc,
  date,
  price,
  image,
  remove = false,
}: HotelResultsCardPropProps) => {
  const { addHotel, removeHotel, hotels } = useHotel();

  // Check if the hotel is already in the itinerary
  const isAdded = hotels.some((hotel) => hotel.id === id);

  const handleAddToBooking = () => {
    addHotel({
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
        <div className="pr-[12px] md:pr-0 py-[12px] pl-[12px] overflow-hidden">
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
                    What's Included: Stay at {name}
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
              <div className="pt-4 px-[24px] pb-[12px]">
                <div className="flex items-center justify-between flex-wrap sm:flex-nowrap">
                  <div className="flex items-center gap-[24px] flex-wrap sm:flex-nowrap">
                    <Link
                      className="text-xs blg:text-[18px] font-medium text-primary"
                      to=""
                    >
                      Hotel details
                    </Link>
                    <Link
                      className="text-xs blg:text-[18px] font-medium text-primary"
                      to=""
                    >
                      Price details
                    </Link>
                  </div>
                  <div>
                    <Button
                      variant="blue"
                      onClick={handleAddToBooking}
                      disabled={isAdded}
                    >
                      {isAdded ? "Added" : "Add to Booking"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={() => removeHotel(id)}
          className={`${
            remove ? "" : "hidden"
          } w-full p-4 md:p-0 md:w-[46px] cursor-pointer grid place-items-center bg-[#FBEAE9]`}
        >
          <div>
            <img src={getImageSrc("x.svg")} alt="Remove" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default HotelResultsCardProp;
