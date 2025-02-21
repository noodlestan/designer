import type { DecisionUnknown } from '../../decision';
import type { DecisionRef } from '../../inputs';

import type { ValueContext } from './context';

export type ValueError = {
    context: ValueContext;
    valueName: string;
    message: () => string;
};

export type ValueInputError = ValueError & {
    input: unknown;
    error?: unknown;
};

export type ValueRefNotFoundError = ValueError & {
    ref: DecisionRef;
};

export type ValueRefMismatchError = ValueError & {
    ref: DecisionRef;
    decision: DecisionUnknown;
    accepted: string[];
};

export type ValueRefIndexError = ValueError & {
    ref: DecisionRef;
};
