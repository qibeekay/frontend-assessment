import React from "react";
import { getImageSrc } from "../../utils/imageUtils";
import Button from "../props/Button";
import { useNavigate } from "react-router-dom";

const details = [
  {
    name: "Activities",
    desc: "Build, personalize, and optimize your itineraries with our trip planner.",
    button: "Activities",
    address: "/activities",
    color: "#000031",
    text: "white",
    variant: "blue",
  },
  {
    name: "Hotels",
    desc: "Build, personalize, and optimize your itineraries with our trip planner.",
    button: "Hotels",
    address: "/hotels",
    color: "#E7F0FF",
    text: "#1D2433",
    variant: "blue",
  },
  {
    name: "Flights",
    desc: "Build, personalize, and optimize your itineraries with our trip planner.",
    button: "Flights",
    address: "/flights",
    color: "#0D6EFD",
    text: "white",
    variant: "white",
  },
];

const DashboardHeader = () => {
  const navigate = useNavigate();

  const redirect = (address: string) => {
    navigate(address);
  };
  return (
    <div>
      {/* banner */}
      <div>
        {/* image */}
        <div className="w-full relative">
          <img
            className="w-full h-full object-cover"
            src={getImageSrc("banner.png")}
            alt=""
          />

          <button className="absolute top-4 w-[48px] aspect-square left-4 bg-white/20 grid place-items-center">
            <div>
              <img src={getImageSrc("arrow-left.svg")} alt="" />
            </div>
          </button>
        </div>
      </div>

      {/* action buttons */}
      <div className="mt-4">
        {/* details */}
        <div className="flex items-center justify-between">
          <div className="bg-[#FEF4E6] px-[8px] py-[4px] text-[#7A4504] flex items-center gap-1 text-sm font-medium w-fit rounded-[4px]">
            <img src={getImageSrc("calendar.png")} alt="" />
            <span>21 March 2024</span>
            <img src={getImageSrc("calendar.png")} alt="" />
            <span>21 April 2024</span>
          </div>

          {/* button */}
          <div className="flex items-center gap-[8px]">
            <div className="w-[160px]">
              <Button variant="lightBlue">
                <img src={getImageSrc("user.svg")} alt="" />
              </Button>
            </div>
            <div>
              <img src={getImageSrc("dot.png")} alt="" />
            </div>
          </div>
        </div>

        {/* header */}
        <div>
          <h1 className="text-[24px] leading-[32px] font-semibold text-black">
            Bahamas Family Trip
          </h1>
          <div className="flex items-center justify-between">
            {/* text */}
            <div className="flex items-center gap-1 text-textSecondary text-base leading-[24px]">
              <p>New York,  United States of America </p>
              <p>|</p>
              <p>Solo Trip </p>
            </div>
            {/* profile */}
            <div className="flex items-center gap-[8px]">
              <div>
                <img src={getImageSrc("profile.png")} alt="" />
              </div>
              <div className="opacity-0">
                <img src={getImageSrc("dot.png")} alt="" />
              </div>
            </div>
          </div>
        </div>

        {/* action cards */}
        <div className="mt-4 flex items-center gap-[4px] flex-wrap">
          {details.map((detail, index) => (
            <div
              key={index}
              className="w-[270px] h-[193px] rounded-[4px] p-[12px] flex flex-col justify-between"
              style={{ backgroundColor: detail.color, color: detail.text }}
            >
              {/* text */}
              <div>
                <p className="font-semibold text-base">{detail.name}</p>
                <p className="mt-[4px] text-sm font-normal">{detail.desc}</p>
              </div>

              {/* button
               */}
              <div>
                <Button
                  variant={detail.variant}
                  onClick={() => redirect(detail.address)}
                >
                  Add {detail.button}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
