import { z } from "zod";
import { PointSchema } from "./point-schema";

export const PointsResponseSchema = z.object({
  points: z.array(PointSchema),
  count: z.number().int().positive(),
});

export type PointsResponse = z.infer<typeof PointsResponseSchema>;
