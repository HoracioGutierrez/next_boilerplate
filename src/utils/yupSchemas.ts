import { z } from 'zod';

export const loginFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
})

export const signupFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    repassword: z.string().min(8),
    name: z.string().min(3),
    username: z.string().min(3),
}).required({
    email: true,
    password: true,
    repassword: true,
    name: true,
    username: true
}).refine(data => data.password === data.repassword, {
    message: 'Passwords do not match',
    path: ['repassword']
})

export const profileFormSchema = z.object({
    name: z.string().min(3),
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
}).required({
    name: true,
    username: true,
    email: true,
    password: true,
})


export type signupFormType = z.infer<typeof signupFormSchema>
export type loginFormType = z.infer<typeof loginFormSchema>
export type profileFormType = z.infer<typeof profileFormSchema>