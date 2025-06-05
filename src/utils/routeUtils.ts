import { Route } from "../types";

/**
 * Sorts routes by score in ascending order and returns the top N routes.
 * @param routes - Array of routes to sort.
 * @param count - Number of top routes to return.
 * @returns Array of top N scoring routes.
 */
export const getTopScoringRoutes = (
  routes: Route[],
  count: number
): Route[] => {
  if (!routes) return [];
  return [...routes].sort((a, b) => a.score - b.score).slice(0, count);
};
