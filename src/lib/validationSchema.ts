import { z } from "zod";

export const FormSchema = z
    .object({
        PRN: z
            .string()
            .min(11, 'PRN contains digit only!')
            .max(11)
            .refine((PRN) => {
                const hasDigit = /\d/.test(PRN);
                return hasDigit;
            }, {
                message: 'PRN must have 11 digits!',
            }),

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
    title: z
        .string()
        .min(1, 'Event name required'),

    description: z
        .string()
        .min(1, "Event description required"),

    organizingClub: z
        .string()
        .min(1, 'Organising Club required'),

    date: z
        .string(),

    time: z
        .string(),

    location: z
        .string()
        .min(1, 'Event Venue required'),

    speaker: z
        .string()
        .min(1, 'Speaker Name required'),

    speakerDesignation: z
        .string()
        .min(1, 'Speaker Designation required'),

    speakerCompany: z.string().optional(),
    speakerMail: z.string().optional(),
    speakerContact: z.string().optional(),
    faculty: z.string().optional(),
    facultyMail: z.string().optional(),
    facultyContact: z.string().optional(),
    course: z.string().optional(),
    batch: z.string().optional(),
    branch: z.string().optional(),
    academicyear: z.string().optional(),
    year: z.string().optional(),
    semester: z.string().optional(),
    division: z.string().optional(),    
    copo: z.string().optional(),
});