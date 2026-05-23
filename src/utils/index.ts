import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const availabilityLabel = (availability: string): string => {
  switch (availability) {
    case "immediate":
      return "Available now";
    case "2_weeks":
      return "2 weeks";
    case "1_month":
      return "1 month";
    default:
      return "Allocated";
  }
};