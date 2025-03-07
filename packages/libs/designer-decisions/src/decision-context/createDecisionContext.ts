import type { DecisionRef } from '../inputs';
import type { ValidatedRecord } from '../record';

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
    const getErrors = () => [...errors, ...inputErrors()];
    const hasErrors = () => Boolean(getErrors().length);

    return {
        uuid: () => records[0]?.uuid || crypto.randomUUID(),
        resolve: resolver,
        decisionType: () => decisionTypeFromModel(records[0]?.input.model || ''),
        ref: () => ref,
        records: () => records,
        hasErrors,
        errors: getErrors,
        addError,
    };
};
