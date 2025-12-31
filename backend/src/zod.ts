import z from 'zod';

export const signupschema = z.object({
    username: z.string().min(3).max(20),
    email: z.string(),
    password: z.string().min(6),
    role: z.enum(['user', 'admin']).optional()
});

export const loginschema = z.object({
    email: z.string(),
    password: z.string().min(6),
    role: z.enum(['user', 'admin']).optional()
});

export const buildStatusSchema = z.object({
     frontend_progress: z.number().min(0).max(100),
    status: z.enum(["UNDER_DEVELOPMENT", "LIVE"])
});

export const featureSchema = z.object({
    name: z.string().min(1),
    audience: z.string().min(1),
    state: z.string().min(1)
});