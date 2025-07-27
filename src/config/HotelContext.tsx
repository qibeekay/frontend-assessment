// src/config/HotelContext.tsx
import React, { createContext, useContext, useState } from "react";

interface Hotel {
  id: string;
  name: string;
  desc: string;
  image: string;
  price: number;
  date: string | undefined;
}

interface HotelContextType {
  hotels: Hotel[];
  addHotel: (hotel: Hotel) => void;
  removeHotel: (id: string) => void;
}

const HotelContext = createContext<HotelContextType | undefined>(undefined);

export const HotelProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [hotels, setHotels] = useState<Hotel[]>([]);

  const addHotel = (hotel: Hotel) => {
    setHotels((prev) => [...prev, hotel]);
  };

  const removeHotel = (id: string) => {
    setHotels((prev) => prev.filter((hotel) => hotel.id !== id));
  };

  return (
    <HotelContext.Provider value={{ hotels, addHotel, removeHotel }}>
      {children}
    </HotelContext.Provider>
  );
};

export const useHotel = () => {
  const context = useContext(HotelContext);
  if (!context) {
    throw new Error("useHotel must be used within a HotelProvider");
  }
  return context;
};
