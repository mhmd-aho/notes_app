import { z } from "zod";

export const NoteSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters long").max(30,'Title must be less than 30 characters').trim(),
    team: z.string().optional(),
})