import { defineCollection } from 'astro:content';

import { decisionLoader } from '../../decisions';

import { DecisionZod } from '.';

export const DecisionCollection = defineCollection({
    loader: async () => {
        const data = await decisionLoader();
        const values = data.records().map(decision => ({
            id: decision.id || decision.name,
            ...decision,
        }));
        return values;
    },
    schema: DecisionZod,
});
