import { z } from "zod";

export const SignUpSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    username: z.string().min(3, "Username must be at least 3 characters long").max(20, "Username must be at most 20 characters long").regex(/^\S+$/, "No spaces allowed"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
})
export const SignInSchema = z.object({
    emailOrUsername: z.string().min(3, "Email or username must be at least 3 characters long"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
})