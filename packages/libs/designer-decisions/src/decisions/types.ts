import type { DecisionRefResolver, InputRecord, InputValidationError } from '../types';

export type StaticInputMap = {
    hasErrors: () => boolean;
    validationErrors: () => InputValidationError[];
    records: (filter?: (item: InputRecord) => boolean) => InputRecord[];
};

export type StaticDecisionMap = {
    resolve: DecisionRefResolver;
};
