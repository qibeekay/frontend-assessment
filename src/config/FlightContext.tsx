// src/config/FlightContext.tsx
import React, { createContext, useContext, useState } from "react";
import type { Flight } from "../utils/types";

interface FlightContextType {
  flights: Flight[];
  addFlight: (flight: Flight) => void;
  removeFlight: (id: string) => void;
}

const FlightContext = createContext<FlightContextType | undefined>(undefined);

export const FlightProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [flights, setFlights] = useState<Flight[]>([]);

  const addFlight = (flight: Flight) => {
    setFlights((prev) => [...prev, flight]);
  };

  const removeFlight = (id: string) => {
    setFlights((prev) => prev.filter((flight) => flight.id !== id));
  };

  return (
    <FlightContext.Provider value={{ flights, addFlight, removeFlight }}>
      {children}
    </FlightContext.Provider>
  );
};

export const useFlight = () => {
  const context = useContext(FlightContext);
  if (!context) {
    throw new Error("useFlight must be used within a FlightProvider");
  }
  return context;
};
