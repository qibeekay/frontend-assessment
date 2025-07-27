// src/config/AttractionContext.tsx
import React, { createContext, useContext, useState } from "react";

interface Attraction {
  id: string;
  name: string;
  desc: string;
  image: string;
  price: number;
  date: string | undefined;
}

interface AttractionContextType {
  attractions: Attraction[];
  addAttraction: (attraction: Attraction) => void;
  removeAttraction: (id: string) => void;
}

const AttractionContext = createContext<AttractionContextType | undefined>(
  undefined
);

export const AttractionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [attractions, setAttractions] = useState<Attraction[]>([]);

  const addAttraction = (attraction: Attraction) => {
    setAttractions((prev) => [...prev, attraction]);
  };

  const removeAttraction = (id: string) => {
    setAttractions((prev) => prev.filter((attraction) => attraction.id !== id));
  };

  return (
    <AttractionContext.Provider
      value={{ attractions, addAttraction, removeAttraction }}
    >
      {children}
    </AttractionContext.Provider>
  );
};

export const useAttraction = () => {
  const context = useContext(AttractionContext);
  if (!context) {
    throw new Error("useAttraction must be used within an AttractionProvider");
  }
  return context;
};
