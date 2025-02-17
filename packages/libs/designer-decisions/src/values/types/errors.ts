import type { DecisionUnknown } from '../../decisions';
import type { DecisionRef } from '../../inputs';

import type { ValueContext } from './context';

export type DecisionValueError = {
    context: ValueContext;
    valueName: string;
    message: () => string;
};

export type DecisionValueInputError = DecisionValueError & {
    input: unknown;
    error?: unknown;
};

export type DecisionValueRefNotFoundError = DecisionValueError & {
    ref: DecisionRef;
};

export type DecisionValueRefMismatchError = DecisionValueError & {
    ref: DecisionRef;
    decision: DecisionUnknown;
    accepted: string[];
};

export type DecisionValueRefIndexError = DecisionValueError & {
    ref: DecisionRef;
};
