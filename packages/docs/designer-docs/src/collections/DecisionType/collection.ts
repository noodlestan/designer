import { DecisionTypes } from '@noodlestan/designer-decisions';
import { defineCollection } from 'astro:content';

import { DecisionTypeZod } from '..';

export const DecisionTypeCollection = defineCollection({
    loader: async () => {
        return DecisionTypes.map(decisionType => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { factory, ...rest } = decisionType;
            return {
                id: decisionType.type,
                title: decisionType.name,
                ...rest,
            };
        });
    },
    schema: DecisionTypeZod,
});
