import type {
  ButtonHTMLAttributes,
  ComponentType,
  LazyExoticComponent,
} from "react";

export type LazyComponent = LazyExoticComponent<ComponentType>;

export interface SidebarRoute {
  name: string;
  path: string;
  icon: string;
  component: LazyComponent;
}

export interface Props {
  name: string;
  icon: string;
  address: string;
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  fontSize?: string;
  variant?: string;
  size?: string;
}

export interface FlightSearchParams {
  fromId: string;
  toId: string;
  departDate: string;
  returnDate?: string;
  stops?: string;
  pageNo?: string;
  adults?: string;
  children?: string;
  sort?: string;
  cabinClass?: string;
  currency_code?: string;
}

export interface HotelSearchParams {
  dest_id: string;
  search_type?: string;
  adults?: string;
  children_age?: string;
  room_qty?: string;
  page_number?: string;
  units?: string;
  temperature_unit?: string;
  languagecode?: string;
  currency_code?: string;
  location?: string;
  departure_date: string;
  arrival_date: string;
}

export interface ActivitySearchParams {
  query: string;
  languagecode: string;
}

export interface Attraction {
  id: string;
  name: string;
  desc: string;
  image: string;
  price: number;
  date?: string;
  location?: string;
}

export interface Flight {
  id: string;
  token: string;
  departureAirport: string;
  arrivalAirport: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  currency: string;
  image: string;
  duration: number;
  airlineName: string;
  flightNumber: string;
  flightClass: string;
  departureDate: string;
  arrivalDate: string;
  connectionType: string;
  baggageAllowance: string;
  cabinBaggageAllowance: string;
  hasEntertainment: boolean;
  hasMeal: boolean;
  hasUsbPort: boolean;
}
