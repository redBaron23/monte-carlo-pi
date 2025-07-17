import { post } from "../libs/api";
import { PointsResponseSchema } from "../schemas/pi-estimator-schema";
import type { Point } from "../schemas/point-schema";

async function fetchRandomPoints(n: number): Promise<Point[]> {
  const response = await post(
    "/api/random-points",
    { n },
    PointsResponseSchema
  );

  return response.points;
}

/**
 * π * r^2 = area of the circle
 * b * h = area of the square
 *
 * Given a circle with r = 1 inscribed in a square (b = 2, h = 2),
 * the area of the circle is π, and the area of the square is 4.
 *
 * So: (points inside the circle) / (total points) ≈ π / 4
 * => π ≈ 4 * (points inside / total points)
 *
 * First, I need to count how many points fall inside the circle.
 * Then apply the formula
 */
function estimatePi(points: Point[]): number {
  const pointsInside = points.filter(([x, y]) => x * x + y * y <= 1).length;
  return (pointsInside / points.length) * 4;
}

/**
 * Fetches random points from backend and calculates Pi estimation.
 * @param n Number of random points to generate.
 * @returns Estimated value of Pi.
 */
export async function calculatePi(n: number): Promise<number> {
  const points = await fetchRandomPoints(n);
  return estimatePi(points);
}
