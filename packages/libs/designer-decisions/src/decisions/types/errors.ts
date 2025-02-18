import type { DecisionRef } from '../../inputs';

import type { DecisionContext } from './context';

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
