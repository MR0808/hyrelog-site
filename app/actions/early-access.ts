'use server';

import { Resend } from 'resend';
import { z } from 'zod';
import { supabase } from '@/lib/supabase';

const earlyAccessSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Please enter a valid email address'),
    company: z.string().optional(),
    role: z.string().min(1, 'Role is required'),
    useCase: z.string().min(1, 'Please tell us how you plan to use HyreLog')
});

export type EarlyAccessFormData = z.infer<typeof earlyAccessSchema>;

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitEarlyAccess(data: EarlyAccessFormData) {
    try {
        // Validate the data
        const validated = earlyAccessSchema.parse(data);

        // Store in Supabase if configured
        if (supabase) {
            // Check if email already exists
            const { data: existing } = await supabase
                .from('early_access_signups')
                .select('email')
                .eq('email', validated.email)
                .single();

            if (existing) {
                // Email already exists, but return success to avoid revealing this
                // You might want to send a different message, but for UX we'll just confirm
                return { success: true };
            }

            // Store in Supabase
            const { error: dbError } = await supabase.from('early_access_signups').insert({
                name: validated.name,
                email: validated.email,
                company: validated.company || null,
                role: validated.role,
                use_case: validated.useCase
            });

            if (dbError) {
                console.error('Database error:', dbError);
                // Don't fail the request if DB insert fails, but log it
            }
        } else {
            // Fallback to just logging if Supabase isn't set up yet
            console.log('Early Access Form Submission (Supabase not configured):', validated);
        }

        // Send confirmation email via Resend
        if (process.env.RESEND_API_KEY) {
            try {
                await resend.emails.send({
                    from: 'HyreLog <mark@hyrelog.com>',
                    to: validated.email,
                    subject: 'Welcome to HyreLog Early Access',
                    html: `
                        <h2>Thanks for your interest in HyreLog!</h2>
                        <p>Hi ${validated.name},</p>
                        <p>We've received your early access request. We'll be in touch when early access is available.</p>
                        <p>In the meantime, feel free to reach out if you have any questions.</p>
                        <p>Best,<br>The HyreLog Team</p>
                    `,
                    text: `Thanks for your interest in HyreLog!\n\nHi ${validated.name},\n\nWe've received your early access request. We'll be in touch when early access is available.\n\nIn the meantime, feel free to reach out if you have any questions.\n\nBest,\nThe HyreLog Team`
                });
            } catch (emailError) {
                console.error('Email error:', emailError);
                // Don't fail the request if email fails
            }
        }

        return { success: true };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return {
                success: false,
                error: error.issues[0]?.message || 'Validation failed'
            };
        }
        console.error('Error processing early access form:', error);
        return {
            success: false,
            error: 'Failed to process request'
        };
    }
}

