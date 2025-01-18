import { DECISION_TYPE_METAS } from '@noodlestan/designer-decisions';
import { defineCollection } from 'astro:content';

import { DecisionTypeZod } from './zod';

export const DecisionTypeCollection = defineCollection({
    loader: async () => {
        return DECISION_TYPE_METAS.map(decisionType => ({
            id: decisionType.type,
            ...decisionType,
        }));
    },
    schema: DecisionTypeZod,
});
