import { DECISION_MODEL_METAS } from '@noodlestan/designer-decisions';
import { defineCollection } from 'astro:content';

import { DecisionModelZod } from './zod';

export const DecisionModelsCollection = defineCollection({
    loader: async () => {
        return DECISION_MODEL_METAS.map(decisionModel => ({
            id: decisionModel.model,
            ...decisionModel,
        }));
    },
    schema: DecisionModelZod,
});
