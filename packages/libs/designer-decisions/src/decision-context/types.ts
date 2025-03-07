import type { Decision } from '../decision';
import type { DesignerError } from '../errors';
import type { DecisionRef } from '../inputs';
import type { RecordError, ValidatedRecord } from '../record';
import type { BaseValue } from '../values';

export type DecisionRefResolver = <V extends BaseValue<unknown> = BaseValue<unknown>>(
    ref: DecisionRef,
) => Decision<V>;

export type _DecisionError = DesignerError & {
    layer: 'Decision';
    context: DecisionContext;
};

export type DecisionUnexpectedError = _DecisionError & {
    name: 'DecisionUnexpectedError';
};

export type DecisionUnknownModelError = _DecisionError & {
    name: 'DecisionUnknownModelError';
};

export type DecisionUnknownTypeError = _DecisionError & {
    name: 'DecisionUnknownTypeError';
};

export type DecisionNotFoundError = _DecisionError & {
    name: 'DecisionNotFoundError';
    ref: DecisionRef;
};

export type DecisionError =
    | DecisionUnexpectedError
    | DecisionUnknownModelError
    | DecisionUnknownTypeError
    | DecisionNotFoundError;

export type DecisionContext = {
    uuid: () => string;
    resolve: DecisionRefResolver;
    decisionType: () => string;
    ref: () => DecisionRef;
    records: () => ValidatedRecord[];
    hasErrors: () => boolean;
    errors: () => (DecisionError | RecordError)[];
    addError: (error: DecisionError) => void;
};
