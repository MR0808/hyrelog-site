'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Container } from '@/components/Container';
import { Section } from '@/components/Section';
import { submitContact, type ContactFormData } from '@/app/actions/contact';

const contactSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Please enter a valid email address'),
    company: z.string().optional(),
    subject: z.string().min(1, 'Subject is required'),
    message: z.string().min(1, 'Message is required')
});

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema)
    });

    const onSubmit = async (data: ContactFormData) => {
        setIsSubmitting(true);
        setError(null);

        try {
            const result = await submitContact(data);

            if (!result.success) {
                throw new Error(
                    result.error || 'Something went wrong. Please try again.'
                );
            }

            setIsSuccess(true);
            reset();
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : 'Something went wrong. Please try again.'
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Section className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
                <Container>
                    <div className="mx-auto max-w-2xl">
                        <div className="mb-8 text-center">
                            <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Contact us
                            </h1>
                            <p className="text-lg text-gray-600 dark:text-gray-400">
                                Have questions about HyreLog, early access, or
                                partnerships? Get in touch.
                            </p>
                        </div>

                        {isSuccess ? (
                            <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-center dark:border-green-800 dark:bg-green-900/20">
                                <p className="text-green-800 dark:text-green-200">
                                    Thank you for your message. We&apos;ll get
                                    back to you soon.
                                </p>
                            </div>
                        ) : (
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="space-y-6"
                            >
                                <div className="grid gap-6 sm:grid-cols-2">
                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                                        >
                                            Name *
                                        </label>
                                        <input
                                            id="name"
                                            type="text"
                                            {...register('name')}
                                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-gray-500"
                                        />
                                        {errors.name && (
                                            <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                                                {errors.name.message}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                                        >
                                            Email *
                                        </label>
                                        <input
                                            id="email"
                                            type="email"
                                            {...register('email')}
                                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-gray-500"
                                        />
                                        {errors.email && (
                                            <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                                                {errors.email.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <label
                                        htmlFor="company"
                                        className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        Company
                                    </label>
                                    <input
                                        id="company"
                                        type="text"
                                        {...register('company')}
                                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-gray-500"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="subject"
                                        className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        Subject *
                                    </label>
                                    <input
                                        id="subject"
                                        type="text"
                                        {...register('subject')}
                                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-gray-500"
                                    />
                                    {errors.subject && (
                                        <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                                            {errors.subject.message}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label
                                        htmlFor="message"
                                        className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        rows={6}
                                        {...register('message')}
                                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-gray-500"
                                    />
                                    {errors.message && (
                                        <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                                            {errors.message.message}
                                        </p>
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
                                    {isSubmitting
                                        ? 'Sending...'
                                        : 'Send Message'}
                                </button>
                            </form>
                        )}

                        {/*<div className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-800">
              <div className="text-center">
                <p className="mb-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                  You can also reach us at:
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <a
                    href="mailto:hello@hyrelog.com"
                    className="text-gray-900 underline transition-colors hover:text-gray-700 dark:text-gray-100 dark:hover:text-gray-300"
                  >
                    hello@hyrelog.com
                  </a>
                </p>
              </div>
            </div>*/}
                    </div>
                </Container>
            </Section>
        </>
    );
}
