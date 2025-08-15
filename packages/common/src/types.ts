import { email, z } from "zod";

export const createUserSchema = z.object({
    username : z.string(),
    email : z.email(),
    password : z.string()
})

