import { AlignJustify, ChevronDown } from "lucide-react";
import Button from "../components/props/Button";
import LinksProps from "../components/props/LinksProps";
import { getImageSrc } from "../utils/imageUtils";

const FirstLinks = [
  {
    name: "Home",
    icon: "home.svg",
    address: "/",
  },
  {
    name: "Dashboard",
    icon: "dash.png",
    address: "/dashboard",
  },
  {
    name: "Wallet",
    icon: "wallet.svg",
    address: "",
  },
  {
    name: "Plan a trip",
    icon: "trip.png",
    address: "",
  },
  {
    name: "Commission for life",
    icon: "life.svg",
    address: "",
  },
];

const SecondLinks = [
  {
    name: "Notification",
    icon: "bell.png",
    address: "",
  },
  {
    name: "Carts",
    icon: "cart.png",
    address: "",
  },
  {
    name: "Create",
    icon: "create.png",
    address: "",
  },
];

const Navbar = () => {
  return (
    <nav className="sticky top-0 px-5 py-[24px] max-w-[1920px] bg-white mx-auto z-40">
      <div className="w-full flex items-center justify-between">
        {/* logo / search */}
        <div className="flex items-center gap-[28px]">
          {/* logo */}
          <div>
            <div className="w-[58px] h-[54px] grid place-items-center rounded-[4px] bg-primary">
              <img src={getImageSrc("logo.png")} alt="" />
            </div>
          </div>

          {/* search */}
          <div className="flex items-center gap-[8px] bg-[#F0F2F5] h-[54px] w-full md:w-[400px] rounded-[4px] p-[12px]">
            {/* icon */}
            <div>
              <img className="" src={getImageSrc("search.svg")} alt="" />
            </div>
            {/* input */}
            <div>
              <input className="w-full outline-none" type="text" />
            </div>
          </div>
        </div>

        {/* links / profile */}
        <div className="hidden xl:flex items-center gap-[24px] ">
          {FirstLinks.map((link, index) => (
            <div className=" " key={index}>
              <LinksProps
                icon={link.icon}
                name={link.name}
                address={link.address}
              />
            </div>
          ))}

          <div className="w-[1px] h-[40px] bg-[#98A2B3]"></div>

          <div>
            <div className="flex items-center gap-[24px]">
              <Button variant="blue" size="sm">
                Subscribe
              </Button>

              {SecondLinks.map((link, index) => (
                <div className="" key={index}>
                  <LinksProps
                    icon={link.icon}
                    name={link.name}
                    address={link.address}
                  />
                </div>
              ))}

              <div className="">
                <div className="flex items-center gap-[15px]">
                  <div>
                    <div className="w-[52px] aspect-square rounded-full overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        src={getImageSrc("detail.png")}
                        alt=""
                      />
                    </div>
                  </div>

                  <div>
                    <ChevronDown className="w-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* menu */}
        <div className="xl:hidden">
          <button className="cursor-pointer">
            <AlignJustify />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
