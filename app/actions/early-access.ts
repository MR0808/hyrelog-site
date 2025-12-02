"use server";

import { z } from "zod";

const earlyAccessSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  role: z.string().min(1, "Role is required"),
  useCase: z.string().min(1, "Please tell us how you plan to use HyreLog"),
});

export type EarlyAccessFormData = z.infer<typeof earlyAccessSchema>;

export async function submitEarlyAccess(data: EarlyAccessFormData) {
  try {
    // Validate the data
    const validated = earlyAccessSchema.parse(data);
    
    // Log to console for now
    console.log("Early Access Form Submission:", validated);
    
    // TODO: Store in database or send to email service
    
    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues[0]?.message || "Validation failed",
      };
    }
    console.error("Error processing early access form:", error);
    return {
      success: false,
      error: "Failed to process request",
    };
  }
}

