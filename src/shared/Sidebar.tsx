import { sidebarRoutes } from "../config/sidebarRoutes";
import { Link, useLocation } from "react-router-dom";
import { getImageSrc } from "../utils/imageUtils";
import { useState } from "react"; // Import useState

const Sidebar = () => {
  const location = useLocation();
  const routes = sidebarRoutes.user || [];
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative">
      {/* Hamburger Icon for xl and larger screens */}
      <div className="xl:hidden p-4 absolute">
        <button
          onClick={toggleSidebar}
          className="text-gray-600 focus:outline-none cursor-pointer"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>

      {/* Overlay for when sidebar is open on smaller screens */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 xl:hidden"
          onClick={toggleSidebar} // Close sidebar when clicking outside
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white z-50 transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
           xl:translate-x-0 xl:w-[300px] xl:py-[24px] xl:px-[20px] xl:bg-white xl:rounded-[4px] xl:sticky xl:top-[135px] xl:h-[calc(100vh-165px)]`}
      >
        <div className="h-full flex flex-col justify-between p-[20px] xl:p-0">
          {" "}
          {/* Added padding for fixed sidebar */}
          <div>
            <nav className="mt-7 flex flex-col gap-[8px]">
              {routes.map((route) => (
                <Link
                  key={route.path}
                  to={route.path}
                  className={`flex gap-[6px] rounded-[6px] items-center px-[14px] py-[12px] cursor-pointer text-sm ${
                    location.pathname === route.path
                      ? "bg-[#E7F0FF] text-textSecondary font-medium"
                      : "text-textSecondary hover:bg-[#E7F0FF] font-medium"
                  }`}
                  onClick={toggleSidebar} // Close sidebar on navigation
                >
                  <img
                    src={route.icon}
                    alt={route.name}
                    className="w-[32px] h-[32px]"
                  />
                  <span>{route.name}</span>
                </Link>
              ))}
            </nav>
          </div>
          {/* logout */}
          <div className="">
            <button className="flex gap-[6px] rounded-[6px] items-center px-[12px] py-[10px] text-sm text-[#666666] border border-[#E4E4E4] font-medium w-full cursor-pointer">
              <img
                src={getImageSrc("logout.png")}
                alt={"logout"}
                className="w-5 h-5"
              />
              <span className="text-deepRed">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
