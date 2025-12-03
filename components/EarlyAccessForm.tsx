"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { submitEarlyAccess, type EarlyAccessFormData } from "@/app/actions/early-access";
import { analytics } from "@/lib/analytics";

const earlyAccessSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  role: z.string().min(1, "Role is required"),
  useCase: z.string().min(1, "Please tell us how you plan to use HyreLog"),
});

export function EarlyAccessForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EarlyAccessFormData>({
    resolver: zodResolver(earlyAccessSchema),
  });

  const onSubmit = async (data: EarlyAccessFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const result = await submitEarlyAccess(data);

      if (!result.success) {
        throw new Error(result.error || "Something went wrong. Please try again.");
      }

      // Track successful form submission
      analytics.trackFormSubmit('Early Access Form', true);
      analytics.trackEarlyAccessSignup();

      setIsSuccess(true);
      reset();
    } catch (err) {
      // Track failed form submission
      analytics.trackFormSubmit('Early Access Form', false);
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-center dark:border-green-800 dark:bg-green-900/20">
        <p className="text-green-800 dark:text-green-200">
          Thanks for your interest in HyreLog. We&apos;ll be in touch when early access is available.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Name *
          </label>
          <input
            id="name"
            type="text"
            {...register("name")}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-gray-500"
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Work Email *
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-gray-500"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.email.message}</p>
          )}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="company" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Company
          </label>
          <input
            id="company"
            type="text"
            {...register("company")}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-gray-500"
          />
        </div>
        <div>
          <label htmlFor="role" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Role *
          </label>
          <input
            id="role"
            type="text"
            {...register("role")}
            placeholder="e.g., CTO, Security Engineer"
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-gray-500"
          />
          {errors.role && (
            <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.role.message}</p>
          )}
        </div>
      </div>
      <div>
        <label htmlFor="useCase" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
          What are you hoping to use HyreLog for? *
        </label>
        <textarea
          id="useCase"
          rows={4}
          {...register("useCase")}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-gray-500"
        />
        {errors.useCase && (
          <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.useCase.message}</p>
        )}
      </div>
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800 dark:border-red-800 dark:bg-red-900/20 dark:text-red-200">
          {error}
        </div>
      )}
      <button
        type="submit"
        disabled={isSubmitting}
        className="cursor-pointer w-full rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
      >
        {isSubmitting ? "Submitting..." : "Join Early Access"}
      </button>
    </form>
  );
}

