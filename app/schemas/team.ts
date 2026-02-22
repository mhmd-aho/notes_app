import { z } from "zod";

export const TeamSchema = z.object({
    name: z.string().min(3, "Team name must be at least 3 characters long").max(30,'Team name must be less than 30 characters').trim(),
})