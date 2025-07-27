// services/api.ts
import axios from "axios";
import type {
  ActivitySearchParams,
  FlightSearchParams,
  HotelSearchParams,
} from "../utils/types";

const API_KEY = import.meta.env.VITE_API_RAPID_KEY;
const BASE_URL = "https://booking-com15.p.rapidapi.com/api/v1";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "X-RapidAPI-Key": API_KEY,
    "X-RapidAPI-Host": "booking-com15.p.rapidapi.com",
  },
});

export const searchFlightDestinations = async (params: {
  query: string;
  languagecode?: string;
}) => {
  try {
    const response = await api.get("/flights/searchDestination", {
      params: { ...params, languagecode: params.languagecode || "en-us" },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching flight destinations:", error);
    throw error;
  }
};

export const searchFlights = async (params: FlightSearchParams) => {
  try {
    const response = await api.get("/flights/searchFlights", {
      params: { ...params, languagecode: "en-us" },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching flights:", error);
    throw error;
  }
};

export const searchDestinations = async (params: {
  query: string;
  languagecode?: string;
}) => {
  try {
    const response = await api.get("/hotels/searchDestination", {
      params: { ...params, languagecode: params.languagecode || "en-us" },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching destinations:", error);
    throw error;
  }
};

export const searchHotels = async (params: HotelSearchParams) => {
  try {
    const response = await api.get("/hotels/searchHotels", {
      params: { ...params, languagecode: params.languagecode || "en-us" },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching hotels:", error);
    throw error;
  }
};

export const searchLocations = async (params: ActivitySearchParams) => {
  try {
    const response = await api.get("/attraction/searchLocation", {
      params: { ...params, languagecode: params.languagecode || "en-us" },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching locations:", error);
    throw error;
  }
};

export const searchAttractions = async (params: {
  id: string;
  sortBy?: string;
  page?: string;
  currency_code?: string;
  languagecode?: string;
}) => {
  try {
    const response = await api.get("/attraction/searchAttractions", {
      params: { ...params, languagecode: params.languagecode || "en-us" },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching attractions:", error);
    throw error;
  }
};
