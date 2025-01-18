import { z } from 'astro:content';

export const DecisionTypeZod = z.object({
    category: z.string(),
    domain: z.string(),
    type: z.string(),
    name: z.string(),
    description: z.string(),
    models: z.array(
        z.object({
            model: z.string(),
            type: z.string(),
            name: z.string(),
            category: z.string(),
            domain: z.string(),
            description: z.string(),
        }),
    ),
});
