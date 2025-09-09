import { z } from "zod";

/**
 * Zod schema for validating the InitiateEnrollmentDto.
 * It ensures all incoming data conforms to the expected structure and types.
 */
export const InitiateEnrollmentSchema = z
  .object({
    userEmail: z
      .string()
      .email("Invalid email address")
      .trim()
      .min(1, "Email is required"),
    userPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long"),
    username: z
      .string()
      .trim()
      .min(3, "Username must be at least 3 characters long"),
    userFirstName: z.string().min(1, "Required"),
    userLastName: z.string().min(1, "Required"),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
  })
  .superRefine((data, ctx) => {
    // Custom cross-field validation for latitude and longitude.
    // Both must be present if one is.
    if (
      (data.latitude !== undefined && data.longitude === undefined) ||
      (data.latitude === undefined && data.longitude !== undefined)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "Latitude and longitude must both be provided if a location is specified.",
        path: ["latitude", "longitude"],
      });
    }

    // Optional: Add more specific range validation for real-world latitude and longitude.
    if (
      data.latitude !== undefined &&
      (data.latitude < -90 || data.latitude > 90)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Latitude must be between -90 and 90.",
        path: ["latitude"],
      });
    }

    if (
      data.longitude !== undefined &&
      (data.longitude < -180 || data.longitude > 180)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Longitude must be between -180 and 180.",
        path: ["longitude"],
      });
    }
  });

export type InitiateEnrollmentDto = z.infer<typeof InitiateEnrollmentSchema>;
