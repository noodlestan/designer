import { z } from 'astro:content';

export const DecisionModelZod = z.object({
    model: z.string(),
    type: z.string(),
    name: z.string(),
    category: z.string(),
    domain: z.string().optional(),
    description: z.string().optional(),
});
