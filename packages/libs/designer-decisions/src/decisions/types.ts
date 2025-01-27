import type { DecisionInputBase, DecisionInputError, DecisionRefResolver } from '../types';

export type StaticInputMap = {
    hasErrors: () => boolean;
    validationErrors: () => DecisionInputError[];
    records: (filter?: (item: DecisionInputBase) => boolean) => DecisionInputBase[];
};

export type StaticDecisionMap = {
    resolve: DecisionRefResolver;
};
