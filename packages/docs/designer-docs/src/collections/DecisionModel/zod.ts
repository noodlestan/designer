import { z } from 'astro:content';

export const DecisionModelZod = z.object({
    decisionTypeId: z.string(),
    model: z.string(),
    schemaId: z.string(),
    name: z.string(),
    description: z.string().optional(),
});
