import { ZodType } from "zod";
import { API_BASE_URL } from "./env";

export async function post<T>(
  endpoint: string,
  body: object,
  schema?: ZodType<T>
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Something went wrong");
  }

  const json = await response.json();

  if (schema) {
    const parsed = schema.safeParse(json);
    if (!parsed.success) {
      throw new Error("Invalid response format");
    }
    return parsed.data;
  }

  return json as T;
}
