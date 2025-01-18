import { z } from 'astro:content';

export const DecisionZod = z.object({
    type: z.string(),
    name: z.string(),
    description: z.string().optional(),
    usage: z
        .object({
            intendedFor: z.array(z.string()).optional(),
            notFor: z.array(z.string()).optional(),
        })
        .optional(),
    params: z.object({}),
});
