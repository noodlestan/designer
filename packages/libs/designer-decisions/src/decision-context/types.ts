import type { Decision } from '../decision';
import type { DecisionInput, DecisionRef } from '../inputs';
import type { DecisionInputError } from '../records';
import type { BaseValue } from '../values';

export type DecisionRefResolver = <V extends BaseValue<unknown> = BaseValue<unknown>>(
    ref: DecisionRef,
) => Decision<V>;

export type DecisionError = {
    context: DecisionContext;
    message: () => string;
};

export type DecisionUnexpectedError = DecisionError & {
    error?: unknown;
};

export type DecisionNotFoundError = DecisionError & {
    ref: DecisionRef;
};

export type DecisionContext = {
    uuid: () => string;
    resolve: DecisionRefResolver;
    decisionType: () => string;
    ref: () => DecisionRef;
    inputs: () => DecisionInput[];
    hasErrors: () => boolean;
    errors: () => (DecisionError | DecisionInputError)[];
    addError: (error: DecisionError) => void;
};
