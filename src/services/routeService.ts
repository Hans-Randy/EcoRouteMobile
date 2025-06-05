import routesData from "@/src/assets/routes.json";
import { Route } from "@/src/types";

// Simulate API call delay
const MOCK_API_DELAY = 500; // 0.5 seconds

/**
 * Fetches the mock route data.
 * Simulates a network request with a delay.
 */
export const getMockRoutes = async (): Promise<Route[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        // In a real app, this would be an API call (e.g., using axios or fetch)
        // Here, we're directly using the imported JSON data
        if (routesData && Array.isArray(routesData)) {
          resolve(routesData as Route[]);
        } else {
          // This case should ideally not happen with direct JSON import if the file is correct
          console.error("Error: routes.json is not a valid array or is empty.");
          reject(new Error("Failed to load route data. Invalid format."));
        }
      } catch (error) {
        console.error("Error fetching mock routes:", error);
        reject(
          new Error("An unexpected error occurred while fetching routes.")
        );
      }
    }, MOCK_API_DELAY);
  });
};
