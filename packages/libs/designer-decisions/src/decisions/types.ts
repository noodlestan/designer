import type { ErrorObject } from 'ajv';

import type { DecisionRef, DecisionRefResolver, InputRecord, InputValidationError } from '../types';

export type DecisionInputData = {
    decision: InputRecord;
    errors: ErrorObject[] | null | undefined;
};

export type StaticInputMap = {
    hasErrors: () => boolean;
    validationErrors: () => InputValidationError[];
    records: (filter?: (item: InputRecord) => boolean) => InputRecord[];
    findByRef: (ref: DecisionRef) => DecisionInputData[];
};

export type StaticDecisionMap = {
    resolve: DecisionRefResolver;
};
