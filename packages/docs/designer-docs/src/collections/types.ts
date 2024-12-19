import type { DecisionModelMeta, DecisionTypeMeta } from '@noodlestan/designer-decisions';

export type DecisionType = Omit<DecisionTypeMeta, 'factory'> & {
    id: string;
};

export type DecisionTypeModel = DecisionModelMeta & {
    id: string;
    decisionTypeId: string;
};
