import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, Minus, Plus } from "lucide-react";
import Button from "../../props/Button";

interface PassengerDropdownProps {
  adults: number;
  setAdults: React.Dispatch<React.SetStateAction<number>>;
  children: number;
  setChildren: React.Dispatch<React.SetStateAction<number>>;
}

const PassengerDropdown: React.FC<PassengerDropdownProps> = ({
  adults,
  setAdults,
  children,
  setChildren,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // Handle increment/decrement for adults
  const handleAdultChange = (increment: boolean) => {
    setAdults((prev) => {
      const newValue = increment ? prev + 1 : prev - 1;
      return newValue >= 1 ? newValue : 1; // Minimum 1 adult
    });
  };

  // Handle increment/decrement for children
  const handleChildrenChange = (increment: boolean) => {
    setChildren((prev) => {
      const newValue = increment ? prev + 1 : prev - 1;
      return newValue >= 0 ? newValue : 0; // Minimum 0 children
    });
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative w-fit text-white">
      <button
        onClick={toggleDropdown}
        className="w-full cursor-pointer flex items-center gap-4 text-sm sm:text-base text-left"
        aria-expanded={isOpen}
        aria-controls="passenger-dropdown"
      >
        {`${adults} Adult${adults > 1 ? "s" : ""}, ${children} Child${
          children !== 1 ? "ren" : ""
        }`}

        <div>
          <ChevronDown className="w-4 h-4" />
        </div>
      </button>
      {isOpen && (
        <div
          ref={dropdownRef}
          id="passenger-dropdown"
          className="absolute z-20 mt-1 w-[230px] bg-white text-textPrimary border rounded-md shadow-lg p-4"
        >
          <div className="flex justify-between items-center mb-4 w-full">
            <span>Adults</span>
            <div className="flex items-center gap-2">
              <div>
                <button
                  onClick={() => handleAdultChange(false)}
                  className="w-7 aspect-square border rounded-full disabled:opacity-50 grid place-items-center"
                  disabled={adults <= 1}
                  aria-label="Decrease adults"
                >
                  <Minus className="w-4" />
                </button>
              </div>
              <span>{adults}</span>
              <div>
                <button
                  onClick={() => handleAdultChange(true)}
                  className="w-7 aspect-square border rounded-full disabled:opacity-50 grid place-items-center"
                  aria-label="Increase adults"
                >
                  <Plus className="w-4" />
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span>Children</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleChildrenChange(false)}
                className="w-7 aspect-square border rounded-full disabled:opacity-50 grid place-items-center"
                disabled={children <= 0}
                aria-label="Decrease children"
              >
                <Minus className="w-4" />
              </button>
              <span>{children}</span>
              <button
                onClick={() => handleChildrenChange(true)}
                className="w-7 aspect-square border rounded-full disabled:opacity-50 grid place-items-center"
                aria-label="Increase children"
              >
                <Plus className="w-4" />
              </button>
            </div>
          </div>
          <div className="mt-5">
            <Button variant="blue" size="sm" onClick={toggleDropdown}>
              Done
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PassengerDropdown;
