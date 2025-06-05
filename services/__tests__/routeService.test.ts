import { getMockRoutes } from "../routeService";
import { Route } from "../../types";

describe("Route Service - getMockRoutes", () => {
  it("should return a promise that resolves to an array of routes", async () => {
    const routes = await getMockRoutes();
    expect(Array.isArray(routes)).toBe(true);
    // Optionally, check if the array is not empty if your mock data always has routes
    if (routes.length > 0) {
      // Check a sample route for expected properties
      const sampleRoute = routes[0];
      expect(sampleRoute).toHaveProperty("mode");
      expect(sampleRoute).toHaveProperty("distance_km");
      expect(sampleRoute).toHaveProperty("time_min");
      expect(sampleRoute).toHaveProperty("co2_g");
      expect(sampleRoute).toHaveProperty("score");
    }
  });

  it("should return routes with correct data types", async () => {
    const routes = await getMockRoutes();
    if (routes.length > 0) {
      const sampleRoute = routes[0];
      expect(typeof sampleRoute.mode).toBe("string");
      expect(typeof sampleRoute.distance_km).toBe("number");
      expect(typeof sampleRoute.time_min).toBe("number");
      expect(typeof sampleRoute.co2_g).toBe("number");
      expect(typeof sampleRoute.score).toBe("number");
    }
  });
});
