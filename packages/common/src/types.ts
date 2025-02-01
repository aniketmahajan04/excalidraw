import { z } from "zod";

export const CreateUserSchema = z.object({
    email: z.string().min(3).max(100),
    password: z.string().min(3).max(100),
    username: z.string().min(3).max(100)
})
export const SignInUserSchema = z.object({
    email: z.string().min(3).max(100),
    password: z.string().min(3).max(100),
})
export const CreateRoomSchema = z.object({
    name: z.string().min(3).max(100)
})