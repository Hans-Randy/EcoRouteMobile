import { Route } from "../../types";
import { getTopScoringRoutes } from "../routeUtils";

describe("getTopScoringRoutes", () => {
  const mockRoutes: Route[] = [
    { mode: "walking", distance_km: 5, time_min: 60, co2_g: 0, score: 60 },
    { mode: "driving", distance_km: 5, time_min: 10, co2_g: 1000, score: 110 },
    { mode: "bicycling", distance_km: 5, time_min: 25, co2_g: 0, score: 25 },
    { mode: "transit", distance_km: 5, time_min: 20, co2_g: 50, score: 30 }, // Lower score than driving
  ];

  it("should return an empty array if input is empty or undefined", () => {
    expect(getTopScoringRoutes([], 3)).toEqual([]);
    // @ts-expect-error testing undefined input
    expect(getTopScoringRoutes(undefined, 3)).toEqual([]);
  });

  it("should return top N routes sorted by score (ascending)", () => {
    const top3 = getTopScoringRoutes(mockRoutes, 3);
    expect(top3).toHaveLength(3);
    expect(top3[0].mode).toBe("bicycling"); // score 25
    expect(top3[1].mode).toBe("transit"); // score 30
    expect(top3[2].mode).toBe("walking"); // score 60
  });

  it("should return all routes if N is greater than the number of routes, sorted", () => {
    const top5 = getTopScoringRoutes(mockRoutes, 5);
    expect(top5).toHaveLength(4);
    expect(top5[0].mode).toBe("bicycling");
    expect(top5[3].mode).toBe("driving"); // score 110, last one
  });

  it("should return an empty array if N is 0", () => {
    expect(getTopScoringRoutes(mockRoutes, 0)).toEqual([]);
  });

  it("should handle routes with identical scores consistently (stability not guaranteed but order should be based on original or sort algorithm)", () => {
    const routesWithSameScores: Route[] = [
      { mode: "A", distance_km: 1, time_min: 1, co2_g: 1, score: 50 },
      { mode: "B", distance_km: 1, time_min: 1, co2_g: 1, score: 40 },
      { mode: "C", distance_km: 1, time_min: 1, co2_g: 1, score: 50 }, // Same as A
    ];
    const top2 = getTopScoringRoutes(routesWithSameScores, 2);
    expect(top2).toHaveLength(2);
    expect(top2[0].mode).toBe("B"); // score 40
    // The order of A and C might vary depending on the sort stability, but one of them should be second.
    expect(["A", "C"]).toContain(top2[1].mode);
  });
});
