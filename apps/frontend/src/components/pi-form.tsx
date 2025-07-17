import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { calculatePi } from "@/services/pi-estimator";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import { Loader2, Calculator, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const schema = z.object({
  iterations: z
    .number({
      error: "Must be a valid number",
    })
    .min(1000, { message: "Minimum 1,000 iterations" })
    .max(10000000, { message: "Maximum 10 million iterations" }),
});

type FormData = z.infer<typeof schema>;

const gradientText =
  "bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent";

export function PiForm() {
  const [result, setResult] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      iterations: 10000,
    },
  });

  const onSubmit = async (data: FormData) => {
    setResult(null);

    try {
      const pi = await calculatePi(data.iterations);
      setResult(pi.toString());
    } catch (error) {
      console.error("Error calculating π:", error);
    }
  };

  return (
    <Card className="w-full max-w-md shadow-xl border-0 bg-gradient-to-br from-white to-gray-50">
      <CardHeader className="space-y-1">
        <CardTitle className={cn(gradientText, "text-2xl font-bold")}>
          π Calculator
        </CardTitle>
        <CardDescription className="text-gray-600">
          Estimate π using Monte Carlo method
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label
              htmlFor="iterations"
              className="text-sm font-medium text-gray-700"
            >
              Number of iterations
            </Label>
            <div className="relative">
              <Input
                id="iterations"
                type="number"
                placeholder="Enter iterations (e.g., 10000)"
                {...register("iterations", { valueAsNumber: true })}
                className={cn(
                  "h-12 pl-4 pr-12 text-base transition-all duration-200 focus:ring-purple-500",
                  errors.iterations
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-200 hover:border-gray-300"
                )}
              />
              <Calculator className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            {errors.iterations && (
              <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                <span className="inline-block w-1 h-1 bg-red-600 rounded-full"></span>
                {errors.iterations.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 text-base font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Calculating...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Calculate π
              </>
            )}
          </Button>
        </form>

        {result && (
          <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-100">
            <p className="text-sm text-gray-600 mb-1">Estimated value of π:</p>
            <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {result}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Actual π ≈ 3.14159265359...
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
