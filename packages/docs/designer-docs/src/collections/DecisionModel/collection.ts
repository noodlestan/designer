import { DecisionTypes } from '@noodlestan/designer-decisions';
import { defineCollection } from 'astro:content';

import { DecisionModelZod, type DecisionTypeModel } from '..';

export const DecisionModelsCollection = defineCollection({
    loader: async () => {
        return DecisionTypes.reduce((acc, item) => {
            return [
                ...acc,
                ...item.models.map(model => ({
                    id: item.type + '/' + model.model,
                    decisionTypeId: item.type,
                    ...model,
                })),
            ];
        }, [] as DecisionTypeModel[]);
    },
    schema: DecisionModelZod,
});
