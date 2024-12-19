import { z } from 'astro:content';

export const DecisionTypeZod = z.object({
    title: z.string(),
    category: z.string(),
    domain: z.string(),
    type: z.string(),
    name: z.string(),
    description: z.string(),
    models: z.array(
        z.object({
            model: z.string(),
            name: z.string(),
            description: z.string(),
        }),
    ),
});
