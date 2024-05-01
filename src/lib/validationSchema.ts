import { z } from "zod";

export const FormSchema = z
    .object({
        PRN: z
            .string()
            .min(1, 'PRN is required')
            .max(11),

        email: z
            .string()
            .min(1, 'Email is required')
            .email('Invalid email')
            .refine((email) => email.endsWith('@sitpune.edu.in'),
                { message: 'Please enter your college email id!' }),

        password: z
            .string()
            .min(1, 'Password is required')
            .min(8, 'Password must have at least 8 characters')
            .refine((password) => {
                const hasUppercase = /[A-Z]/.test(password);

                const hasLowercase = /[a-z]/.test(password);

                const hasDigit = /\d/.test(password);
                return hasUppercase && hasLowercase && hasDigit;
            }, {
                message: 'Password must contain at least one uppercase letter, one lowercase letter, and one digit!',
            }),

        confirmPassword: z
            .string()
            .min(1, 'Password confirmation is required'),

        role: z
            .string(),

    })

    .refine((data) => data.password === data.confirmPassword, {
        path: ['confirmPassword'],
        message: 'Password do not match',
    });

export const signInSchema = z.object({
    email: z
        .string()
        .min(1, 'Email is required'),

    password: z
        .string()
        .min(1, 'Password is required'),

    role: z
        .string(),
});

export const eventSchema = z.object({
    eventName: z
        .string()
        .min(1, 'Event name required'),

    eventDescription: z
        .string()
        .min(1, "Event description required"),

    organisingClub: z
        .string()
        .min(1, 'Organising Club required'),

    eventDate: z
        .string(),

    eventTime: z
        .string(),

    eventVenue: z
        .string()
        .min(1, 'Event Venue required'),

    eventPlatform: z
        .string()
        .min(1, 'Event Platform required'),

    speakerName: z
        .string()
        .min(1, 'Speaker Name required'),

    speakerDesignation: z
        .string()
        .min(1, 'Speaker Designation required'),

    speakerDescription: z
        .string()
        .optional(),

    eventType1: z
        .string(),

    eventType2: z
        .string(),
});