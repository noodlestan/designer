import type { DecisionRef, DecisionRefResolver, ValidatedRecord } from '../inputs';

import { decisionTypeFromModel } from './functions';
import type { DecisionContext, DecisionError } from './types';

export const createDecisionContext = (
    ref: DecisionRef,
    resolver: DecisionRefResolver,
    records: ValidatedRecord[],
): DecisionContext => {
    const errors: DecisionError[] = [];

    const addError = (error: DecisionError) => {
        errors.push(error);
    };

    const inputErrors = () => records.flatMap(({ errors }) => errors);
    const getInputs = () => records.map(({ input: record }) => record);
    const getErrors = () => [...errors, ...inputErrors()];
    const hasErrors = () => Boolean(getErrors().length);

    return {
        resolve: resolver,
        decisionType: () => decisionTypeFromModel(records[0].input.model),
        ref: () => ref,
        inputs: getInputs,
        errors: getErrors,
        hasErrors,
        addError,
    };
};
