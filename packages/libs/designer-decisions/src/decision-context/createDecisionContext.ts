import type { DecisionRef } from '../inputs';
import type { ValidatedRecord } from '../records';

import { decisionTypeFromModel } from './functions';
import type { DecisionContext, DecisionError, DecisionRefResolver } from './types';

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
        uuid: () => records[0]?.uuid || crypto.randomUUID(),
        resolve: resolver,
        decisionType: () => decisionTypeFromModel(records[0]?.input.model || ''),
        ref: () => ref,
        inputs: getInputs,
        hasErrors,
        errors: getErrors,
        addError,
    };
};
