'use server';

import { Resend } from 'resend';
import { z } from 'zod';

const contactSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Please enter a valid email address'),
    company: z.string().optional(),
    subject: z.string().min(1, 'Subject is required'),
    message: z.string().min(1, 'Message is required')
});

export type ContactFormData = z.infer<typeof contactSchema>;

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitContact(data: ContactFormData) {
    try {
        // Validate the data
        const validated = contactSchema.parse(data);

        // Check if Resend API key is configured
        if (!process.env.RESEND_API_KEY) {
            console.error('RESEND_API_KEY is not configured');
            return {
                success: false,
                error: 'Email service is not configured. Please try again later.'
            };
        }

        // Send email via Resend
        const { data: emailData, error: emailError } = await resend.emails.send(
            {
                from: 'HyreLog Contact <mark@hyrelog.com>', // Update this with your verified domain
                to: ['mark@hyrelog.com'],
                replyTo: validated.email,
                subject: `Contact Form: ${validated.subject}`,
                html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${validated.name}</p>
        <p><strong>Email:</strong> ${validated.email}</p>
        ${
            validated.company
                ? `<p><strong>Company:</strong> ${validated.company}</p>`
                : ''
        }
        <p><strong>Subject:</strong> ${validated.subject}</p>
        <hr>
        <p><strong>Message:</strong></p>
        <p>${validated.message.replace(/\n/g, '<br>')}</p>
      `,
                text: `
New Contact Form Submission

Name: ${validated.name}
Email: ${validated.email}
${validated.company ? `Company: ${validated.company}` : ''}
Subject: ${validated.subject}

Message:
${validated.message}
      `
            }
        );

        if (emailError) {
            console.error('Resend error:', emailError);
            return {
                success: false,
                error: 'Failed to send email. Please try again later.'
            };
        }

        console.log('Contact form email sent successfully:', emailData);

        return { success: true };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return {
                success: false,
                error: error.issues[0]?.message || 'Validation failed'
            };
        }
        console.error('Error processing contact form:', error);
        return {
            success: false,
            error: 'Failed to process request'
        };
    }
}
