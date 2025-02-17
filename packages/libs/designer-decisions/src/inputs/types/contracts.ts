import type { ErrorObject } from 'ajv';

import type { Decision, DecisionContext } from '../../decisions';
import type { BaseValue } from '../../primitives';

import type { DecisionRef } from './primitives';
import type { InputRecord } from './record';
import type { InputValidationError } from './validation';

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

export type DecisionRefResolver = <V extends BaseValue<unknown> = BaseValue<unknown>>(
    ref: DecisionRef,
) => [DecisionContext, Decision<V> | undefined];

export type StaticDecisionMap = {
    resolve: DecisionRefResolver;
};
