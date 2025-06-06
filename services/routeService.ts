import routesData from "../assets/routes.json";
import { Route } from "../types";

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
        if (routesData && Array.isArray(routesData)) {
          resolve(routesData as Route[]);
        } else {
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
