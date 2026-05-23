import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { AvailabilityStatus } from "@/types";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const availabilityLabel = (availability: AvailabilityStatus): string => {
  switch (availability) {
    case "available":
      return "Available";
    case "busy":
      return "Busy";
    default:
      return "On Leave";
  }
};
